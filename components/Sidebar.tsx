import React, { useState } from 'react';
import { COMPANY_DATA, COLOR_CONFIG } from '../constants';
import { Section, Department } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onNavigate: (deptId: number | null, sectionId: string | null) => void;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNavigate, onClose }) => {
  const [expandedDeptIds, setExpandedDeptIds] = useState<number[]>([]);
  const [expandedSectionIds, setExpandedSectionIds] = useState<string[]>([]);
  const [isOperationsExpanded, setIsOperationsExpanded] = useState(true);
  const [isPMOExpanded, setIsPMOExpanded] = useState(true);

  const toggleDept = (id: number) => {
    setExpandedDeptIds(prev => 
      prev.includes(id) ? prev.filter(did => did !== id) : [...prev, id]
    );
  };

  const toggleSection = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedSectionIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleHomeClick = () => {
    onNavigate(null, null);
    if (window.innerWidth < 1024) onClose();
  };

  const handleSectionClick = (deptId: number, sectionId: string) => {
    onNavigate(deptId, sectionId);
    if (window.innerWidth < 1024) onClose();
  };

  // Restructured Groups based on latest requirements:
  // Operations: Enterprise (1), Consumer (2), Fiber (3), FTTH Maint (4), Power (5)
  // PMO: GSM (6), AsiaCell (7), Data Center (8)
  const OPERATION_UNIT_IDS = [1, 2, 3, 4, 5];
  const PMO_IDS = [6, 7, 8];

  const operationDepts = COMPANY_DATA.departments.filter(d => OPERATION_UNIT_IDS.includes(d.id));
  const pmoDepts = COMPANY_DATA.departments.filter(d => PMO_IDS.includes(d.id));

  // Recursive component for rendering sections and subsections
  const renderSection = (section: Section, deptId: number, level: number = 0) => {
    const hasSubSections = section.subSections && section.subSections.length > 0;
    const isExpanded = expandedSectionIds.includes(section.id);
    const paddingLeft = level * 12 + 12; // Base padding + indent

    if (hasSubSections) {
      return (
        <div key={section.id}>
          <button
            onClick={(e) => toggleSection(e, section.id)}
            className="w-full flex items-center justify-between py-2 px-3 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors text-left border-l-2 border-transparent hover:border-slate-500"
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            <div className="flex items-center gap-2">
              <i className={`fas fa-angle-${isExpanded ? 'down' : 'right'} text-xs opacity-50`}></i>
              {section.name}
            </div>
          </button>
          <div className={`
             overflow-hidden transition-all duration-300 ease-in-out
             ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
          `}>
            {section.subSections!.map(sub => renderSection(sub, deptId, level + 1))}
          </div>
        </div>
      );
    }

    return (
      <button
        key={section.id}
        onClick={() => handleSectionClick(deptId, section.id)}
        className="w-full flex items-center gap-2 py-2 px-3 text-sm text-slate-500 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors text-left"
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <span className="w-1 h-1 rounded-full bg-slate-500 shrink-0"></span>
        <span className="truncate">{section.name}</span>
      </button>
    );
  };

  const renderDeptGroup = (depts: Department[]) => (
    <div className="space-y-1">
      {depts.map((dept) => {
        const isExpanded = expandedDeptIds.includes(dept.id);
        const iconClass = COLOR_CONFIG[dept.color].icon;
        
        return (
          <div key={dept.id}>
            <button 
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg 
                hover:bg-slate-800 transition-all duration-200 text-left group
                ${isExpanded ? 'bg-slate-800' : ''}
              `}
              onClick={() => toggleDept(dept.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 flex justify-center ${iconClass} group-hover:scale-110 transition-transform`}>
                  <i className={`fas fa-${dept.icon}`}></i>
                </div>
                <span className="text-sm font-medium text-slate-200 group-hover:text-white">{dept.name}</span>
              </div>
              <i className={`fas fa-chevron-down text-xs text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
            </button>
            
            <div 
              className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="pl-2 pr-2 py-1 space-y-1">
                {dept.sections.map((section) => renderSection(section, dept.id))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`
          fixed top-0 left-0 h-full w-72 bg-slate-900 text-white z-50 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static overflow-y-auto scrollbar-hide
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <img 
              src="https://media.licdn.com/dms/image/v2/C4D0BAQGxApknM8O3Vg/company-logo_200_200/company-logo_200_200/0/1630525227090?e=2147483647&v=beta&t=Qk8mPjKVPMDQ5qxJqJQxQxPqPqPqPqPqPqPqPqPqPqQ" 
              alt="Agile Logo" 
              className="w-12 h-12 rounded-lg bg-white p-1 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Agile&background=0066CC&color=fff&size=48';
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Agile</h1>
              <p className="text-xs text-slate-400">Database System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          <div>
            <button 
              onClick={handleHomeClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
            >
              <i className="fas fa-home"></i>
              <span className="font-medium">Dashboard Home</span>
            </button>
          </div>

          {/* Operation Unit Menu */}
          <div>
            <button 
              onClick={() => setIsOperationsExpanded(!isOperationsExpanded)}
              className="w-full flex items-center justify-between px-4 mb-3 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <i className="fas fa-cogs text-xs text-blue-400"></i>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Operation Unit</p>
              </div>
              <i className={`fas fa-chevron-${isOperationsExpanded ? 'up' : 'down'} text-[10px] text-slate-600`}></i>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOperationsExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
               {renderDeptGroup(operationDepts)}
            </div>
          </div>

          {/* PMO Menu */}
          <div>
            <button 
              onClick={() => setIsPMOExpanded(!isPMOExpanded)}
              className="w-full flex items-center justify-between px-4 mb-3 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <i className="fas fa-project-diagram text-xs text-orange-400"></i>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">PMO</p>
              </div>
              <i className={`fas fa-chevron-${isPMOExpanded ? 'up' : 'down'} text-[10px] text-slate-600`}></i>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isPMOExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
               {renderDeptGroup(pmoDepts)}
            </div>
          </div>

          {/* Shortcuts */}
          <div className="pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-3 font-semibold">Quick Links</p>
            <div className="px-1 space-y-3">
              <a 
                href="https://baserow.io/workspace/160461" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-all group"
              >
                <div className="w-8 h-8 bg-emerald-600/20 text-emerald-400 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <i className="fas fa-table text-xs"></i>
                </div>
                <span className="font-medium text-sm">Baserow</span>
                <i className="fas fa-external-link-alt text-[10px] ml-auto opacity-50 group-hover:opacity-100"></i>
              </a>

              <a 
                href="https://aistudio.google.com/prompts/1vEoCqtWkdI6NjubInrCdAc6om--DSp9q" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-all group"
              >
                <div className="w-8 h-8 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <i className="fas fa-paper-plane text-xs"></i>
                </div>
                <span className="font-medium text-sm">Doc Sender</span>
                <i className="fas fa-external-link-alt text-[10px] ml-auto opacity-50 group-hover:opacity-100"></i>
              </a>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-900 mt-auto sticky bottom-0">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] justify-center uppercase tracking-widest font-medium">
            <i className="fas fa-shield-alt text-blue-500"></i>
            <span>Agile Systems v2.1</span>
          </div>
        </div>
      </aside>
    </>
  );
};