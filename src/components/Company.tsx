import React from 'react';
import { Target, BrainCircuit, BookOpenCheck, Users, Shield, Cloud } from 'lucide-react';

export const Company: React.FC = () => {
  const experience = [
    {
      company: "InnovQube",
      position: "Stagiaire Administrateur Systèmes et Réseaux",
      duration: "2 mois",
      type: "Stage",
      description: "Stage en administration systèmes et réseaux"
    }
  ];

  const features = [
    {
      icon: Target,
      title: "Objectifs",
      description: "En recherche d'alternance pour approfondir mes compétences en administration systèmes et réseaux"
    },
    {
      icon: BrainCircuit,
      title: "Expertise",
      description: "2 ans d'expérience en administration systèmes et réseaux, incluant stage et projets personnels"
    },
    {
      icon: BookOpenCheck,
      title: "Formation",
      description: "Formation continue en systèmes et réseaux avec une passion pour les nouvelles technologies"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Expérience en travail d'équipe et communication technique avec les parties prenantes"
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Mise en place de solutions de sécurité et bonnes pratiques"
    },
    {
      icon: Cloud,
      title: "Cloud",
      description: "Compétences en solutions cloud et virtualisation"
    }
  ];

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mon Expérience
        </h2>
        <div className="h-1 w-20 bg-[#00b4d8] mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          En recherche active d'alternance pour développer mes compétences en administration systèmes et réseaux
        </p>
      </div>

      {/* Expérience professionnelle */}
      <div className="mb-20">
        <h3 className="text-2xl font-bold text-white mb-8">Parcours Professionnel</h3>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-[#1c1f26] rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h4 className="text-xl font-bold text-white">{exp.company}</h4>
                <div className="flex items-center gap-4">
                  <span className="text-[#00b4d8]">{exp.duration}</span>
                  <span className="bg-[#00b4d8] text-white px-3 py-1 rounded-full text-sm">
                    {exp.type}
                  </span>
                </div>
              </div>
              <p className="text-lg text-white mb-2">{exp.position}</p>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compétences et objectifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#1c1f26] rounded-xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <item.icon className="h-12 w-12 text-[#00b4d8] mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};