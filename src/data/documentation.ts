/*
 * Structure des dossiers pour les fichiers PDF :
 * 
 * public/
 * └── docs/
 *     ├── ssh/
 *     │   ├── config.pdf        -> Guide de configuration SSH
 *     │   ├── keys.pdf         -> Guide des clés SSH
 *     │   └── security.pdf     -> Guide de sécurité SSH
 *     │
 *     ├── zabbix/
 *     │   ├── install.pdf      -> Guide d'installation
 *     │   ├── config.pdf       -> Guide de configuration
 *     │   └── maintenance.pdf  -> Guide de maintenance
 *     │
 *     ├── glpi/
 *     │   ├── install.pdf      -> Guide d'installation
 *     │   ├── assets.pdf       -> Guide de gestion des assets
 *     │   └── tickets.pdf      -> Guide des tickets
 *     │
 *     ├── proxy/
 *     │   ├── nginx-install.pdf -> Guide d'installation Nginx
 *     │   ├── proxy-config.pdf  -> Guide de configuration proxy
 *     │   └── ssl.pdf          -> Guide SSL/TLS
 *     │
 *     ├── partitions/
 *     │   ├── partitioning.pdf -> Guide de partitionnement
 *     │   ├── lvm.pdf         -> Guide LVM
 *     │   └── raid.pdf        -> Guide RAID
 *     │
 *     ├── arch/
 *     │   ├── install.pdf     -> Guide d'installation
 *     │   ├── post-install.pdf -> Guide post-installation
 *     │   └── custom.pdf      -> Guide de personnalisation
 *     │
 *     └── debian/
 *         ├── server-install.pdf -> Guide d'installation serveur
 *         ├── security.pdf      -> Guide de sécurité
 *         └── services.pdf      -> Guide des services
 */

import { Terminal, Monitor, LayoutGrid, Share2, HardDrive, Link as Linux, Server } from 'lucide-react';
import { DocumentationContent } from '../types/documentation';

export const documentationContent: DocumentationContent = {
  ssh: {
    title: "Documentation SSH",
    description: "Configuration et sécurisation des connexions SSH",
    icon: Terminal,
    files: [
      {
        name: "Configuration SSH",
        description: "Guide de configuration sécurisée du serveur SSH",
        link: "/docs/ssh/config.pdf"
      },
      {
        name: "Clés SSH",
        description: "Gestion des clés et authentification",
        link: "/docs/ssh/keys.pdf"
      },
      {
        name: "Bonnes pratiques",
        description: "Sécurisation et hardening SSH",
        link: "/docs/ssh/security.pdf"
      }
    ]
  },
  zabbix: {
    title: "Documentation Zabbix",
    description: "Mise en place et configuration de la supervision Zabbix",
    icon: Monitor,
    files: [
      {
        name: "Installation Zabbix",
        description: "Procédure d'installation et configuration initiale",
        link: "/docs/zabbix/install.pdf"
      },
      {
        name: "Configuration avancée",
        description: "Paramétrage des alertes et templates personnalisés",
        link: "/docs/zabbix/config.pdf"
      },
      {
        name: "Maintenance",
        description: "Guide de maintenance et troubleshooting",
        link: "/docs/zabbix/maintenance.pdf"
      }
    ]
  },
  glpi: {
    title: "Documentation GLPI",
    description: "Gestion de parc informatique avec GLPI",
    icon: LayoutGrid,
    files: [
      {
        name: "Installation GLPI",
        description: "Guide d'installation et configuration",
        link: "/docs/glpi/install.pdf"
      },
      {
        name: "Gestion des assets",
        description: "Configuration de l'inventaire",
        link: "/docs/glpi/assets.pdf"
      },
      {
        name: "Tickets et workflow",
        description: "Paramétrage du système de tickets",
        link: "/docs/glpi/tickets.pdf"
      }
    ]
  },
  proxy: {
    title: "Reverse Proxy",
    description: "Configuration de reverse proxy avec Nginx",
    icon: Share2,
    files: [
      {
        name: "Installation Nginx",
        description: "Installation et configuration de base",
        link: "/docs/proxy/nginx-install.pdf"
      },
      {
        name: "Configuration proxy",
        description: "Mise en place du reverse proxy",
        link: "/docs/proxy/proxy-config.pdf"
      },
      {
        name: "SSL/TLS",
        description: "Sécurisation avec certificats SSL",
        link: "/docs/proxy/ssl.pdf"
      }
    ]
  },
  partitions: {
    title: "Gestion des Partitions",
    description: "Guide de partitionnement Linux",
    icon: HardDrive,
    files: [
      {
        name: "Partitionnement",
        description: "Guide de partitionnement disque",
        link: "/docs/partitions/partitioning.pdf"
      },
      {
        name: "LVM",
        description: "Configuration de Logical Volume Management",
        link: "/docs/partitions/lvm.pdf"
      },
      {
        name: "RAID",
        description: "Mise en place de RAID logiciel",
        link: "/docs/partitions/raid.pdf"
      }
    ]
  },
  arch: {
    title: "Installation Arch Linux",
    description: "Guide d'installation et configuration d'Arch Linux",
    icon: Linux,
    files: [
      {
        name: "Installation de base",
        description: "Procédure d'installation pas à pas",
        link: "https://zeioux.github.io/project2/docs/arch/install.pdf"
      },
      {
        name: "Post-installation",
        description: "Configuration système après installation",
        link: "https://zeioux.github.io/project2/docs/arch/post-install.pdf"
      },
      {
        name: "Personnalisation",
        description: "Optimisation et personnalisation",
        link: "https://zeioux.github.io/project2/docs/arch/custom.pdf"
      }
    ]
  },
  debian: {
    title: "Installation Debian",
    description: "Guide d'installation et configuration de Debian",
    icon: Server,
    files: [
      {
        name: "Installation serveur",
        description: "Installation de Debian en mode serveur",
        link: "/docs/debian/server-install.pdf"
      },
      {
        name: "Sécurisation",
        description: "Hardening du système Debian",
        link: "/docs/debian/security.pdf"
      },
      {
        name: "Services",
        description: "Configuration des services principaux",
        link: "/docs/debian/services.pdf"
      }
    ]
  }
};