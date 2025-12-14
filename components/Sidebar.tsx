import React, { useState } from 'react';
import { COMPANY_DATA } from '../constants';
import { ActiveSectionState } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onNavigate: (deptId: number | null, sectionId: string | null) => void;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNavigate, onClose }) => {
  const [expandedDeptIds, setExpandedDeptIds] = useState<number[]>([]);

  const toggleDept = (id: number) => {
    setExpandedDeptIds(prev => 
      prev.includes(id) ? prev.filter(did => did !== id) : [...prev, id]
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
              <h1 className="text-xl font-bold text-white">Agile</h1>
              <p className="text-xs text-slate-400">FTTH Database System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="mb-4">
            <button 
              onClick={handleHomeClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
            >
              <i className="fas fa-home"></i>
              <span>Dashboard Home</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-2 font-semibold">Departments</p>

          <div className="space-y-1">
            {COMPANY_DATA.departments.map((dept) => {
              const isExpanded = expandedDeptIds.includes(dept.id);
              
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
                      <div className={`w-6 flex justify-center text-${dept.color}-400 group-hover:scale-110 transition-transform`}>
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
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {dept.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => handleSectionClick(dept.id, section.id)}
                          className="w-full flex items-center gap-2 py-2 px-3 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors text-left border-l-2 border-transparent hover:border-slate-500 ml-2"
                        >
                          <i className="fas fa-angle-right text-xs opacity-50"></i>
                          {section.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shortcuts */}
          <div className="mt-8 pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-3 font-semibold">Shortcuts</p>
            <div className="px-1">
              <a 
                href="https://baserow.io/workspace/160461" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/25 group"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className="fas fa-table"></i>
                </div>
                <div>
                  <span className="font-medium text-sm block">Baserow Database</span>
                  <span className="text-[10px] text-emerald-200 uppercase tracking-wide">External Workspace</span>
                </div>
                <i className="fas fa-external-link-alt text-xs ml-auto opacity-75"></i>
              </a>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-900 mt-auto sticky bottom-0">
          <div className="flex items-center gap-2 text-slate-400 text-sm justify-center">
            <i className="fas fa-network-wired"></i>
            <span>FTTH Management v2.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
