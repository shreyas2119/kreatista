'use client';

import { GLSLHills } from '@/components/ui/glsl-hills';

export function HeroShader() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden="true">
      <GLSLHills speed={0.4} cameraZ={125} planeSize={256} />
    </div>
  );
}
