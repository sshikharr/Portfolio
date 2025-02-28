import React from 'react';
import { Instagram, Linkedin, FileText, Github, Globe } from "lucide-react";
import { profilesData } from "../data/data";

export default function Profiles() {
  const socialIcons = {
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
    portfolio: Globe,
    resume: FileText,
  };

  return (
    <section id="profiles" className="py-20 px-4 bg-gradient-to-b from-[#0a192f] to-[#112240]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-3">PROFILES</h2>
          <div className="w-20 h-1 bg-[#00D2D2]"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {profilesData.map((profile, index) => {
            const IconComponent = socialIcons[profile.platform.toLowerCase()];
            
            return (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#112240] border border-[#233554] p-8 rounded-lg shadow-lg hover:shadow-cyan-900/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center text-center group"
              >
                {IconComponent && (
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#172a45] mb-5 group-hover:bg-[#00D2D2]/10 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-[#00D2D2] group-hover:text-white transition-colors duration-300" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{profile.platform}</h3>
                <p className="text-gray-400 text-sm">{profile.username}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}