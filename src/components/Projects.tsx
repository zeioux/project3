import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Server, Database, Shield, Network, Cloud, Code, GitBranch, FileCode, Settings, Monitor, Lock } from 'lucide-react';
import { DocType } from '../types/documentation';
import { ParticleBackground } from './ParticleBackground';

interface ProjectsProps {
  onDocClick: (docType: DocType) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onDocClick }) => {
  const projects = [
    {
      title: "Infrastructure Linux",
      description: "Configuration et déploiement d'une infrastructure Linux complète",
      icon: Server,
      gradient: "from-cyan-500/20 to-blue-500/20",
      technologies: ["Debian", "Ubuntu", "CentOS", "Red Hat"],
      features: [
        "Installation et configuration de serveurs",
        "Gestion des services système",
        "Automatisation des tâches",
        "Monitoring et supervision"
      ],
      documentation: ['debian', 'arch'] as DocType[]
    },
    {
      title: "Supervision & Monitoring",
      description: "Mise en place d'outils de supervision et de monitoring",
      icon: Monitor,
      gradient: "from-emerald-500/20 to-teal-500/20",
      technologies: ["Zabbix", "Grafana", "Prometheus", "ELK Stack"],
      features: [
        "Surveillance des ressources système",
        "Alerting et notifications",
        "Tableaux de bord personnalisés",
        "Analyse des performances"
      ],
      documentation: ['zabbix', 'glpi'] as DocType[]
    },
    {
      title: "Sécurité & Réseau",
      description: "Sécurisation de l'infrastructure et configuration réseau",
      icon: Shield,
      gradient: "from-purple-500/20 to-pink-500/20",
      technologies: ["pfSense", "OPNsense", "IPtables", "OpenVPN"],
      features: [
        "Configuration des pare-feu",
        "Mise en place de VPN",
        "Gestion des accès",
        "Sécurisation des services"
      ],
      documentation: ['ssh', 'proxy', 'partitions'] as DocType[]
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
              Mes Réalisations
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Découvrez mes projets et réalisations en administration systèmes et réseaux
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="mb-20"
                >
                  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Informations principales */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-6">
                          <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`p-4 rounded-xl bg-gradient-to-br ${project.gradient}`}
                          >
                            <project.icon className="h-12 w-12 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                            <p className="text-white/60 mt-2">{project.description}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4">Technologies utilisées</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80 border border-white/10"
                                >
                            {tech}
                          </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4">Fonctionnalités</h4>
                          <ul className="space-y-2">
                            {project.features.map((feature, featureIndex) => (
                                <motion.li
                                    key={featureIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: featureIndex * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                  <Code className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
                                  <span className="text-white/80">{feature}</span>
                                </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Documentation */}
                      <div className="space-y-6">
                        <h4 className="text-xl font-semibold text-white mb-6">Documentation disponible</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {project.documentation.map((docType, docIndex) => (
                              <motion.button
                                  key={docIndex}
                                  onClick={() => onDocClick(docType)}
                                  whileHover={{ scale: 1.02 }}
                                  className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex items-center gap-4">
                                  <div className="p-3 rounded-lg bg-white/5">
                                    <FileCode className="h-6 w-6 text-cyan-400" />
                                  </div>
                                  <div className="text-left">
                                    <p className="text-white font-medium">{docType.charAt(0).toUpperCase() + docType.slice(1)}</p>
                                    <p className="text-white/60 text-sm">Voir la documentation</p>
                                  </div>
                                </div>
                              </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </section>
      </>
  );
};