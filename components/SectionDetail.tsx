import React, { useEffect } from 'react';
import { Department, Section } from '../types';
import { COLOR_CONFIG, LABEL_ICONS } from '../constants';

interface SectionDetailProps {
  dept: Department;
  section: Section;
  onBack: () => void;
}

export const SectionDetail: React.FC<SectionDetailProps> = ({ dept, section, onBack }) => {
  const colors = COLOR_CONFIG[dept.color];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors w-fit"
      >
        <i className="fas fa-arrow-left"></i>
        <span className="font-medium">Back to Departments</span>
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
        <div className="p-8 md:p-10 border-b border-gray-100 relative overflow-hidden">
          {/* Decorative background element */}
          <div className={`absolute -right-10 -top-10 w-64 h-64 ${colors.bg} opacity-5 rounded-full blur-3xl`}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className={`w-20 h-20 ${colors.bg} rounded-2xl flex items-center justify-center text-white shadow-lg ${colors.shadow}`}>
              <i className={`fas fa-${dept.icon} text-3xl`}></i>
            </div>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.light} ${colors.text} text-xs font-semibold mb-2`}>
                 <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></span>
                 {dept.name}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{section.name}</h2>
              <p className="text-gray-500 mt-2">Manage databases, access dashboards, and view records for this section.</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 md:p-10 bg-gray-50/50">
           <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Available Resources</h3>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.labels.map((label, idx) => {
              const icon = LABEL_ICONS[label.name] || 'fa-link';
              const isActive = label.hyperlinked;
              
              if (isActive && label.url) {
                return (
                  <a 
                    key={idx}
                    href={label.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="group relative flex flex-col p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-external-link-alt text-blue-400 text-sm"></i>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <i className={`fas ${icon} text-lg`}></i>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full w-fit mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-custom"></span>
                            Active
                         </span>
                         <h4 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{label.name}</h4>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50">
                       <p className="text-xs text-gray-400 truncate font-mono">
                         {label.url.replace(/^https?:\/\//, '')}
                       </p>
                    </div>
                  </a>
                );
              } else {
                return (
                  <div key={idx} className="flex flex-col p-6 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 opacity-75 cursor-not-allowed select-none">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                        <i className={`fas ${icon} text-lg`}></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium bg-gray-200/50 px-2 py-0.5 rounded-full w-fit mb-1">
                            Not Available
                         </span>
                         <h4 className="font-bold text-gray-400">{label.name}</h4>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-200/50">
                       <p className="text-xs text-gray-400">Resource currently offline</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};