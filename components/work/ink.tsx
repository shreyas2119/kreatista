"use client";

import { useEffect, useRef } from "react";

const COUNT = 64;
const LIFE = 3.2;

const vertex = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const fragment = `
precision highp float;
uniform vec2 res;
uniform float t;
uniform vec4 pts[${COUNT}];

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec3 palette(float k) {
  k = fract(k);
  vec3 a = vec3(0.545, 0.498, 0.878);
  vec3 b = vec3(1.0, 0.361, 0.541);
  vec3 c = vec3(1.0, 0.698, 0.243);
  vec3 d = vec3(0.180, 0.769, 0.714);
  if (k < 0.25) return mix(a, b, k * 4.0);
  if (k < 0.5) return mix(b, c, (k - 0.25) * 4.0);
  if (k < 0.75) return mix(c, d, (k - 0.5) * 4.0);
  return mix(d, a, (k - 0.75) * 4.0);
}

void main() {
  vec2 p = gl_FragCoord.xy;
  float m = min(res.x, res.y);
  vec2 n = p / m * 2.6;
  vec2 w = p + m * 0.07 * vec2(noise(n + t * 0.25) - 0.5, noise(n + 7.3 - t * 0.25) - 0.5);

  float field = 0.0;
  vec3 tint = vec3(0.0);
  for (int i = 0; i < ${COUNT}; i++) {
    vec4 q = pts[i];
    if (q.z < 0.0) continue;
    float r = m * (0.028 + 0.03 * q.z);
    vec2 d = w - q.xy;
    float g = exp(-dot(d, d) / (r * r)) * exp(-q.z * 1.05);
    field += g;
    tint += g * palette(q.w);
  }

  vec3 ink = tint / max(field, 1e-4);
  float edge = smoothstep(0.3, 0.4, field);
  vec3 col = mix(vec3(1.0), ink, edge);
  col = mix(col, ink * 0.92, smoothstep(0.9, 1.6, field) * 0.35);
  col += (hash(p + t) - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export function Ink() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "res");
    const uTime = gl.getUniformLocation(program, "t");
    const uPts = gl.getUniformLocation(program, "pts");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The ink is soft, so half resolution reads the same and costs a quarter.
    const scale = 0.5;
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    // Ring buffer of trail points: x, y in canvas pixels, birth time, hue.
    const born = new Float32Array(COUNT).fill(-1e9);
    const xy = new Float32Array(COUNT * 2);
    const hues = new Float32Array(COUNT);
    const data = new Float32Array(COUNT * 4);
    let head = 0;
    let hue = Math.random();
    let lastX = -1e9;
    let lastY = -1e9;

    const emit = (x: number, y: number, now: number, spacing: number) => {
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < spacing) return;
      hue += Math.min(dist, 120) / 900;
      lastX = x;
      lastY = y;
      xy[head * 2] = x;
      xy[head * 2 + 1] = y;
      born[head] = now;
      hues[head] = hue;
      head = (head + 1) % COUNT;
    };

    let pointerAt = -1e9;
    let pointerX = 0;
    let pointerY = 0;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      pointerX = (e.clientX - rect.left) * scale;
      pointerY = (rect.bottom - e.clientY) * scale;
      pointerAt = performance.now();
    };

    // When nobody is steering, a ghost cursor keeps painting slow loops.
    const ghost = (s: number) => {
      const w = canvas.width;
      const h = canvas.height;
      return [w * (0.5 + 0.36 * Math.sin(s * 0.55)), h * (0.5 + 0.3 * Math.sin(s * 0.9 + 1.2))] as const;
    };

    const draw = (now: number) => {
      const s = now / 1000;
      if (now - pointerAt < 1600) emit(pointerX, pointerY, s, 12 * scale);
      else {
        const [gx, gy] = ghost(s);
        emit(gx, gy, s, 16 * scale);
      }
      for (let i = 0; i < COUNT; i++) {
        const age = s - born[i];
        data[i * 4] = xy[i * 2];
        data[i * 4 + 1] = xy[i * 2 + 1];
        data[i * 4 + 2] = age < LIFE ? age : -1;
        data[i * 4 + 3] = hues[i];
      }
      gl.uniform1f(uTime, s);
      gl.uniform4fv(uPts, data);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();

    if (still) {
      for (let i = 0; i < COUNT; i++) {
        const [gx, gy] = ghost(i * 0.1);
        xy[i * 2] = gx;
        xy[i * 2 + 1] = gy;
        born[i] = -(COUNT - i) * 0.08;
        hues[i] = i / COUNT;
      }
      const frame = () => {
        for (let i = 0; i < COUNT; i++) {
          data[i * 4] = xy[i * 2];
          data[i * 4 + 1] = xy[i * 2 + 1];
          data[i * 4 + 2] = -born[i];
          data[i * 4 + 3] = hues[i];
        }
        gl.uniform1f(uTime, 0);
        gl.uniform4fv(uPts, data);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      frame();
      canvas.classList.add("is-on");
      const ro = new ResizeObserver(() => {
        resize();
        frame();
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = true;
    const loop = (now: number) => {
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    raf = requestAnimationFrame(loop);
    canvas.classList.add("is-on");

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="silk" aria-hidden="true" />;
}
