import React from 'react';
import { DocType } from '../types/documentation';
import { documentationContent } from '../data/documentation';

interface ProjectsProps {
  onDocClick: (docType: DocType) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onDocClick }) => {
  const categories = [
    {
      title: "Systèmes",
      types: ['arch', 'debian'] as DocType[],
    },
    {
      title: "Supervision & Gestion",
      types: ['zabbix', 'glpi'] as DocType[],
    },
    {
      title: "Infrastructure & Sécurité",
      types: ['ssh', 'proxy', 'partitions'] as DocType[],
    }
  ];

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mes Réalisations
        </h2>
        <div className="h-1 w-20 bg-[#00b4d8] mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Documentation technique et guides d'installation
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="animate-fadeIn">
            <h3 className="text-2xl font-bold text-white mb-8">{category.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.types.map((docType, index) => {
                const doc = documentationContent[docType];
                return (
                  <div
                    key={docType}
                    onClick={() => onDocClick(docType)}
                    className="group bg-[#1c1f26] rounded-xl p-8 cursor-pointer hover:bg-[#21262d] transition-all duration-300 transform hover:-translate-y-2 shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {React.createElement(doc.icon, {
                      className: "h-12 w-12 text-[#00b4d8] mb-4 transition-transform duration-300 group-hover:scale-110"
                    })}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {doc.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {doc.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doc.files.map((file, fileIndex) => (
                        <span
                          key={fileIndex}
                          className="px-3 py-1 bg-[#2d333b] text-[#00b4d8] rounded-full text-sm"
                        >
                          {file.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};