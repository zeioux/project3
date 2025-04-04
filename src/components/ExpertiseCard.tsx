import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
  gradient: string;
}

export const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  icon: Icon,
  title,
  description,
  highlight,
  gradient
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: 12,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    hover: { 
      opacity: 0.8,
      scale: 1.2,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2
      }
    }
  };

  return (
    <motion.div
      className="group relative perspective-1000"
      variants={cardVariants}
      whileHover="hover"
    >
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-2xl`}
        variants={glowVariants}
        initial="initial"
        animate="hover"
        style={{ opacity: 0.1 }}
      />
      
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <div className="px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
            {highlight}
          </div>

          {/* Icon */}
          <motion.div
            className="relative"
            variants={iconVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-full animate-pulse-slow" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-full">
              <Icon className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.h3 
            className="text-2xl font-bold text-white"
            variants={{
              hover: { scale: 1.05 }
            }}
          >
            {title}
          </motion.h3>
          
          <p className="text-white/70">
            {description}
          </p>

          {/* Decorative line */}
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};