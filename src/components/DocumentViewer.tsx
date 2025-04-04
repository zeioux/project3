import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, ExternalLink } from 'lucide-react';
import { DocType, DocumentationContent } from '../types/documentation';

interface DocumentViewerProps {
  selectedDoc: DocType;
  documentationContent: DocumentationContent;
  onBack: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  selectedDoc,
  documentationContent,
  onBack,
}) => {
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    try {
      fetch(link)
        .then(response => {
          if (!response.ok) {
            throw new Error('Fichier non trouvé');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = link.split('/').pop() || 'document.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error('Erreur lors du téléchargement:', error);
          alert('Le fichier n\'est pas encore disponible. Veuillez réessayer plus tard.');
        });
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors du téléchargement.');
    }
  };

  const doc = documentationContent[selectedDoc];

  return (
    <div className="space-y-8">
      <motion.button
        onClick={onBack}
        className="group text-blue-400 hover:text-blue-300 flex items-center transition-colors duration-300"
        whileHover={{ x: -4 }}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour à la liste
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
      >
        <div className="flex items-center gap-6 mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <doc.icon className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{doc.title}</h2>
            <p className="text-white/60">{doc.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doc.files.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{file.name}</h3>
                    <p className="text-white/60 text-sm mb-4">{file.description}</p>
                    <motion.button
                      onClick={(e) => handleDownload(e as any, file.link)}
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group-hover:translate-x-2"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      <span className="text-sm">Télécharger</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};