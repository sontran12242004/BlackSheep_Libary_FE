import React, { useEffect, useRef } from 'react';

export default function BlazingFireAvatar3D({ avatarUrl, size = 120, onClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true }) || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Enable Alpha Blending to guarantee 100% Transparent Square Background
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Vertex Shader
    const vsSource = `
      attribute vec2 aPosition;
      attribute vec2 aTexCoord;
      varying vec2 vUv;
      void main() {
        vUv = aTexCoord;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment Shader: 100% Transparent Square Background with Free-Flowing Flames
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform sampler2D uAvatarTex;

      // Simplex Noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p) {
        float val = 0.0;
        float amp = 0.5;
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < 4; i++) {
          val += amp * snoise(p);
          p = rot * p * 2.02;
          amp *= 0.5;
        }
        return val;
      }

      // Hyper-Realistic Real Fire Color Palette
      vec3 freeFireColor(float t) {
        vec3 cCharcoal   = vec3(0.18, 0.02, 0.01);
        vec3 cDeepRed    = vec3(0.92, 0.08, 0.01);
        vec3 cFireOrange = vec3(1.0, 0.38, 0.0);
        vec3 cGoldYellow = vec3(1.0, 0.82, 0.08);
        vec3 cHotWhite   = vec3(1.0, 0.98, 0.88);

        if (t > 0.75) return mix(cGoldYellow, cHotWhite, (t - 0.75) / 0.25);
        if (t > 0.45) return mix(cFireOrange, cGoldYellow, (t - 0.45) / 0.30);
        if (t > 0.20) return mix(cDeepRed, cFireOrange, (t - 0.20) / 0.25);
        return mix(cCharcoal, cDeepRed, t / 0.20);
      }

      void main() {
        vec2 uv = vUv - vec2(0.5);
        float dist = length(uv);
        float angle = atan(uv.y, uv.x);

        // Center Avatar Radius (0.28)
        float avatarRadius = 0.28;
        float avatarMask = smoothstep(avatarRadius + 0.002, avatarRadius - 0.002, dist);

        // STATIONARY CLEAN AVATAR AT CENTER
        vec2 avatarUv = (vUv - vec2(0.5)) / (avatarRadius * 2.0) + vec2(0.5);
        vec4 avatarTex = texture2D(uAvatarTex, avatarUv);
        vec3 cleanAvatar = avatarTex.rgb;

        // FREE-FLOWING FLAMES OUTSIDE AVATAR
        float vfxMask = smoothstep(avatarRadius - 0.002, avatarRadius + 0.008, dist);

        // Dynamic Flame Extension
        float flameExtension = 0.09 * snoise(vec2(angle * 4.0 + uTime * 2.2, uTime * 1.1))
                             + 0.05 * snoise(vec2(angle * 9.0 - uTime * 3.4, uTime * 1.8));

        float flameBaseRadius = avatarRadius + 0.03 + max(0.0, flameExtension);
        float flameDist = abs(dist - flameBaseRadius);

        // FBM Turbulence for Wild Organic Fire Tongues
        float fireNoise = fbm(vec2(angle * 6.0 + uTime * 2.8, dist * 12.0 - uTime * 4.2));
        float flameDensity = smoothstep(0.16 + fireNoise * 0.08, 0.0, flameDist) * vfxMask;

        // Smooth Radial Fade out into 100% Transparent Space (NO SQUARE BOX BACKGROUND)
        float outerFade = smoothstep(0.46, 0.25, dist);
        float smoke = fbm(uv * 5.0 + vec2(0.0, -uTime * 0.6)) * outerFade * vfxMask * 0.4;

        vec3 flameColor = freeFireColor(flameDensity + smoke);
        
        // Inner Glowing Fire Border Ring
        float innerRing = smoothstep(0.01, 0.0, abs(dist - avatarRadius));
        vec3 ringGlow = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.9, 0.5), innerRing);

        // Soft Radial Glow
        float radialGlow = outerFade * flameDensity * 1.6 * vfxMask;

        // COMBINE:
        vec3 externalFire = flameColor + smoke * vec3(0.3, 0.1, 0.05) + flameColor * radialGlow;
        vec3 internalAvatar = cleanAvatar + ringGlow * innerRing * 0.3;

        vec3 finalColor = mix(externalFire, internalAvatar, avatarMask);
        
        // Strict Alpha calculation so outer background outside flames is 100% Transparent
        float alpha = max(avatarMask, clamp((flameDensity + radialGlow * 0.5) * outerFade, 0.0, 1.0));

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad Vertices
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  0, 1,
       1, -1,  1, 1,
      -1,  1,  0, 0,
      -1,  1,  0, 0,
       1, -1,  1, 1,
       1,  1,  1, 0,
    ]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    const aTexCoord = gl.getAttribLocation(program, 'aTexCoord');
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aTexCoord);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 16, 8);

    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uAvatarTexLoc = gl.getUniformLocation(program, 'uAvatarTex');

    // Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 15, 255]));

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };
    img.src = avatarUrl || '/logo.jpg';

    let animationFrameId;
    let startTime = performance.now();

    // Render 60 FPS Loop
    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, currentTime);
      gl.uniform1i(uAvatarTexLoc, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [avatarUrl, size]);

  return (
    <div 
      onClick={onClick}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'visible'
      }}
    >
      <canvas
        ref={canvasRef}
        width={size * 2}
        height={size * 2}
        style={{
          position: 'absolute',
          width: `${size * 1.35}px`,
          height: `${size * 1.35}px`,
          display: 'block',
          pointerEvents: 'none',
          background: 'transparent'
        }}
      />
    </div>
  );
}
