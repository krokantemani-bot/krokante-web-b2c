import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  angle: number;
  spin: number;
  shape: 'circle' | 'chunk' | 'spark' | 'ring';
}

export const WorldCanvas = ({ flavorId }: { flavorId: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Tracking Physics
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Universe Atmosphere Palette & Texture Generator
    const getUniverseConfig = (id: string) => {
      switch (id) {
        case 'fuego':
          return {
            colors: ['#EF4444', '#F97316', '#DC2626', '#FACC15', '#7F1D1D'],
            shapes: ['spark', 'chunk', 'ring'] as const,
            glow: 'rgba(239, 68, 68, 0.25)'
          };
        case 'curcuma':
          return {
            colors: ['#FACC15', '#EAB308', '#CA8A04', '#FEF08A', '#854D0E'],
            shapes: ['circle', 'ring', 'chunk'] as const,
            glow: 'rgba(250, 204, 21, 0.25)'
          };
        case 'cebolla':
          return {
            colors: ['#22C55E', '#16A34A', '#86EFAC', '#15803D', '#4ADE80'],
            shapes: ['chunk', 'circle'] as const,
            glow: 'rgba(34, 197, 94, 0.25)'
          };
        case 'choc':
          return {
            colors: ['#D97706', '#92400E', '#FDE68A', '#78350F', '#B45309'],
            shapes: ['ring', 'chunk', 'circle'] as const,
            glow: 'rgba(217, 119, 6, 0.25)'
          };
        default: // soya
          return {
            colors: ['#FACC15', '#EAB308', '#D97706', '#FFFFFF', '#B45309'],
            shapes: ['chunk', 'circle', 'ring'] as const,
            glow: 'rgba(234, 179, 8, 0.25)'
          };
      }
    };

    const config = getUniverseConfig(flavorId);
    const count = 90;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 4,
        speedX: (Math.random() - 0.5) * 1.8,
        speedY: (Math.random() - 0.5) * 1.8,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.04,
        shape: config.shapes[Math.floor(Math.random() * config.shapes.length)]
      });
    }

    const render = () => {
      // Hide particles & ambient glow when user is on the Hero section
      if (window.scrollY < window.innerHeight * 0.7) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Lerp mouse smooth physics
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Ambient Volumetric Glow
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 50, mouseX, mouseY, width * 0.6);
      gradient.addColorStop(0, config.glow);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        // Mouse Repulsion & Orbital Gravitational Physics
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 5;
          p.y -= (dy / dist) * force * 5;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.spin;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;

        if (p.shape === 'chunk') {
          // Organic irregular crunchy chunk shape
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.8, -p.size * 0.3);
          ctx.lineTo(p.size, p.size * 0.8);
          ctx.lineTo(-p.size * 0.5, p.size);
          ctx.lineTo(-p.size, -p.size * 0.2);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'ring') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [flavorId]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
