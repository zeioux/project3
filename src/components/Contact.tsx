import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Me Contacter
        </h2>
        <div className="h-1 w-20 bg-[#00b4d8] mx-auto rounded-full mb-8"></div>
      </div>

      <div className="max-w-2xl mx-auto bg-[#1c1f26] rounded-xl p-8 shadow-lg animate-fadeIn">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white mb-2">Nom</label>
            <input
              type="text"
              id="name"
              className="w-full bg-[#2d3748] text-white rounded-lg p-3 focus:ring-2 focus:ring-[#00b4d8] focus:outline-none"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full bg-[#2d3748] text-white rounded-lg p-3 focus:ring-2 focus:ring-[#00b4d8] focus:outline-none"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <textarea
              id="message"
              rows={6}
              className="w-full bg-[#2d3748] text-white rounded-lg p-3 focus:ring-2 focus:ring-[#00b4d8] focus:outline-none"
              placeholder="Votre message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#00b4d8] text-white py-3 rounded-lg hover:bg-[#0077a1] transition-colors duration-300"
          >
            Envoyer
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/zeioux"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00b4d8] transition-colors duration-300"
            >
              <Github className="h-8 w-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/cl%C3%A9ment-martins-baumann-b061b7332/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00b4d8] transition-colors duration-300"
            >
              <Linkedin className="h-8 w-8" />
            </a>
            <a
              href="mailto:zeioux@protonmail.com"
              className="text-gray-400 hover:text-[#00b4d8] transition-colors duration-300"
            >
              <Mail className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};