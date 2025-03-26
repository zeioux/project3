import React from 'react';
import { DocType } from '../types/documentation';
import { documentationContent } from '../data/documentation';
import { DocumentList } from './DocumentList';
import { DocumentViewer } from './DocumentViewer';

interface DocumentationProps {
  selectedDoc: DocType | null;
  onDocClick: (docType: DocType) => void;
  onBack: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({
  selectedDoc,
  onDocClick,
  onBack,
}) => {
  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Documentation
        </h2>
        <div className="h-1 w-20 bg-[#00b4d8] mx-auto rounded-full mb-8"></div>
      </div>

      {selectedDoc ? (
        <DocumentViewer
          selectedDoc={selectedDoc}
          documentationContent={documentationContent}
          onBack={onBack}
        />
      ) : (
        <DocumentList
          documentationContent={documentationContent}
          onDocClick={onDocClick}
        />
      )}
    </section>
  );
};