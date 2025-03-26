import React, { useState } from 'react';
import {Shield, Cloud, Server, ExternalLink, Globe} from 'lucide-react';
import { HiddenResources } from './HiddenResources';

export const TechWatch: React.FC = () => {
  const [showHiddenResources, setShowHiddenResources] = useState(false);

  const articles = [
    {
      title: "Sécurité IT",
      description: "Dernières actualités et bonnes pratiques en matière de sécurité informatique",
      icon: Shield,
      category: "security"
    },
    {
      title: "Communautés",
      description: "Évolutions des solutions cloud et tendances du marché",
      icon: Globe,
      category: "cloud"
    },
    {
      title: "Infrastructure",
      description: "Innovations en matière d'infrastructure et de réseaux",
      icon: Server,
      category: "infrastructure"
    }
  ];

  if (showHiddenResources) {
    return <HiddenResources onBack={() => setShowHiddenResources(false)} />;
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Veille Technologique
        </h2>
        <div className="h-1 w-20 bg-[#00b4d8] mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Suivez l'actualité et les dernières innovations en matière de systèmes et réseaux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((item, index) => (
          <div
            key={index}
            className="group bg-[#1c1f26] rounded-xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn shadow-lg"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <item.icon className="h-12 w-12 text-[#00b4d8] mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-gray-300 mb-4">{item.description}</p>
            
            <button
              onClick={() => setShowHiddenResources(true)}
              className="inline-flex items-center text-[#00b4d8] hover:text-[#00d5ff] transition-all duration-300 group-hover:translate-x-2"
            >
              En savoir plus
              <ExternalLink className="h-4 w-4 ml-2" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};