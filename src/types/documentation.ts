import { DivideIcon as LucideIcon } from 'lucide-react';

export type DocType = 'ssh' | 'zabbix' | 'glpi' | 'proxy' | 'partitions' | 'arch' | 'debian';

export interface DocumentFile {
  name: string;
  description: string;
  link: string;
}

export interface DocumentCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  files: DocumentFile[];
}

export type DocumentationContent = Record<DocType, DocumentCategory>;