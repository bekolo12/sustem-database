import React from 'react';
import { Department, Section } from '../types';
import { COLOR_CONFIG } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface DepartmentCardProps {
  dept: Department;
  onSelectSection: (deptId: number, sectionId: string) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ dept, onSelectSection }) => {
  const colors = COLOR_CONFIG[dept.color];

  // Recursively count active links
  const countActiveLinks = (sections: Section[]): number => {
    return sections.reduce((acc, section) => {
      const links = section.labels.filter(l => l.hyperlinked).length;
      const subLinks = section.subSections ? countActiveLinks(section.subSections) : 0;
      return acc + links + subLinks;
    }, 0);
  };

  const activeLinks = countActiveLinks(dept.sections);

  // Recursively get all displayable leaf sections (or sections that have no subSections or we just want to list all clickable endpoints)
  // For the card view, it's often better to show the "leaf" nodes that contain the actual data.
  const getLeafSections = (sections: Section[]): Section[] => {
    return sections.flatMap(section => {
      // If it has subsections, dive deeper. 
      // NOTE: Depending on design, we might want to show intermediate sections if they have data. 
      // But typically in this app, data is at the leaf. 
      // However, if an intermediate section ALSO has labels, we should probably show it?
      // For now, let's flatten everything that has no subsections, OR has subsections but is treated as a container.
      // Let's just flatten all "leaf" nodes (nodes with no subSections).
      if (section.subSections && section.subSections.length > 0) {
        return getLeafSections(section.subSections);
      }
      return [section];
    });
  };

  const displaySections = getLeafSections(dept.sections);
  const [airplaneMode, setAirplaneMode] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className={`${colors.bg} p-5 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shadow-inner backdrop-blur-sm">
              <i className={`fas fa-${dept.icon} text-2xl`}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold leading-tight">{dept.name}</h3>
              <p className="text-sm opacity-90 mt-1 font-light">
                {displaySections.length} Sections • {activeLinks} Active Links
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 bg-black/10 p-2 rounded-xl border border-white/10 overflow-hidden">
            <button 
              onClick={() => setAirplaneMode(!airplaneMode)}
              className="relative w-10 h-5 rounded-full bg-white/20 transition-colors duration-200 outline-none"
            >
              <motion.div 
                animate={{ x: airplaneMode ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
              />
            </button>
            <div className="flex items-center gap-1 text-[8px] uppercase tracking-widest font-bold opacity-60 relative h-3">
              <AnimatePresence mode="wait">
                <motion.i 
                  key={airplaneMode ? 'on' : 'off'}
                  initial={{ y: 5, opacity: 0, x: -5 }}
                  animate={{ y: 0, opacity: 1, x: 0 }}
                  exit={{ y: -5, opacity: 0, x: 5 }}
                  className={`fas fa-plane ${airplaneMode ? 'text-yellow-300' : 'text-white'}`}
                ></motion.i>
              </AnimatePresence>
              <span>Mode</span>
            </div>
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
          {displaySections.map((section: Section) => (
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
                  <span className="font-semibold text-gray-700 text-sm truncate max-w-[180px]">{section.name}</span>
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