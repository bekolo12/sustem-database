import React from 'react';
import { Department, Section } from '../types';
import { COLOR_CONFIG } from '../constants';

interface DepartmentCardProps {
  dept: Department;
  onSelectSection: (deptId: number, sectionId: string) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ dept, onSelectSection }) => {
  const colors = COLOR_CONFIG[dept.color];
  const activeLinks = dept.sections.reduce((acc, section) => 
    acc + section.labels.filter(l => l.hyperlinked).length, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className={`${colors.bg} p-5 text-white`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shadow-inner backdrop-blur-sm">
            <i className={`fas fa-${dept.icon} text-2xl`}></i>
          </div>
          <div>
            <h3 className="text-xl font-bold leading-tight">{dept.name}</h3>
            <p className="text-sm opacity-90 mt-1 font-light">
              {dept.sections.length} Sections • {activeLinks} Active Links
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        {dept.description && (
          <p className="text-sm text-gray-500 mb-5 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <i className="fas fa-info-circle mr-2 text-gray-400"></i>
            {dept.description}
          </p>
        )}
        
        <div className="space-y-3 mt-auto">
          {dept.sections.map((section: Section) => (
            <button 
              key={section.id}
              onClick={() => onSelectSection(dept.id, section.id)}
              className={`
                w-full text-left p-3 rounded-xl ${colors.light} 
                hover:shadow-md transition-all duration-200 group border border-transparent ${colors.hoverBorder}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className={`fas fa-folder ${colors.text} text-sm`}></i>
                  <span className="font-semibold text-gray-700 text-sm">{section.name}</span>
                </div>
                <i className={`fas fa-arrow-right ${colors.text} text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all`}></i>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {section.labels.filter(l => l.hyperlinked).slice(0, 3).map((l, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 bg-white rounded-full text-gray-500 border border-gray-100 shadow-sm">
                    {l.name.split(' ')[0]}
                  </span>
                ))}
                {section.labels.filter(l => l.hyperlinked).length > 3 && (
                   <span className="text-[10px] px-2 py-0.5 bg-white rounded-full text-gray-400">
                    +{section.labels.filter(l => l.hyperlinked).length - 3}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};