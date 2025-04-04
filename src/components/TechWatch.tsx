import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Cloud, Network, Database, Lock, Terminal, Globe, Cpu, Radio, MonitorCheck, GitBranch, ExternalLink, BookOpen, Rss, MessageSquare, Users } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';

interface Article {
  title: string;
  description: string;
  date: string;
  category: string;
  link: string;
  icon: any;
  gradient: string;
}

interface Resource {
  title: string;
  description: string;
  icon: any;
  gradient: string;
  links: {
    name: string;
    url: string;
    description: string;
  }[];
}

export const TechWatch: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'securite',
      name: 'Sécurité',
      icon: Shield,
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: Server,
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'cloud',
      name: 'Cloud Computing',
      icon: Cloud,
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'reseaux',
      name: 'Réseaux',
      icon: Network,
      gradient: 'from-emerald-500/20 to-teal-500/20'
    }
  ];

  const articles: Article[] = [
    {
      title: "Zero Trust Security",
      description: "L'approche Zero Trust révolutionne la sécurité des systèmes d'information",
      date: "Mars 2024",
      category: "securite",
      link: "https://www.ssi.gouv.fr",
      icon: Lock,
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      title: "Kubernetes 1.29",
      description: "Les nouvelles fonctionnalités de Kubernetes 1.29",
      date: "Février 2024",
      category: "infrastructure",
      link: "https://kubernetes.io",
      icon: Server,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Multi-Cloud Strategy",
      description: "Stratégies d'adoption du multi-cloud en entreprise",
      date: "Mars 2024",
      category: "cloud",
      link: "https://aws.amazon.com",
      icon: Cloud,
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "SD-WAN Evolution",
      description: "L'évolution des réseaux SD-WAN et leur impact",
      date: "Janvier 2024",
      category: "reseaux",
      link: "https://www.cisco.com",
      icon: Network,
      gradient: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  const resources: Resource[] = [
    {
      title: "Ressources Sécurité",
      description: "Sources d'information sur la sécurité informatique",
      icon: Shield,
      gradient: "from-red-500/20 to-orange-500/20",
      links: [
        {
          name: "ANSSI",
          url: "https://www.ssi.gouv.fr",
          description: "Agence nationale de la sécurité des systèmes d'information"
        },
        {
          name: "CERT-FR",
          url: "https://www.cert.ssi.gouv.fr",
          description: "Centre gouvernemental de veille, d'alerte et de réponse aux attaques informatiques"
        }
      ]
    },
    {
      title: "Ressources Infrastructure",
      description: "Documentation et actualités sur l'infrastructure IT",
      icon: Server,
      gradient: "from-blue-500/20 to-cyan-500/20",
      links: [
        {
          name: "Red Hat Blog",
          url: "https://www.redhat.com/blog",
          description: "Blog officiel de Red Hat"
        },
        {
          name: "Docker Blog",
          url: "https://www.docker.com/blog",
          description: "Actualités et tutoriels Docker"
        }
      ]
    }
  ];

  const filteredArticles = selectedCategory
      ? articles.filter(article => article.category === selectedCategory)
      : articles;

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
              Veille Technologique
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Suivez l'actualité et les dernières innovations en systèmes et réseaux
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4">
            {/* Filtres par catégorie */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      !selectedCategory
                          ? 'bg-white/10 text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                Tout
              </motion.button>
              {categories.map((category) => (
                  <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          selectedCategory === category.id
                              ? 'bg-white/10 text-white'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </motion.button>
              ))}
            </div>

            {/* Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
              {filteredArticles.map((article, index) => (
                  <motion.a
                      key={index}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${article.gradient}`}>
                          <article.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                            <span className="text-sm text-white/60">{article.date}</span>
                          </div>
                          <p className="text-white/70 mb-4">{article.description}</p>
                          <div className="flex items-center text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                            <span className="text-sm">Lire l'article</span>
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
              ))}
            </div>

            {/* Sources de veille */}
            <div className="space-y-12">
              <h3 className="text-2xl font-bold text-white text-center mb-8">Sources de Veille</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                      <Rss className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Flux RSS</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="text-white/70">Security Week</li>
                    <li className="text-white/70">The Register</li>
                    <li className="text-white/70">ZDNet</li>
                  </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Forums</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="text-white/70">Reddit r/sysadmin</li>
                    <li className="text-white/70">Stack Overflow</li>
                    <li className="text-white/70">Server Fault</li>
                  </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Communautés</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="text-white/70">GitHub Discussions</li>
                    <li className="text-white/70">Discord Tech</li>
                    <li className="text-white/70">Slack Communities</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};