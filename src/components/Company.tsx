import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Server, Database, Shield, Network, Cloud, Code, GitBranch, Calendar, MapPin, Building } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';

interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  type: string;
  department: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  achievements: string[];
  gradient: string;
}

export const Company: React.FC = () => {
  const experiences: Experience[] = [
    {
      company: "InnovQube",
      position: "Stagiaire Administrateur Systèmes et Réseaux",
      period: "Avril 2025 - Juin 2025",
      location: "France",
      type: "Stage",
      department: "IT Infrastructure",
      description: "Stage de 2 mois en administration systèmes et réseaux",
      technologies: [
        "Linux",
        "Docker",
        "Ansible",
        "Zabbix",
        "Git",
        "Python",
        "Bash",
        "Grafana"
      ],
      responsibilities: [
        "Configuration et maintenance des serveurs Linux",
        "Mise en place de solutions de monitoring",
        "Gestion des sauvegardes et de la sécurité",
        "Support technique niveau 2",
        "Documentation des procédures"
      ],
      achievements: [
        "Automatisation de 80% des tâches de déploiement",
        "Réduction de 40% du temps de résolution des incidents",
        "Mise en place d'un système de monitoring proactif",
        "Création d'une documentation technique complète"
      ],
      gradient: "from-cyan-500/20 to-blue-500/20"
    }
    // Vous pourrez ajouter d'autres expériences ici facilement
  ];

  const categories = [
    {
      title: "Administration Système",
      icon: Terminal,
      description: "Configuration et maintenance des serveurs Linux",
      details: [
        "Installation et configuration de serveurs Linux",
        "Gestion des utilisateurs et des permissions",
        "Automatisation avec scripts Bash et Python",
        "Monitoring système avec Zabbix"
      ],
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Infrastructure",
      icon: Server,
      description: "Mise en place et maintenance de l'infrastructure",
      details: [
        "Configuration des services réseau",
        "Gestion des sauvegardes",
        "Virtualisation avec Docker",
        "Documentation technique"
      ],
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Base de Données",
      icon: Database,
      description: "Administration des bases de données",
      details: [
        "Installation de SGBD",
        "Optimisation des performances",
        "Sauvegarde et restauration",
        "Monitoring des bases"
      ],
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Sécurité",
      icon: Shield,
      description: "Sécurisation de l'infrastructure",
      details: [
        "Configuration des pare-feu",
        "Gestion des accès",
        "Audit de sécurité",
        "Mise en place de solutions VPN"
      ],
      gradient: "from-red-500/20 to-orange-500/20"
    }
  ];

  return (
      <>
        <ParticleBackground />
        <section className="min-h-screen py-20">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mes Expériences
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          </motion.div>

          {experiences.map((exp, index) => (
              <div key={index} className="mb-20">
                <div className="max-w-7xl mx-auto px-4">
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Informations principales */}
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white">{exp.company}</h3>
                        <p className="text-xl text-white/80">{exp.position}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            {exp.department}
                          </div>
                        </div>

                        <p className="text-white/70">{exp.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                              <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80 border border-white/10"
                              >
                          {tech}
                        </span>
                          ))}
                        </div>
                      </div>

                      {/* Réalisations et responsabilités */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4">Responsabilités</h4>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((resp, respIndex) => (
                                <motion.li
                                    key={respIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: respIndex * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                  <Code className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
                                  <span className="text-white/80">{resp}</span>
                                </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4">Réalisations</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achieveIndex) => (
                                <motion.li
                                    key={achieveIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: achieveIndex * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                  <Shield className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                                  <span className="text-white/80">{achievement}</span>
                                </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
          ))}

          {/* Compétences */}
          <div className="max-w-7xl mx-auto px-4 mt-20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Compétences acquises</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-full animate-pulse-slow" />
                        <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-full">
                          <category.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      <h4 className="text-xl font-semibold text-white mb-4">{category.title}</h4>
                      <ul className="space-y-2">
                        {category.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="text-white/70 text-sm">
                              {detail}
                            </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>
      </>
  );
};