import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Company } from './components/Company';
import { Projects } from './components/Projects';
import { TechWatch } from './components/TechWatch';
import { Contact } from './components/Contact';
import { Documentation } from './components/Documentation';
import { LoadingScreen } from './components/LoadingScreen';
import { ParticleBackground } from './components/ParticleBackground';
import { DocType } from './types/documentation';

type Section = 'accueil' | 'entreprise' | 'realisations' | 'veille' | 'contact' | 'documentation';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('accueil');
  const [selectedDoc, setSelectedDoc] = useState<DocType | null>(null);

  const handleContactClick = () => {
    setActiveSection('contact');
  };

  const handleProjectsClick = () => {
    setActiveSection('realisations');
  };

  const handleDocClick = (docType: DocType) => {
    setSelectedDoc(docType);
    setActiveSection('documentation');
  };

  const sections: Record<Section, JSX.Element> = {
    accueil: <Home onContactClick={handleContactClick} onProjectsClick={handleProjectsClick} />,
    entreprise: <Company />,
    realisations: <Projects onDocClick={handleDocClick} />,
    veille: <TechWatch />,
    contact: <Contact />,
    documentation: (
        <Documentation
            selectedDoc={selectedDoc}
            onDocClick={handleDocClick}
            onBack={() => setSelectedDoc(null)}
        />
    ),
  };

  return (
      <div className="min-h-screen bg-black overflow-hidden font-mono">
        <ParticleBackground />
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <motion.main
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 max-w-5xl mx-auto px-2 pt-16"
            >
              {sections[activeSection]}
            </motion.main>
          </AnimatePresence>
        </Suspense>
      </div>
  );
}

export default App;