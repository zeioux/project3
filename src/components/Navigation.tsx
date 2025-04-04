import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Sparkles, Coffee, Gamepad2 } from 'lucide-react';
import { SpaceJourney } from './SpaceJourney';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Rocket, color: 'from-gray-500 to-gray-600' },
    { id: 'entreprise', label: 'Entreprise', icon: Coffee, color: 'from-gray-500 to-gray-600' },
    { id: 'realisations', label: 'Réalisations', icon: Sparkles, color: 'from-gray-500 to-gray-600' },
    { id: 'veille', label: 'Veille', icon: Gamepad2, color: 'from-gray-500 to-gray-600' },
    { id: 'contact', label: 'Contact', icon: Coffee, color: 'from-gray-500 to-gray-600' },
  ];

  const handleNavClick = (id: string) => {
    onSectionChange(id);
    setIsOpen(false);
  };

  return (
      <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed w-full z-50 top-2"
      >
        <div className="max-w-2xl mx-auto px-2">
          <div className="relative bg-black/30 backdrop-blur-md rounded-lg border border-white/5 shadow-lg">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center p-1">
              {navItems.map((item) => (
                  <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      onHoverStart={() => setHoveredItem(item.id)}
                      onHoverEnd={() => setHoveredItem(null)}
                      className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 ${
                          activeSection === item.id
                              ? 'text-white'
                              : 'text-white/70 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence>
                      {(activeSection === item.id || hoveredItem === item.id) && (
                          <motion.div
                              layoutId="activeSection"
                              className="absolute inset-0 bg-white/5 rounded-lg"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                          />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 flex items-center gap-1.5">
                      <motion.div
                          animate={hoveredItem === item.id ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                      >
                        {React.createElement(item.icon, {
                          className: `h-3.5 w-3.5 ${activeSection === item.id ? 'text-white' : 'text-white/70'}`
                        })}
                      </motion.div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </motion.button>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-between p-3">
              <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
              >
                <Rocket className="h-5 w-5 text-white/70" />
                <span className="ml-2 text-base font-medium text-white">Portfolio</span>
              </motion.div>
              <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white/70 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40 flex items-center justify-center"
                >
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex flex-col items-center justify-center space-y-4"
                  >
                    {navItems.map((item, index) => (
                        <motion.button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`relative w-48 px-6 py-3 rounded-lg text-base transition-all duration-300 ${
                                activeSection === item.id
                                    ? 'text-white'
                                    : 'text-white/70 hover:text-white'
                            }`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              transition: { delay: index * 0.1 }
                            }}
                            exit={{
                              opacity: 0,
                              x: 50,
                              transition: { delay: (navItems.length - index - 1) * 0.1 }
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                          {activeSection === item.id && (
                              <motion.div
                                  layoutId="activeMobileSection"
                                  className="absolute inset-0 bg-white/5 rounded-lg"
                                  transition={{ duration: 0.3 }}
                              />
                          )}
                          <div className="relative z-10 flex items-center justify-center gap-3">
                            {React.createElement(item.icon, {
                              className: `h-5 w-5 ${activeSection === item.id ? 'text-white' : 'text-white/70'}`
                            })}
                            <span>{item.label}</span>
                          </div>
                        </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
  );
};