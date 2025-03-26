import React from 'react';
import { ArrowLeft, Github, ExternalLink, BookOpen, MessageSquare, Globe, Shield, Server, Terminal, Code, Cpu, Network, Database, Lock } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  url: string;
  icon: typeof Github;
  category: string;
}

export const HiddenResources: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const resources: Resource[] = [
    // Sécurité
    {
      title: "ANSSI",
      description: "Agence nationale de la sécurité des systèmes d'information",
      url: "https://www.ssi.gouv.fr/",
      icon: Shield,
      category: "Sécurité"
    },
    {
      title: "r/netsec",
      description: "Communauté Reddit dédiée à la sécurité informatique",
      url: "https://www.reddit.com/r/netsec/",
      icon: MessageSquare,
      category: "Sécurité"
    },
    {
      title: "OWASP",
      description: "Ressources sur la sécurité des applications web",
      url: "https://owasp.org/",
      icon: BookOpen,
      category: "Sécurité"
    },
    {
      title: "HackerOne",
      description: "Plateforme de bug bounty et rapports de vulnérabilités",
      url: "https://www.hackerone.com/",
      icon: Lock,
      category: "Sécurité"
    },
    {
      title: "Exploit Database",
      description: "Base de données d'exploits et vulnérabilités",
      url: "https://www.exploit-db.com/",
      icon: Database,
      category: "Sécurité"
    },
    {
      title: "Security Weekly",
      description: "Podcasts et actualités sur la sécurité informatique",
      url: "https://securityweekly.com/",
      icon: Globe,
      category: "Sécurité"
    },
    {
      title: "Packet Storm",
      description: "Ressources et actualités en sécurité informatique",
      url: "https://packetstormsecurity.com/",
      icon: Network,
      category: "Sécurité"
    },
    {
      title: "CVE Details",
      description: "Base de données des vulnérabilités connues",
      url: "https://www.cvedetails.com/",
      icon: Database,
      category: "Sécurité"
    },

    // Infrastructure & Cloud
    {
      title: "Red Hat Blog",
      description: "Blog officiel de Red Hat sur l'infrastructure et le cloud",
      url: "https://www.redhat.com/en/blog",
      icon: Server,
      category: "Infrastructure"
    },
    {
      title: "r/devops",
      description: "Communauté Reddit DevOps",
      url: "https://www.reddit.com/r/devops/",
      icon: MessageSquare,
      category: "Infrastructure"
    },
    {
      title: "AWS Architecture Blog",
      description: "Blog sur l'architecture cloud AWS",
      url: "https://aws.amazon.com/blogs/architecture/",
      icon: Globe,
      category: "Infrastructure"
    },
    {
      title: "Kubernetes Blog",
      description: "Blog officiel de Kubernetes",
      url: "https://kubernetes.io/blog/",
      icon: Server,
      category: "Infrastructure"
    },
    {
      title: "Docker Blog",
      description: "Actualités et tutoriels Docker",
      url: "https://www.docker.com/blog/",
      icon: Server,
      category: "Infrastructure"
    },
    {
      title: "Azure Architecture Center",
      description: "Guide d'architecture cloud Microsoft Azure",
      url: "https://learn.microsoft.com/azure/architecture/",
      icon: Globe,
      category: "Infrastructure"
    },
    {
      title: "HashiCorp Learn",
      description: "Tutoriels sur Terraform, Vault et autres outils",
      url: "https://learn.hashicorp.com/",
      icon: Terminal,
      category: "Infrastructure"
    },
    {
      title: "The New Stack",
      description: "Actualités sur le cloud natif et DevOps",
      url: "https://thenewstack.io/",
      icon: Globe,
      category: "Infrastructure"
    },

    // Formation
    {
      title: "Linux Journey",
      description: "Apprendre Linux pas à pas",
      url: "https://linuxjourney.com/",
      icon: BookOpen,
      category: "Formation"
    },
    {
      title: "Awesome SysAdmin",
      description: "Collection de ressources pour administrateurs systèmes",
      url: "https://github.com/awesome-foss/awesome-sysadmin",
      icon: Github,
      category: "Formation"
    },
    {
      title: "DevOps Roadmap",
      description: "Guide d'apprentissage DevOps",
      url: "https://roadmap.sh/devops",
      icon: BookOpen,
      category: "Formation"
    },
    {
      title: "Katacoda",
      description: "Environnements d'apprentissage interactifs",
      url: "https://www.katacoda.com/",
      icon: Terminal,
      category: "Formation"
    },
    {
      title: "Linux Foundation Training",
      description: "Formations officielles Linux",
      url: "https://training.linuxfoundation.org/",
      icon: BookOpen,
      category: "Formation"
    },
    {
      title: "Codecademy",
      description: "Cours interactifs de programmation",
      url: "https://www.codecademy.com/",
      icon: Code,
      category: "Formation"
    },
    {
      title: "freeCodeCamp",
      description: "Ressources gratuites pour apprendre le développement",
      url: "https://www.freecodecamp.org/",
      icon: Code,
      category: "Formation"
    },
    {
      title: "MIT OpenCourseWare",
      description: "Cours gratuits du MIT",
      url: "https://ocw.mit.edu/",
      icon: BookOpen,
      category: "Formation"
    },

    // Communautés
    {
      title: "r/sysadmin",
      description: "Communauté Reddit des administrateurs systèmes",
      url: "https://www.reddit.com/r/sysadmin/",
      icon: MessageSquare,
      category: "Communautés"
    },
    {
      title: "Server Fault",
      description: "Q&A pour les administrateurs systèmes et réseaux",
      url: "https://serverfault.com/",
      icon: MessageSquare,
      category: "Communautés"
    },
    {
      title: "DevOps Stack Exchange",
      description: "Communauté Q&A DevOps",
      url: "https://devops.stackexchange.com/",
      icon: MessageSquare,
      category: "Communautés"
    },
    {
      title: "Linux Questions",
      description: "Forum d'entraide Linux",
      url: "https://www.linuxquestions.org/",
      icon: MessageSquare,
      category: "Communautés"
    },
    {
      title: "Unix & Linux Stack Exchange",
      description: "Q&A pour Unix et Linux",
      url: "https://unix.stackexchange.com/",
      icon: Terminal,
      category: "Communautés"
    },
    {
      title: "GitHub Discussions",
      description: "Discussions sur les projets open source",
      url: "https://github.com/discussions",
      icon: Github,
      category: "Communautés"
    },
    {
      title: "Dev.to",
      description: "Communauté de développeurs",
      url: "https://dev.to/",
      icon: Code,
      category: "Communautés"
    },
    {
      title: "Hacker News",
      description: "Actualités et discussions tech",
      url: "https://news.ycombinator.com/",
      icon: Globe,
      category: "Communautés"
    }
  ];

  const categories = Array.from(new Set(resources.map(r => r.category)));

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="group text-[#00b4d8] hover:text-[#00d5ff] flex items-center transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
        Retour à la veille
      </button>

      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Ressources Techniques
        </h2>
        <div className="h-1 w-20 bg-[#00b4d8] mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Collection de ressources qui m'ont permis d'approfondir mes connaissances.
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter(resource => resource.category === category)
              .map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#1c1f26] rounded-xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <resource.icon className="h-8 w-8 text-[#00b4d8] mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h4 className="text-lg font-bold text-white mb-2">{resource.title}</h4>
                  <p className="text-gray-300 mb-4">{resource.description}</p>
                  <div className="flex items-center text-[#00b4d8] group-hover:translate-x-2 transition-transform duration-300">
                    <span>Explorer</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </div>
                </a>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};