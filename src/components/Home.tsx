import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Shield,
  Network,
  Cloud,
  Download,
  Mail,
  Coffee,
  Terminal,
  MonitorCheck,
  FileCode,
  Globe,
  Router,
  SwitchCamera,
  ShieldCheck,
  Lock,
  HardDrive,
  Cpu,
  Server
} from 'lucide-react';
import { EasterEgg } from './EasterEgg';

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

interface HomeProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onContactClick, onProjectsClick }) => {
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#60A5FA', '#93C5FD', '#3B82F6',  // Blues
    '#A78BFA', '#C4B5FD', '#8B5CF6',  // Purples
    '#34D399', '#6EE7B7', '#10B981',  // Greens
    '#F472B6', '#F9A8D4', '#EC4899'   // Pinks
  ];

  const shapes = ['triangle', 'square', 'circle'] as const;

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
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    switch (shape) {
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(-size, size);
        ctx.lineTo(size, size);
        ctx.lineTo(0, -size);
        ctx.closePath();
        break;
      case 'square':
        ctx.beginPath();
        ctx.rect(-size, -size, size * 2, size * 2);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
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

    // Normalisation des vecteurs
    const nx = dx / distance;
    const ny = dy / distance;

    // Vitesse relative
    const vx = p2.speedX - p1.speedX;
    const vy = p2.speedY - p1.speedY;
    const velocityAlongNormal = vx * nx + vy * ny;

    // Si les particules s'éloignent, pas besoin de résoudre la collision
    if (velocityAlongNormal > 0) return;

    // Coefficient de restitution moyen
    const restitution = (p1.elasticity + p2.elasticity) / 2;

    // Impulsion
    const j = -(1 + restitution) * velocityAlongNormal;
    const impulse = j / (1 / p1.mass + 1 / p2.mass);

    // Application de l'impulsion
    p1.speedX -= (impulse * nx) / p1.mass;
    p1.speedY -= (impulse * ny) / p1.mass;
    p2.speedX += (impulse * nx) / p2.mass;
    p2.speedY += (impulse * ny) / p2.mass;

    // Ajout d'une rotation basée sur la collision
    const rotationFactor = 0.1;
    p1.rotation += (velocityAlongNormal * rotationFactor) / p1.mass;
    p2.rotation -= (velocityAlongNormal * rotationFactor) / p2.mass;

    // Séparation des particules pour éviter le chevauchement
    const overlap = (p1.size + p2.size - distance) / 2;
    p1.x -= overlap * nx;
    p1.y -= overlap * ny;
    p2.x += overlap * nx;
    p2.y += overlap * ny;
  };

  // Initialisation des particules
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

  // Animation des particules
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Vérification des collisions
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          if (checkCollision(particlesRef.current[i], particlesRef.current[j])) {
            resolveCollision(particlesRef.current[i], particlesRef.current[j]);
          }
        }
      }

      particlesRef.current.forEach(particle => {
        // Animation de rotation
        particle.rotation += particle.speedX * 0.1;

        // Animation de taille pulsante
        const minSize = 0.5; // Ensure minimum size
        particle.size = Math.max(minSize, particle.size + Math.sin(Date.now() * 0.003) * 0.1);

        // Animation d'alpha
        particle.alpha = 0.5 + Math.sin(Date.now() * 0.002) * 0.2;

        // Mise à jour de la position avec accélération aléatoire
        const randomAccel = 0.05;
        particle.speedX += (Math.random() - 0.5) * randomAccel;
        particle.speedY += (Math.random() - 0.5) * randomAccel;

        // Limitation de la vitesse
        const maxSpeed = 5;
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (speed > maxSpeed) {
          particle.speedX = (particle.speedX / speed) * maxSpeed;
          particle.speedY = (particle.speedY / speed) * maxSpeed;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Rebond sur les bords avec perte d'énergie
        const dampening = 0.8;
        if (particle.x < 0 || particle.x > canvas.width / window.devicePixelRatio) {
          particle.speedX *= -dampening;
          particle.x = Math.max(0, Math.min(particle.x, canvas.width / window.devicePixelRatio));
        }
        if (particle.y < 0 || particle.y > canvas.height / window.devicePixelRatio) {
          particle.speedY *= -dampening;
          particle.y = Math.max(0, Math.min(particle.y, canvas.height / window.devicePixelRatio));
        }

        // Interaction avec la souris
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

        // Effet de lueur avec rayon minimum garanti
        const minRadius = 0.1; // Minimum radius for gradient
        const glow = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, Math.max(minRadius, particle.size * 3)
        );
        glow.addColorStop(0, `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = glow;
        drawShape(ctx, particle.x, particle.y, particle.size, particle.shape, particle.rotation);

        // Connexions entre particules
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

    // Gestion de la position de la souris
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mousePosition.current = {
        x: (e.clientX - rect.left) * (canvas.width / (rect.width * dpr)),
        y: (e.clientY - rect.top) * (canvas.height / (rect.height * dpr))
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Démarrage de l'animation
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const personalInfo = {
    firstName: "Clément",
    lastName: "Martins--Baumann",
    title: "Étudiant en BTS SIO SISR",
    level: "2ème année",
    location: "Paris, France",
    experience: "En formation",
    availability: "Recherche alternance en administration systèmes et réseaux"
  };

  const skills = [
    {
      category: "Infrastructure",
      items: [
        { name: "Administration Linux", icon: Terminal },
        { name: "Windows Server", icon: MonitorCheck },
        { name: "Virtualisation", icon: Cloud },
        { name: "Active Directory", icon: FileCode },
        { name: "Supervision", icon: Cpu },
        { name: "Scripting", icon: Terminal }
      ],
      icon: Server,
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      category: "Réseaux",
      items: [
        { name: "TCP/IP", icon: Globe },
        { name: "Routage", icon: Router },
        { name: "Switching", icon: SwitchCamera },
        { name: "VLANs", icon: Network },
        { name: "Pare-feu", icon: Shield },
        { name: "VPN", icon: Lock }
      ],
      icon: Network,
      gradient: "from-indigo-500/20 to-purple-500/20"
    },
    {
      category: "Sécurité",
      items: [
        { name: "Sécurité réseau", icon: ShieldCheck },
        { name: "Cryptographie", icon: Lock },
        { name: "Authentification", icon: Lock },
        { name: "Sauvegarde", icon: HardDrive },
        { name: "Monitoring", icon: MonitorCheck },
        { name: "Hardening", icon: Shield }
      ],
      icon: Shield,
      gradient: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  const handleCoffeeClick = () => {
    setCoffeeCount(prev => {
      if (prev === 9) {
        setShowEasterEgg(true);
      }
      return prev + 1;
    });
  };

  if (showEasterEgg) {
    return <EasterEgg onBack={() => setShowEasterEgg(false)} coffeeCount={coffeeCount} />;
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
      <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
        {/* Background Canvas */}
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0"
            style={{ background: 'black' }}
        />

        {/* Content */}
        <section className="relative min-h-screen flex items-center justify-center py-20 z-10">
          <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              className="relative z-10 text-center space-y-12 max-w-4xl mx-auto px-4"
          >
            <motion.h1 className="text-6xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#3B82F6] text-transparent bg-clip-text">
              {personalInfo.firstName}
            </span>
              <br />
              <span className="bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-[#8B5CF6] text-transparent bg-clip-text opacity-90">
              {personalInfo.lastName}
            </span>
            </motion.h1>

            <motion.div
                variants={titleVariants}
                className="space-y-6"
            >
              <motion.h2
                  className="text-2xl md:text-3xl text-white/90 font-light tracking-wide"
              >
                {personalInfo.title}
              </motion.h2>
              <motion.p
                  className="text-lg text-white/70"
              >
                {personalInfo.level} · {personalInfo.location}
              </motion.p>
              <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <p className="text-cyan-400 font-medium">
                  {personalInfo.availability}
                </p>
              </motion.div>
            </motion.div>

            <motion.div
                variants={titleVariants}
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onContactClick}
                  className="group relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              >
                <motion.span
                    className="flex items-center justify-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Me contacter
                </motion.span>
              </motion.button>

              <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative w-full sm:w-auto px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <motion.span
                    className="flex items-center justify-center text-white"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Télécharger CV
                </motion.span>
              </motion.button>

              <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCoffeeClick}
                  className="relative hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/20 border border-white/10 hover:border-white/20"
                  title="Un petit café ?"
              >
                <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                >
                  <Coffee className="h-6 w-6 text-amber-400" />
                </motion.div>
                {coffeeCount > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {coffeeCount}
                    </motion.div>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="relative py-20 px-4 z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((category, index) => (
                  <motion.div
                      key={category.category}
                      variants={skillCardVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
                      onHoverStart={() => setHoveredSkill(category.category)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient}`}
                      >
                        <motion.div
                            animate={hoveredSkill === category.category ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360],
                            } : {}}
                            transition={{
                              duration: 1,
                              ease: "easeInOut",
                              times: [0, 0.5, 1]
                            }}
                        >
                          {React.createElement(category.icon, {
                            className: "h-8 w-8 text-white"
                          })}
                        </motion.div>
                      </motion.div>
                      <h3 className="text-lg font-semibold text-white">
                        {category.category}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {category.items.map((skill, skillIndex) => (
                          <motion.div
                              key={skillIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + skillIndex * 0.1 }}
                              className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"
                          >
                            <motion.div
                                animate={hoveredSkill === category.category ? {
                                  rotate: [0, 360],
                                  scale: [1, 1.2, 1]
                                } : {}}
                                transition={{
                                  duration: 0.5,
                                  delay: skillIndex * 0.1
                                }}
                            >
                              {React.createElement(skill.icon, {
                                className: "h-4 w-4 text-white/60"
                              })}
                            </motion.div>
                            <span className="text-sm text-white/80">{skill.name}</span>
                          </motion.div>
                      ))}
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

export default Home;