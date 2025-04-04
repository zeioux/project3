import React from 'react';
import { motion } from 'framer-motion';
import { DocType } from '../types/documentation';
import { documentationContent } from '../data/documentation';
import { DocumentList } from './DocumentList';
import { DocumentViewer } from './DocumentViewer';
import { ParticleBackground } from './ParticleBackground';

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
        <>
            <ParticleBackground />
            <section className="min-h-screen py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Documentation
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Guides techniques et documentation détaillée
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto px-4">
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
                </div>
            </section>
        </>
    );
};