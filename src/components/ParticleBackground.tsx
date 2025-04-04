import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    size: number;
    color: string;
    alpha: number;
    rotation: number;
    shape: 'triangle' | 'square' | 'circle';
    mass: number;
    elasticity: number;
}

const colors = [
    '#60A5FA', '#93C5FD', '#3B82F6',  // Blues
    '#A78BFA', '#C4B5FD', '#8B5CF6',  // Purples
    '#34D399', '#6EE7B7', '#10B981',  // Greens
    '#F472B6', '#F9A8D4', '#EC4899'   // Pinks
];

const shapes = ['triangle', 'square', 'circle'] as const;

export const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();
    const mousePosition = useRef({ x: 0, y: 0 });

    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const { width, height } = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
    };

    const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, shape: Particle['shape'], rotation: number) => {
        // Ensure size is always positive
        const safeSize = Math.max(0.1, size);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        switch (shape) {
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(-safeSize, safeSize);
                ctx.lineTo(safeSize, safeSize);
                ctx.lineTo(0, -safeSize);
                ctx.closePath();
                break;
            case 'square':
                ctx.beginPath();
                ctx.rect(-safeSize, -safeSize, safeSize * 2, safeSize * 2);
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, safeSize, 0, Math.PI * 2);
                break;
        }

        ctx.fill();
        ctx.restore();
    };

    const checkCollision = (p1: Particle, p2: Particle) => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (p1.size + p2.size);
    };

    const resolveCollision = (p1: Particle, p2: Particle) => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const nx = dx / distance;
        const ny = dy / distance;

        const vx = p2.speedX - p1.speedX;
        const vy = p2.speedY - p1.speedY;
        const velocityAlongNormal = vx * nx + vy * ny;

        if (velocityAlongNormal > 0) return;

        const restitution = (p1.elasticity + p2.elasticity) / 2;
        const j = -(1 + restitution) * velocityAlongNormal;
        const impulse = j / (1 / p1.mass + 1 / p2.mass);

        p1.speedX -= (impulse * nx) / p1.mass;
        p1.speedY -= (impulse * ny) / p1.mass;
        p2.speedX += (impulse * nx) / p2.mass;
        p2.speedY += (impulse * ny) / p2.mass;

        const rotationFactor = 0.1;
        p1.rotation += (velocityAlongNormal * rotationFactor) / p1.mass;
        p2.rotation -= (velocityAlongNormal * rotationFactor) / p2.mass;

        const overlap = (p1.size + p2.size - distance) / 2;
        p1.x -= overlap * nx;
        p1.y -= overlap * ny;
        p2.x += overlap * nx;
        p2.y += overlap * ny;
    };

    useEffect(() => {
        const initParticles = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const particles: Particle[] = [];
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    size: Math.random() * 4 + 2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: Math.random() * 0.5 + 0.5,
                    rotation: Math.random() * Math.PI * 2,
                    shape: shapes[Math.floor(Math.random() * shapes.length)],
                    mass: Math.random() * 2 + 1,
                    elasticity: Math.random() * 0.3 + 0.5
                });
            }

            particlesRef.current = particles;
        };

        updateCanvasSize();
        initParticles();

        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
            initParticles();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !ctx) return;

        const animate = () => {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    if (checkCollision(particlesRef.current[i], particlesRef.current[j])) {
                        resolveCollision(particlesRef.current[i], particlesRef.current[j]);
                    }
                }
            }

            particlesRef.current.forEach(particle => {
                particle.rotation += particle.speedX * 0.1;
                // Ensure particle size never goes below 0.1
                particle.size = Math.max(0.1, particle.size + Math.sin(Date.now() * 0.003) * 0.1);
                particle.alpha = 0.5 + Math.sin(Date.now() * 0.002) * 0.2;

                const randomAccel = 0.05;
                particle.speedX += (Math.random() - 0.5) * randomAccel;
                particle.speedY += (Math.random() - 0.5) * randomAccel;

                const maxSpeed = 5;
                const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                if (speed > maxSpeed) {
                    particle.speedX = (particle.speedX / speed) * maxSpeed;
                    particle.speedY = (particle.speedY / speed) * maxSpeed;
                }

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                const dampening = 0.8;
                if (particle.x < 0 || particle.x > canvas.width / window.devicePixelRatio) {
                    particle.speedX *= -dampening;
                    particle.x = Math.max(0, Math.min(particle.x, canvas.width / window.devicePixelRatio));
                }
                if (particle.y < 0 || particle.y > canvas.height / window.devicePixelRatio) {
                    particle.speedY *= -dampening;
                    particle.y = Math.max(0, Math.min(particle.y, canvas.height / window.devicePixelRatio));
                }

                const dx = particle.x - mousePosition.current.x;
                const dy = particle.y - mousePosition.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 150;

                if (distance < interactionRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (interactionRadius - distance) / interactionRadius;
                    const targetSpeed = 5 * force;

                    particle.speedX = particle.speedX * 0.9 + (Math.cos(angle) * targetSpeed) * 0.1;
                    particle.speedY = particle.speedY * 0.9 + (Math.sin(angle) * targetSpeed) * 0.1;
                }

                // Ensure minimum radius is always positive
                const minRadius = 0.1;
                const glow = ctx.createRadialGradient(
                    particle.x, particle.y, minRadius,
                    particle.x, particle.y, Math.max(minRadius, particle.size * 3)
                );
                glow.addColorStop(0, `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`);
                glow.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = glow;
                drawShape(ctx, particle.x, particle.y, particle.size, particle.shape, particle.rotation);

                particlesRef.current.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        const gradient = ctx.createLinearGradient(
                            particle.x, particle.y,
                            otherParticle.x, otherParticle.y
                        );
                        gradient.addColorStop(0, `${particle.color}${Math.floor(particle.alpha * 0.3 * 255).toString(16).padStart(2, '0')}`);
                        gradient.addColorStop(1, `${otherParticle.color}${Math.floor(otherParticle.alpha * 0.3 * 255).toString(16).padStart(2, '0')}`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = Math.max(0.5, (1 - distance / 150) * 2);
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            mousePosition.current = {
                x: (e.clientX - rect.left) * (canvas.width / (rect.width * dpr)),
                y: (e.clientY - rect.top) * (canvas.height / (rect.height * dpr))
            };
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 -z-10">
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ background: 'black' }}
            />
        </div>
    );
};