import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { DocType, DocumentationContent } from '../types/documentation';

interface DocumentListProps {
  documentationContent: DocumentationContent;
  onDocClick: (docType: DocType) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documentationContent,
  onDocClick,
}) => {
  const categories = [
    {
      title: "Systèmes",
      types: ['arch', 'debian'] as DocType[],
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Supervision",
      types: ['zabbix', 'glpi'] as DocType[],
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Infrastructure",
      types: ['ssh', 'proxy', 'partitions'] as DocType[],
      gradient: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  return (
    <div className="space-y-16">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h3 className="text-2xl font-bold text-white mb-8">{category.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.types.map((docType) => {
              const doc = documentationContent[docType];
              return (
                <motion.div
                  key={docType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onDocClick(docType)}
                  className="group relative cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${category.gradient}`}>
                        <doc.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                        </div>
                        <p className="text-white/70 mb-4">{doc.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {doc.files.map((file, fileIndex) => (
                            <span
                              key={fileIndex}
                              className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80"
                            >
                              {file.name}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                          <span className="text-sm">Voir la documentation</span>
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};