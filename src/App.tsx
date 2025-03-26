import React, { useState } from 'react';
import { Code2, Menu, X } from 'lucide-react';
import { DocType } from './types/documentation';
import { Documentation } from './components/Documentation';
import { Home } from './components/Home';
import { Company } from './components/Company';
import { Projects } from './components/Projects';
import { TechWatch } from './components/TechWatch';
import { Contact } from './components/Contact';

type Section = 'accueil' | 'entreprise' | 'realisations' | 'veille' | 'contact' | 'documentation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('accueil');
  const [selectedDoc, setSelectedDoc] = useState<DocType | null>(null);

  const handleContactClick = () => {
    setActiveSection('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectsClick = () => {
    setActiveSection('realisations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDocClick = (docType: DocType) => {
    setSelectedDoc(docType);
    setActiveSection('documentation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#0d1117]">
      {/* Navigation */}
      <nav className="bg-[#161b22] fixed w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-[#00b4d8]" />
              <span className="ml-2 text-xl font-bold text-white">Portfolio</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['accueil', 'entreprise', 'realisations', 'veille', 'contact', 'documentation'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section as Section);
                    if (section === 'documentation') {
                      setSelectedDoc(null);
                    }
                  }}
                  className={`nav-link ${activeSection === section ? 'text-white' : 'text-gray-300'}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#161b22] pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['accueil', 'entreprise', 'realisations', 'veille', 'contact', 'documentation'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section as Section);
                    if (section === 'documentation') {
                      setSelectedDoc(null);
                    }
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {sections[activeSection]}
      </main>
    </div>
  );
}

export default App;