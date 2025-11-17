import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import '../../styles/glass.css';
import './DynamicCard.css';

type Size = 'sm' | 'md' | 'lg' | 'xl';

type Props = HTMLAttributes<HTMLDivElement> & {
  // Size
  size?: Size;
  width?: number | string;
  height?: number | string;
  
  // Styling
  accent?: string;
  backgroundColor?: string;
  showBorder?: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderOpacity?: number;
  
  // Cloud animation
  showClouds?: boolean;
  cloudOpacity?: number;
  lightIntensity?: number;
  
  // Ripple effect
  rippleEnabled?: boolean;
  
  // Content slots
  header?: ReactNode;
  icon?: ReactNode;
  image?: string | ReactNode;
  category?: ReactNode;
  label?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  
  // Layout
  contentAlign?: 'left' | 'center' | 'right';
  contentDirection?: 'row' | 'column';
  gap?: number;
  padding?: number | string;
  
  // Interaction
  onClick?: () => void;
  disabled?: boolean;
};

export default function DynamicCard({
  size = 'xl',
  width,
  height,
  accent = '#88bbff',
  backgroundColor,
  showBorder = false,
  borderColor = 'rgba(255, 255, 255, 0.22)',
  borderWidth = 1,
  borderOpacity = 1,
  showClouds = true,
  cloudOpacity = 0.8,
  lightIntensity = 0.3,
  rippleEnabled = true,
  header,
  icon,
  image,
  category,
  label,
  children,
  footer,
  contentAlign = 'center',
  contentDirection = 'column',
  gap = 16,
  padding,
  onClick,
  disabled = false,
  className = '',
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Size presets
  const sizePresets: Record<Size, { width: number; height: number; padding: number }> = {
    sm: { width: 150, height: 150, padding: 12 },
    md: { width: 200, height: 200, padding: 16 },
    lg: { width: 300, height: 300, padding: 24 },
    xl: { width: 400, height: 400, padding: 32 },
  };

  const preset = sizePresets[size];
  const finalWidth = width ?? preset.width;
  const finalHeight = height ?? preset.height;
  const finalPadding = padding ?? preset.padding;

  // Helper to convert color to rgba with opacity
  const applyOpacity = (color: string, opacity: number): string => {
    // If already rgba, extract and replace alpha
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (rgbaMatch) {
      return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
    }
    
    // If hex color
    const hexMatch = color.match(/^#([0-9a-f]{6})$/i);
    if (hexMatch) {
      const hex = hexMatch[1];
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // Fallback: return as-is
    return color;
  };

  // Cloud shader effect
  useEffect(() => {
    if (!showClouds) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_lightIntensity;
      uniform float u_randomSeed;
      uniform float u_cloudOpacity;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(41.0, 289.0))) * 45758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      vec2 rotate(vec2 p, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 centeredUV = (uv - 0.5) * 2.0;

        float breath = sin(u_time * 0.3) * 0.5 + 0.5;
        float baseSpeed = 0.0112;
        float speedVariation = 0.0012;
        float speed1 = baseSpeed + breath * speedVariation;
        float speed2 = baseSpeed + 0.0004;
        
        vec2 randomOffset1 = vec2(u_randomSeed * 123.45, u_randomSeed * 678.90);
        vec2 randomOffset2 = vec2(u_randomSeed * 234.56, u_randomSeed * 789.01);
        
        vec2 motion1 = vec2(u_time * speed1, u_time * speed2 * 0.7) + randomOffset1;
        vec2 motion2 = vec2(u_time * speed2 * 0.5, u_time * speed1 * 0.8) + randomOffset2;
        
        float swirl = u_time * 0.012 + u_randomSeed * 6.28;
        vec2 swirlCenter = rotate(centeredUV, swirl);
        
        float turbulence = sin(u_time * 0.4) * 0.5 + 0.5;
        vec2 turbulentOffset = vec2(
          sin(u_time * 0.5 + centeredUV.y) * 0.3,
          cos(u_time * 0.6 + centeredUV.x) * 0.3
        ) * turbulence;
        
        float n1 = fbm(swirlCenter * 1.2 + motion1 + turbulentOffset);
        vec2 swirlCenter2 = rotate(centeredUV, -swirl * 0.7);
        float n2 = fbm(swirlCenter2 * 1.5 + motion2);
        float n3 = fbm(centeredUV * 2.5 + motion1 * 2.0);
        
        float n = n1 * 0.5 + n2 * 0.35 + n3 * 0.15;
        float c = smoothstep(0.3, 0.95, n);

        vec3 base = vec3(0.04, 0.05, 0.09);
        vec3 highlight = vec3(0.12, 0.15, 0.22);
        vec3 col = mix(base, highlight, c * 0.6);
        
        float lightArea = smoothstep(0.5, 0.85, n);
        vec3 lightColor = vec3(0.4, 0.5, 0.8);
        col += lightColor * lightArea * u_lightIntensity;
        
        float edgeGlow = smoothstep(0.7, 1.0, c);
        col += vec3(0.3, 0.4, 0.7) * edgeGlow * u_lightIntensity * 0.3;

        gl_FragColor = vec4(col, u_cloudOpacity);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const lightIntensityLocation = gl.getUniformLocation(program, 'u_lightIntensity');
    const randomSeedLocation = gl.getUniformLocation(program, 'u_randomSeed');
    const cloudOpacityLocation = gl.getUniformLocation(program, 'u_cloudOpacity');
    
    gl.uniform1f(lightIntensityLocation, lightIntensity);
    gl.uniform1f(randomSeedLocation, Math.random());
    gl.uniform1f(cloudOpacityLocation, cloudOpacity);

    const updateSize = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
    };
    updateSize();

    let startTime = Date.now();
    let animationId: number;

    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      gl.uniform1f(timeLocation, time);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, [showClouds, lightIntensity, cloudOpacity]);

  // Ripple effect
  function ripple(e: React.MouseEvent<HTMLDivElement>) {
    if (!rippleEnabled || disabled) return;
    
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const size = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--ripple-size', `${size}px`);
    el.style.setProperty('--ripple-x', `${x}px`);
    el.style.setProperty('--ripple-y', `${y}px`);
    el.style.setProperty('--accent', accent);

    el.classList.remove('ripple-animate');
    void el.offsetWidth;
    el.classList.add('ripple-animate');
  }

  const containerStyle: React.CSSProperties = {
    width: finalWidth,
    height: finalHeight,
    padding: finalPadding,
    gap,
    backgroundColor: backgroundColor || 'var(--glass-bg)',
    border: showBorder ? `${borderWidth}px solid ${applyOpacity(borderColor, borderOpacity)}` : 'none',
    alignItems: contentAlign,
    justifyContent: 'center',
    flexDirection: contentDirection,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={`dynamic-card glass ${rippleEnabled ? 'ripple-btn' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      style={containerStyle}
      onMouseDown={rippleEnabled ? ripple : undefined}
      onClick={!disabled ? onClick : undefined}
      {...rest}
    >
      {showClouds && (
        <canvas
          ref={canvasRef}
          className="dynamic-card__canvas"
        />
      )}
      
      <div className="dynamic-card__content">
        {header && <div className="dynamic-card__header">{header}</div>}
        
        {image && (
          <div className="dynamic-card__image">
            {typeof image === 'string' ? <img src={image} alt="" /> : image}
          </div>
        )}
        
        {icon && <div className="dynamic-card__icon">{icon}</div>}
        
        {category && <div className="dynamic-card__category">{category}</div>}
        
        {label && <div className="dynamic-card__label">{label}</div>}
        
        {children && <div className="dynamic-card__body">{children}</div>}
        
        {footer && <div className="dynamic-card__footer">{footer}</div>}
      </div>
    </div>
  );
}
