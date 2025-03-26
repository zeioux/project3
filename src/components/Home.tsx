import React from 'react';
import { Shield, Network, Cloud, Download, ExternalLink, Mail } from 'lucide-react';

interface HomeProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onContactClick, onProjectsClick }) => {
  const personalInfo = {
    firstName: "Clément",
    lastName: "Martins--Baumann (test 9 (v3))",
    title: "Administrateur Systèmes & Réseaux",
    level: "Junior",
    location: "France",
    experience: "2 ans d'expérience",
    availability: "Disponible pour de nouvelles opportunités"
  };

  const skills = [
    "Administration Linux",
    "Virtualisation",
    "Cloud Computing",
    "Cybersécurité",
    "Monitoring",
    "Automatisation",
    "DevOps",
    "Gestion de projet"
  ];

  const features = [
    {
      icon: Shield,
      title: "Sécurité",
      description: "Mise en place de solutions de sécurité robustes et monitoring proactif"
    },
    {
      icon: Network,
      title: "Infrastructure",
      description: "Conception et maintenance d'infrastructures scalables"
    },
    {
      icon: Cloud,
      title: "Cloud",
      description: "Expertise en solutions cloud et virtualisation"
    }
  ];

  const handleCVDownload = async () => {
    try {
      const response = await fetch('https://zeioux.github.io/project2/docs/cv/martinsbaumann-clement-cv.pdf');
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Le CV n\'est pas encore disponible. Veuillez réessayer plus tard.');
    }
  };

  return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#1a1f2c] to-[#0d1117] opacity-50"></div>
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="mb-8 animate-fadeIn">
              <p className="text-[#00b4d8] text-2xl md:text-3xl font-medium mb-4">Bonjour, je suis</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slideLeft">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 animate-slideRight">
                {personalInfo.title}
              </h2>
              <p className="text-xl text-[#00b4d8] font-medium mb-8">
                {personalInfo.level} · {personalInfo.location}
              </p>
              <p className="text-green-400 font-medium mb-12">
                {personalInfo.availability}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16 animate-fadeIn">
              <button
                  onClick={onContactClick}
                  className="group bg-[#00b4d8] text-white px-8 py-4 rounded-full hover:bg-[#0077a1] transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Me contacter
              </button>
              <button
                  onClick={handleCVDownload}
                  className="group border-2 border-[#00b4d8] text-[#00b4d8] px-8 py-4 rounded-full hover:bg-[#00b4d8] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Télécharger CV
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">À propos de moi</h2>
              <div className="h-1 w-20 bg-[#00b4d8] rounded-full mb-8"></div>
              <p className="text-gray-300 mb-6">
                {personalInfo.experience} dans l'administration systèmes et réseaux, spécialisé dans la mise en place et la maintenance d'infrastructures sécurisées.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="flex items-center text-gray-300"
                    >
                      <span className="h-2 w-2 bg-[#00b4d8] rounded-full mr-2"></span>
                      {skill}
                    </div>
                ))}
              </div>
              <button
                  onClick={onProjectsClick}
                  className="inline-flex items-center text-[#00b4d8] hover:text-[#00d5ff] transition-all duration-300 group"
              >
                Voir mes projets
                <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {features.map((feature, index) => (
                  <div
                      key={index}
                      className="bg-[#1c1f26] rounded-xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg"
                      style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <feature.icon className="h-12 w-12 text-[#00b4d8] mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};