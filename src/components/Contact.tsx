import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, Send, CheckCircle2, Server, Laptop, Inbox } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showEmailAnimation, setShowEmailAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [userInfo, setUserInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    const collectUserInfo = async () => {
      const info: Record<string, string> = {
        platform: navigator.platform,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localTime: new Date().toLocaleString(),
      };

      setUserInfo(info);
    };

    collectUserInfo();
  }, []);

  useEffect(() => {
    if (showEmailAnimation) {
      // Animation sequence avec des délais plus courts
      const sequence = [
        () => setAnimationStep(0), // Start
        () => setAnimationStep(1), // To server
        () => setAnimationStep(2), // To inbox
        () => {
          setShowEmailAnimation(false);
          setAnimationStep(0);
        }
      ];

      let timeouts: NodeJS.Timeout[] = [];

      sequence.forEach((step, index) => {
        timeouts.push(setTimeout(step, index * 800)); // Réduit à 800ms
      });

      return () => timeouts.forEach(timeout => clearTimeout(timeout));
    }
  }, [showEmailAnimation]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowEmailAnimation(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    Object.entries(userInfo).forEach(([key, value]) => {
      formData.append(`user_info_${key}`, value);
    });

    try {
      const response = await fetch('https://formsubmit.co/zeioux@protonmail.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setTimeout(() => {
          setSubmitted(true);
          setIsSubmitting(false);
          form.reset();
        }, 2400); // Réduit à 2400ms (3 x 800ms)
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setIsSubmitting(false);
      alert('Une erreur est survenue lors de l\'envoi du message.');
    }
  };

  const getEmailPosition = () => {
    switch (animationStep) {
      case 0:
        return "10%";
      case 1:
        return "50%";
      case 2:
        return "90%";
      default:
        return "10%";
    }
  };

  return (
      <>
        <ParticleBackground />
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <AnimatePresence>
            {showEmailAnimation && (
                <motion.div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                  <div className="relative w-full max-w-2xl mx-auto">
                    {/* Ligne de connexion */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20" />

                    {/* Points de connexion pulsants */}
                    <motion.div
                        className={`absolute top-1/2 left-[10%] w-2 h-2 rounded-full -translate-y-1/2 ${animationStep === 0 ? 'bg-blue-500' : 'bg-blue-500/50'}`}
                        animate={{
                          scale: animationStep === 0 ? [1, 1.5, 1] : 1,
                          opacity: animationStep === 0 ? [0.5, 1, 0.5] : 0.5,
                        }}
                        transition={{
                          duration: 0.5, // Réduit à 0.5s
                          repeat: animationStep === 0 ? Infinity : 0,
                        }}
                    />
                    <motion.div
                        className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${animationStep === 1 ? 'bg-purple-500' : 'bg-purple-500/50'}`}
                        animate={{
                          scale: animationStep === 1 ? [1, 1.5, 1] : 1,
                          opacity: animationStep === 1 ? [0.5, 1, 0.5] : 0.5,
                        }}
                        transition={{
                          duration: 0.5, // Réduit à 0.5s
                          repeat: animationStep === 1 ? Infinity : 0,
                        }}
                    />
                    <motion.div
                        className={`absolute top-1/2 right-[10%] w-2 h-2 rounded-full -translate-y-1/2 ${animationStep === 2 ? 'bg-green-500' : 'bg-green-500/50'}`}
                        animate={{
                          scale: animationStep === 2 ? [1, 1.5, 1] : 1,
                          opacity: animationStep === 2 ? [0.5, 1, 0.5] : 0.5,
                        }}
                        transition={{
                          duration: 0.5, // Réduit à 0.5s
                          repeat: animationStep === 2 ? Infinity : 0,
                        }}
                    />

                    {/* Icônes des étapes */}
                    <div className="flex justify-between items-center px-8">
                      <div className="relative">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                              y: animationStep === 0 ? [-5, 5] : 0
                            }}
                            transition={{
                              y: {
                                duration: 0.5, // Réduit à 0.5s
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                              }
                            }}
                            className="flex flex-col items-center"
                        >
                          <div className={`bg-blue-500/10 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${animationStep === 0 ? 'bg-blue-500/20 scale-110' : ''}`}>
                            <Laptop className={`w-8 h-8 ${animationStep === 0 ? 'text-blue-400' : 'text-blue-400/50'}`} />
                          </div>
                          <span className={`text-sm mt-2 transition-colors duration-300 ${animationStep === 0 ? 'text-blue-400' : 'text-blue-400/50'}`}>Client</span>
                        </motion.div>
                      </div>

                      <div className="relative">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                              y: animationStep === 1 ? [-5, 5] : 0
                            }}
                            transition={{
                              y: {
                                duration: 0.5, // Réduit à 0.5s
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                              }
                            }}
                            className="flex flex-col items-center"
                        >
                          <div className={`bg-purple-500/10 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${animationStep === 1 ? 'bg-purple-500/20 scale-110' : ''}`}>
                            <Server className={`w-8 h-8 ${animationStep === 1 ? 'text-purple-400' : 'text-purple-400/50'}`} />
                          </div>
                          <span className={`text-sm mt-2 transition-colors duration-300 ${animationStep === 1 ? 'text-purple-400' : 'text-purple-400/50'}`}>Serveur</span>
                        </motion.div>
                      </div>

                      <div className="relative">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                              y: animationStep === 2 ? [-5, 5] : 0
                            }}
                            transition={{
                              y: {
                                duration: 0.5, // Réduit à 0.5s
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                              }
                            }}
                            className="flex flex-col items-center"
                        >
                          <div className={`bg-green-500/10 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${animationStep === 2 ? 'bg-green-500/20 scale-110' : ''}`}>
                            <Inbox className={`w-8 h-8 ${animationStep === 2 ? 'text-green-400' : 'text-green-400/50'}`} />
                          </div>
                          <span className={`text-sm mt-2 transition-colors duration-300 ${animationStep === 2 ? 'text-green-400' : 'text-green-400/50'}`}>Boîte mail</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Email animé */}
                    <motion.div
                        className="absolute top-1/2 left-0 -translate-y-1/2"
                        animate={{
                          left: getEmailPosition(),
                          scale: animationStep === 1 ? 0.8 : 1
                        }}
                        transition={{
                          duration: 0.8, // Réduit à 0.8s
                          ease: "easeInOut"
                        }}
                    >
                      <motion.div
                          className="relative"
                          animate={{
                            rotate: [-5, 5],
                            y: [-2, 2]
                          }}
                          transition={{
                            duration: 0.5, // Réduit à 0.5s
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                      >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-50 blur-lg"
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 1, // Réduit à 1s
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                        />
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg relative z-10">
                          <Mail className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold text-white mb-4">Me Contacter</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">
                    Nom
                  </label>
                  <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                    Email
                  </label>
                  <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-2">
                    Message
                  </label>
                  <textarea
                      name="message"
                      id="message"
                      rows={6}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                <span className="flex items-center">
                  {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Envoi en cours...
                      </>
                  ) : submitted ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Message envoyé !
                      </>
                  ) : (
                      <>
                        <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Envoyer
                      </>
                  )}
                </span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </>
  );
};