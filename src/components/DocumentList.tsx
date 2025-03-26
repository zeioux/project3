import React from 'react';
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
  return (
    <div className="grid gap-8 md:grid-cols-2 animate-fadeIn">
      {(Object.keys(documentationContent) as DocType[]).map((docType) => {
        const doc = documentationContent[docType];
        return (
          <div
            key={docType}
            onClick={() => onDocClick(docType)}
            className="group bg-[#1c1f26] rounded-xl p-8 cursor-pointer hover:bg-[#21262d] transition-all duration-300 transform hover:-translate-y-2 shadow-lg"
          >
            {React.createElement(doc.icon, {
              className: "h-12 w-12 text-[#00b4d8] mb-4 transition-transform duration-300 group-hover:scale-110"
            })}
            <h2 className="text-2xl font-bold text-white mb-3">{doc.title}</h2>
            <p className="text-gray-300 mb-4">{doc.description}</p>
            <div className="flex items-center text-[#00b4d8] transition-transform duration-300 group-hover:translate-x-2">
              <span>Voir les documents</span>
              <ExternalLink className="h-4 w-4 ml-2" />
            </div>
          </div>
        );
      })}
    </div>
  );
};