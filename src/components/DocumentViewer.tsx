import React from 'react';
import { ArrowLeft, FileText, Download } from 'lucide-react';
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
      // Vérifier si le fichier existe
      fetch(link)
        .then(response => {
          if (!response.ok) {
            throw new Error('Fichier non trouvé');
          }
          return response.blob();
        })
        .then(blob => {
          // Créer un lien temporaire pour le téléchargement
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

  return (
    <div className="space-y-8 animate-fadeIn">
      <button
        onClick={onBack}
        className="group text-[#00b4d8] hover:text-[#00d5ff] flex items-center transition-colors duration-300"
      >
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
        Retour à la liste
      </button>
      
      <div className="bg-[#1c1f26] rounded-xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          {React.createElement(documentationContent[selectedDoc].icon, {
            className: "h-12 w-12 text-[#00b4d8] mr-4"
          })}
          <div>
            <h2 className="text-2xl font-bold text-white">
              {documentationContent[selectedDoc].title}
            </h2>
            <p className="text-gray-300 mt-1">
              {documentationContent[selectedDoc].description}
            </p>
          </div>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {documentationContent[selectedDoc].files.map((file, index) => (
            <div
              key={index}
              className="group bg-[#21262d] rounded-lg p-6 hover:bg-[#2d333b] transition-all duration-300 transform hover:-translate-y-1"
            >
              <FileText className="h-8 w-8 text-[#00b4d8] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {file.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {file.description}
              </p>
              <button
                onClick={(e) => handleDownload(e as any, file.link)}
                className="inline-flex items-center text-[#00b4d8] hover:text-[#00d5ff] transition-all duration-300 group-hover:translate-x-1 cursor-pointer"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};