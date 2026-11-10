(function() {
  var scriptEl = document.currentScript || document.querySelector('script[src^="/widget.js"]');
  var tenantId = (scriptEl && scriptEl.getAttribute('data-tenant')) || 'socioryx';
  var apiBase = (scriptEl && scriptEl.getAttribute('data-api')) || 'https://agent-core.socioryx.workers.dev';
  var sessionId = 'sess_' + Math.random().toString(36).substring(2, 15);

  // Inject CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  // Versioned so a cached old stylesheet (right-side launcher) can never win.
  link.href = '/widget.css?v=20261110';
  document.head.appendChild(link);

  // Build widget DOM
  var container = document.createElement('div');
  container.id = 'socioryx-chat-widget';
  container.innerHTML = [
    '<div id="socioryx-chat-teaser" hidden>',
    '  <button type="button" class="socioryx-teaser-text"></button>',
    '  <button type="button" class="socioryx-teaser-close" aria-label="Dismiss">✕</button>',
    '</div>',
    '<button id="socioryx-chat-bubble" class="no-3d" aria-label="Open chat"><span class="socioryx-bubble-icon" aria-hidden="true">💬</span></button>',
    '<div id="socioryx-chat-window" data-lenis-prevent>',
    '  <div id="socioryx-chat-header">',
    '    <h3>Chat with us</h3>',
    '    <button id="socioryx-chat-close" aria-label="Close chat">✕</button>',
    '  </div>',
    '  <div id="socioryx-chat-messages" role="log" aria-label="Chat messages" aria-live="polite">',
    '    <div class="socioryx-msg bot">Hi! Ask me about our websites, social media, or our results, like the 6.5M-view Reel or our 21% LinkedIn reply rate.</div>',
    '  </div>',
    '  <div id="socioryx-chat-chips" role="group" aria-label="Suggested questions"></div>',
    '  <div id="socioryx-chat-input-area">',
    '    <input id="socioryx-chat-input" type="text" placeholder="Type your question..." maxlength="1000" />',
    '    <button id="socioryx-chat-send">Send</button>',
    '  </div>',
    '</div>'
  ].join('');
  document.body.appendChild(container);

  var bubble = document.getElementById('socioryx-chat-bubble');
  var window_ = document.getElementById('socioryx-chat-window');
  var closeBtn = document.getElementById('socioryx-chat-close');
  var messages = document.getElementById('socioryx-chat-messages');
  var input = document.getElementById('socioryx-chat-input');
  var sendBtn = document.getElementById('socioryx-chat-send');
  var teaser = document.getElementById('socioryx-chat-teaser');
  var teaserText = teaser.querySelector('.socioryx-teaser-text');
  var teaserClose = teaser.querySelector('.socioryx-teaser-close');
  var chipWrap = document.getElementById('socioryx-chat-chips');

  var quickQuestions = [
    'What services do you offer?',
    'How did a Reel hit 6.5M views?',
    'How do you get a 21% reply rate on LinkedIn?',
    'What does a new website take?'
  ];
  quickQuestions.forEach(function(question) {
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'socioryx-chip';
    chip.textContent = question;
    chip.addEventListener('click', function() {
      input.value = question;
      sendMessage();
    });
    chipWrap.appendChild(chip);
  });

  var isOpen = false;
  var isSending = false;
  var mascot = null;
  var history = [
    { role: 'assistant', content: messages.textContent.trim() }
  ];

  function toggleChat() {
    isOpen = !isOpen;
    window_.classList.toggle('open', isOpen);
    bubble.setAttribute('aria-label', isOpen ? 'Close chat' : 'Open chat');
    if (mascot) mascot.setOpen(isOpen);
    if (isOpen) {
      stopTeaser();
      input.focus();
    }
  }

  var LINK_RE = /(https?:\/\/[^\s<>()]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

  // Builds bot text as DOM nodes so links and **bold** render without parsing any HTML.
  function renderRich(target, text) {
    text = text.replace(/^[ \t]*[*-][ \t]+/gm, '• ');
    text.split(/(\*\*[^*]+\*\*)/g).forEach(function(part) {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        var strong = document.createElement('strong');
        renderLinks(strong, part.slice(2, -2));
        target.appendChild(strong);
      } else {
        renderLinks(target, part);
      }
    });
  }

  function renderLinks(target, text) {
    var last = 0;
    text.replace(LINK_RE, function(match, _g, offset) {
      var url = match.replace(/[.,;:!?]+$/, '');
      target.appendChild(document.createTextNode(text.slice(last, offset)));
      var a = document.createElement('a');
      a.textContent = url;
      if (url.indexOf('@') > 0 && url.indexOf('://') < 0) {
        a.href = 'mailto:' + url;
      } else {
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      target.appendChild(a);
      last = offset + url.length;
      return match;
    });
    target.appendChild(document.createTextNode(text.slice(last)));
  }

  function addMessage(text, type, isFallback) {
    var div = document.createElement('div');
    div.className = 'socioryx-msg ' + type;
    if (isFallback) div.classList.add('fallback');
    if (type === 'bot') renderRich(div, text);
    else div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'socioryx-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function sendMessage() {
    var text = input.value.trim();
    if (!text || isSending) return;

    chipWrap.hidden = true;
    isSending = true;
    sendBtn.disabled = true;
    addMessage(text, 'user');
    input.value = '';

    var typingEl = showTyping();

    fetch(apiBase + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenant_id: tenantId, message: text, session_id: sessionId, history: history.slice(-6) })
    })
    .then(function(res) {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then(function(data) {
      typingEl.remove();
      addMessage(data.response, 'bot', data.fallback);
      if (!data.fallback) {
        history.push({ role: 'user', content: text }, { role: 'assistant', content: data.response });
      }
    })
    .catch(function(err) {
      typingEl.remove();
      console.error('Widget fetch error:', err);
      addMessage('Unable to reach support. Please contact us directly at work@socioryx.com', 'bot', true);
    })
    .finally(function() {
      isSending = false;
      sendBtn.disabled = false;
      input.focus();
    });
  }

  bubble.addEventListener('click', function() {
    if (mascot && !isOpen) mascot.hop();
    toggleChat();
  });
  closeBtn.addEventListener('click', toggleChat);
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Teaser bubble: pops a question, hides, and comes back with the next one
  // until the visitor dismisses it or opens the chat.
  var teaserLines = [
    { say: 'Psst. Want to know how one Reel hit 6.5M views?', ask: 'How did a Reel hit 6.5M views?' },
    { say: 'Thinking about a new website? Ask me what it takes.', ask: 'What does a new website take?' },
    { say: 'Our LinkedIn outreach gets a 21% reply rate. Curious how?', ask: 'How do you get a 21% reply rate on LinkedIn?' }
  ];
  var TEASER_FIRST = 6000;
  var TEASER_SHOW = 8000;
  var TEASER_GAP = 30000;
  var TEASER_KEY = 'socioryx-teaser-off';
  var teaserIndex = -1;
  var teaserTimer = 0;
  var teaserNext = 0;

  function teaserOff() {
    try { return sessionStorage.getItem(TEASER_KEY) === '1'; } catch (e) { return false; }
  }

  function stopTeaser() {
    try { sessionStorage.setItem(TEASER_KEY, '1'); } catch (e) {}
    clearTimeout(teaserNext);
    hideTeaser();
  }

  function scheduleTeaser(delay) {
    clearTimeout(teaserNext);
    if (teaserOff()) return;
    teaserNext = setTimeout(showTeaser, delay);
  }

  function showTeaser() {
    if (teaserOff()) return;
    if (isOpen || document.hidden) {
      scheduleTeaser(TEASER_GAP);
      return;
    }
    teaserIndex = (teaserIndex + 1) % teaserLines.length;
    teaserText.textContent = teaserLines[teaserIndex].say;
    teaserText.setAttribute('aria-label', 'Ask: ' + teaserLines[teaserIndex].ask);
    teaser.hidden = false;
    teaser.classList.remove('swap');
    void teaser.offsetWidth;
    teaser.classList.add('swap');
    requestAnimationFrame(function() { teaser.classList.add('show'); });
    if (mascot) {
      mascot.wave();
      mascot.talk(1.1);
    }
    clearTimeout(teaserTimer);
    teaserTimer = setTimeout(function() {
      hideTeaser();
      scheduleTeaser(TEASER_GAP);
    }, TEASER_SHOW);
  }

  function hideTeaser() {
    clearTimeout(teaserTimer);
    if (teaser.hidden) return;
    teaser.classList.remove('show');
    setTimeout(function() { teaser.hidden = true; }, 260);
  }

  teaserText.addEventListener('click', function() {
    var ask = teaserLines[teaserIndex].ask;
    stopTeaser();
    if (!isOpen) toggleChat();
    input.value = ask;
    sendMessage();
  });
  teaserClose.addEventListener('click', stopTeaser);
  teaser.addEventListener('mouseenter', function() { clearTimeout(teaserTimer); });
  teaser.addEventListener('mouseleave', function() {
    if (teaser.hidden) return;
    teaserTimer = setTimeout(function() {
      hideTeaser();
      scheduleTeaser(TEASER_GAP);
    }, 4000);
  });

  scheduleTeaser(TEASER_FIRST);

  // Mascot: a soft violet blob drawn with a tiny raymarching shader.
  function startMascot() {
    try {
      mascot = createMascot(bubble);
    } catch (e) {
      mascot = null;
    }
    if (mascot) bubble.classList.remove('no-3d');
  }

  if (document.readyState === 'complete') setTimeout(startMascot, 200);
  else window.addEventListener('load', function() { setTimeout(startMascot, 200); });

  function createMascot(host) {
    var canvas = document.createElement('canvas');
    canvas.className = 'socioryx-mascot';
    canvas.setAttribute('aria-hidden', 'true');
    var gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) return null;

    var vert = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
    var frag = [
      '#ifdef GL_FRAGMENT_PRECISION_HIGH',
      'precision highp float;',
      '#else',
      'precision mediump float;',
      '#endif',
      'uniform vec2 uRes;uniform float uY;uniform vec2 uSq;uniform vec3 uRot;uniform vec2 uLook;',
      'uniform float uBlink;uniform float uEye;uniform float uWave;uniform float uWiggle;uniform float uTalk;uniform float uHappy;',
      'mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}',
      'float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}',
      'float sdEll(vec3 p,vec3 r){float k0=length(p/r);float k1=length(p/(r*r));return k0*(k0-1.)/k1;}',
      'vec3 toLocal(vec3 p){',
      '  p.y-=uY;p.y+=.72;p/=vec3(uSq.x,uSq.y,uSq.x);p.y-=.72;',
      '  p.xy=rot(uRot.z)*p.xy;p.xz=rot(uRot.x)*p.xz;p.yz=rot(uRot.y)*p.yz;',
      '  return p;}',
      'vec2 map(vec3 w){',
      '  vec3 p=toLocal(w);float s=min(uSq.x,uSq.y);',
      '  float b=sdEll(p-vec3(0.,.02,0.),vec3(.74,.68,.66));',
      '  b=smin(b,length(p-vec3(0.,-.3,0.))-.6,.35);',
      '  b=max(b,-(p.y+.72));',
      '  float al=length(p-vec3(-.71,-.24,.06))-.14;',
      '  vec3 ra=p-vec3(.70+.04*uWave+.05*uWiggle*uWave,-.24+.52*uWave,.06+.05*uWave);',
      '  float ar=length(ra)-.14;',
      '  b=smin(b,al,.12);b=smin(b,ar,.12);',
      '  vec2 res=vec2(b*s,1.);',
      '  float eo=uBlink*uEye;',
      '  vec3 ec=vec3(.26,.14,.56);',
      '  vec3 pe=p;pe.x=abs(pe.x);',
      '  float wh=sdEll(pe-ec,vec3(.16*uEye,.19*eo+.004,.09))*s;',
      '  if(wh<res.x)res=vec2(wh,2.);',
      '  vec3 lp=vec3(uLook*.06,0.);',
      '  vec3 pr=vec3(.095*uEye,.11*eo+.003,.055);',
      '  float pu=min(sdEll(p-(vec3(-ec.x,ec.y,ec.z+.055)+lp),pr),sdEll(p-(vec3(ec.x,ec.y,ec.z+.055)+lp),pr))*s;',
      '  if(pu<res.x)res=vec2(pu,3.);',
      '  return res;}',
      'vec3 nrm(vec3 p){vec2 e=vec2(1.,-1.)*.0015;',
      '  return normalize(e.xyy*map(p+e.xyy).x+e.yyx*map(p+e.yyx).x+e.yxy*map(p+e.yxy).x+e.xxx*map(p+e.xxx).x);}',
      'void main(){',
      '  vec2 uv=(gl_FragCoord.xy*2.-uRes)/uRes.y;',
      '  vec3 ro=vec3(0.,.12,3.4);vec3 rd=normalize(vec3(uv,-3.));',
      '  float t=1.6;vec2 h=vec2(1.);bool hit=false;',
      '  for(int i=0;i<80;i++){h=map(ro+rd*t);if(h.x<.0012){hit=true;break;}t+=h.x;if(t>5.)break;}',
      '  if(!hit){gl_FragColor=vec4(0.);return;}',
      '  vec3 p=ro+rd*t;vec3 n=nrm(p);vec3 q=toLocal(p);',
      '  vec3 base;float id=h.y;',
      '  if(id<1.5){',
      '    base=mix(vec3(.55,.43,1.),vec3(.38,.25,.88),smoothstep(.25,-.75,q.y));',
      '    vec2 cq=vec2(abs(q.x)-.43,q.y+.07);',
      '    float ch=smoothstep(.12,.03,length(cq*vec2(1.,1.35)))*step(0.,q.z);',
      '    base=mix(base,vec3(1.,.56,.78),ch*(.5+.4*uHappy));',
      '    if(q.z>.3){',
      '      float arc=smoothstep(.024,.012,abs(length(q.xy-vec2(0.,-.03))-.1))*step(q.y,-.07)*step(abs(q.x),.09);',
      '      float op=smoothstep(1.,.8,length((q.xy-vec2(0.,-.13))/vec2(.07,.018+.05*uTalk)));',
      '      float m=mix(arc,op,smoothstep(.05,.25,uTalk));',
      '      base=mix(base,vec3(.2,.07,.26),m);',
      '    }',
      '  }else if(id<2.5){base=vec3(.98,.98,1.);}else{base=vec3(.06,.04,.12);}',
      '  vec3 L=normalize(vec3(-.55,.75,.65));',
      '  float dif=clamp((dot(n,L)+.35)/1.35,0.,1.);',
      '  vec3 amb=mix(vec3(.42,.28,.62),vec3(.9,.9,1.),n.y*.5+.5);',
      '  float ao=0.;float sc=1.;',
      '  for(int i=1;i<=4;i++){float hh=.04*float(i);ao+=(hh-map(p+n*hh).x)*sc;sc*=.6;}',
      '  ao=clamp(1.-2.2*ao,0.,1.);',
      '  vec3 v=-rd;vec3 H=normalize(L+v);float nh=max(dot(n,H),0.);',
      '  float sp=pow(nh,80.)*.75+pow(nh,10.)*.1;',
      '  if(id>2.5)sp=pow(nh,160.)*1.4;',
      '  float fr=pow(1.-max(dot(n,v),0.),3.);',
      '  vec3 col=base*(dif*.78+amb*.42)*mix(.55,1.,ao);',
      '  col+=sp;',
      '  col+=fr*vec3(1.,.6,.95)*(id<1.5?.5:.15);',
      '  if(id>2.5){col=mix(col,vec3(1.),smoothstep(.955,.985,dot(n,normalize(vec3(-.35,.5,1.)))));}',
      '  gl_FragColor=vec4(clamp(col,0.,1.),1.);',
      '}'
    ].join('\n');

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var u = {};
    ['uRes', 'uY', 'uSq', 'uRot', 'uLook', 'uBlink', 'uEye', 'uWave', 'uWiggle', 'uTalk', 'uHappy'].forEach(function(name) {
      u[name] = gl.getUniformLocation(prog, name);
    });

    host.appendChild(canvas);

    function resize() {
      var size = canvas.clientWidth || 96;
      var px = Math.round(size * Math.min(window.devicePixelRatio || 1, 2) * 1.5);
      if (canvas.width !== px) {
        canvas.width = px;
        canvas.height = px;
        gl.viewport(0, 0, px, px);
      }
    }
    resize();
    window.addEventListener('resize', resize);

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pointer = { x: 0, y: 0, at: -1e9 };
    window.addEventListener('pointermove', function(e) {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.at = performance.now();
    }, { passive: true });

    var hover = 0;
    var hovering = false;
    host.addEventListener('pointerenter', function(e) { if (e.pointerType === 'mouse') hovering = true; });
    host.addEventListener('pointerleave', function() { hovering = false; });

    var s = {
      look: [0, 0],
      wander: [0, 0],
      wanderAt: 0,
      blinkAt: 1.5,
      blinkStart: -1,
      act: null,
      actAt: 4,
      talkUntil: 0,
      open: false,
      sq: [1, 1],
      sqV: [0, 0]
    };

    function startAct(type, dur) {
      s.act = { type: type, t0: now, dur: dur, dir: Math.random() < 0.5 ? -1 : 1 };
    }

    var now = 0;
    var last = performance.now();

    function frame(ms) {
      var dt = Math.min(0.05, (ms - last) / 1000);
      last = ms;
      now += dt;
      resize();

      hover += ((hovering ? 1 : 0) - hover) * (1 - Math.exp(-dt * 10));

      var lookTarget;
      if (s.open) {
        lookTarget = [-0.7, 0.6];
      } else if (ms - pointer.at < 4000) {
        var r = canvas.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        lookTarget = [
          Math.max(-1, Math.min(1, (pointer.x - cx) / (window.innerWidth * 0.45))),
          Math.max(-1, Math.min(1, (cy - pointer.y) / (window.innerHeight * 0.45)))
        ];
      } else {
        if (now > s.wanderAt) {
          s.wander = [Math.random() * 1.6 - 1.1, Math.random() * 1.2 - 0.3];
          s.wanderAt = now + 1.5 + Math.random() * 2.5;
        }
        lookTarget = s.wander;
      }

      if (!s.act && !s.open && now > s.actAt) {
        var pick = Math.random();
        if (pick < 0.3) startAct('hop', 0.75);
        else if (pick < 0.55) startAct('wave', 1.5);
        else if (pick < 0.8) startAct('tilt', 1.6);
        else startAct('peek', 1.4);
        s.actAt = now + 5 + Math.random() * 5;
      }

      var y = Math.sin(now * 2.2) * 0.035;
      var breathe = Math.sin(now * 2.2 + 1.2) * 0.015;
      var tilt = 0;
      var wave = 0;
      var squashTarget = [1 + breathe + 0.07 * hover, 1 - breathe - 0.07 * hover];

      if (s.act) {
        var k = (now - s.act.t0) / s.act.dur;
        if (k >= 1) {
          s.act = null;
        } else if (s.act.type === 'hop') {
          if (k < 0.18) squashTarget = [1.12, 0.86];
          else if (k < 0.82) {
            var a = (k - 0.18) / 0.64;
            y += 4 * a * (1 - a) * 0.3;
            squashTarget = [0.94, 1.08];
          } else squashTarget = [1.1, 0.88];
        } else if (s.act.type === 'wave') {
          wave = Math.sin(Math.PI * Math.min(1, k * 1.15));
        } else if (s.act.type === 'tilt') {
          tilt = Math.sin(Math.PI * k) * 0.22 * s.act.dir;
        } else if (s.act.type === 'peek') {
          lookTarget = [s.act.dir * 0.9, 0.2];
        }
      }

      var ease = 1 - Math.exp(-dt * 7);
      s.look[0] += (lookTarget[0] - s.look[0]) * ease;
      s.look[1] += (lookTarget[1] - s.look[1]) * ease;

      for (var i = 0; i < 2; i++) {
        var force = (squashTarget[i] - s.sq[i]) * 320 - s.sqV[i] * 16;
        s.sqV[i] += force * dt;
        s.sq[i] += s.sqV[i] * dt;
      }

      var blink = 1;
      if (now > s.blinkAt && s.blinkStart < 0) s.blinkStart = now;
      if (s.blinkStart >= 0) {
        var b = (now - s.blinkStart) / 0.16;
        if (b >= 1) {
          s.blinkStart = -1;
          s.blinkAt = now + (Math.random() < 0.2 ? 0.25 : 2.5 + Math.random() * 3.5);
        } else blink = 1 - Math.sin(Math.PI * b);
      }

      var talk = now < s.talkUntil ? (Math.sin(now * 17) * 0.5 + 0.5) : 0;
      var happy = s.open ? 1 : hover;
      if (s.open) blink = Math.min(blink, 0.55);

      host.style.setProperty('--socioryx-hop', String(Math.max(0, y)));

      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uY, y - 0.12);
      gl.uniform2f(u.uSq, s.sq[0], s.sq[1]);
      gl.uniform3f(u.uRot, s.look[0] * 0.38, -s.look[1] * 0.22, tilt);
      gl.uniform2f(u.uLook, s.look[0], s.look[1]);
      gl.uniform1f(u.uBlink, blink);
      gl.uniform1f(u.uEye, 1 + 0.12 * hover);
      gl.uniform1f(u.uWave, wave);
      gl.uniform1f(u.uWiggle, Math.sin(now * 14));
      gl.uniform1f(u.uTalk, talk);
      gl.uniform1f(u.uHappy, happy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reduce) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

    return {
      setOpen: function(value) {
        s.open = value;
        host.classList.toggle('is-open', value);
        if (reduce) requestAnimationFrame(frame);
      },
      hop: function() {
        if (!reduce) startAct('hop', 0.75);
      },
      wave: function() {
        if (!reduce) startAct('wave', 1.5);
      },
      talk: function(seconds) {
        if (!reduce) s.talkUntil = now + seconds;
      }
    };
  }
})();
