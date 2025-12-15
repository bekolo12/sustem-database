import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { DepartmentCard } from './components/DepartmentCard';
import { SectionDetail } from './components/SectionDetail';
import { COMPANY_DATA } from './constants';
import { ActiveSectionState } from './types';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSectionState | null>(null);

  const handleNavigate = (deptId: number | null, sectionId: string | null) => {
    if (deptId !== null && sectionId !== null) {
      setActiveSection({ deptId, sectionId });
    } else {
      setActiveSection(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentDept = activeSection 
    ? COMPANY_DATA.departments.find(d => d.id === activeSection.deptId) 
    : null;
    
  const currentSection = currentDept && activeSection
    ? currentDept.sections.find(s => s.id === activeSection.sectionId)
    : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onNavigate={handleNavigate} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-blue-600 text-white p-3 rounded-lg shadow-xl hover:bg-blue-700 transition-colors"
        aria-label="Toggle Menu"
      >
        <i className="fas fa-bars text-xl"></i>
      </button>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          
          {/* Conditional Rendering */}
          {!activeSection ? (
            // Dashboard Home View
            <>
              <div className="px-6 pt-6">
                <Hero />
              </div>
              
              <div className="px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                   <Stats />
                  
                  <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">Departments</h2>
                      <p className="text-gray-500 mt-1">Access all department databases and dashboards</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-16 fiber-pattern rounded-3xl p-4 md:p-8 border border-slate-100 bg-white/50 backdrop-blur-sm">
                    {COMPANY_DATA.departments.map(dept => (
                      <DepartmentCard 
                        key={dept.id} 
                        dept={dept} 
                        onSelectSection={(deptId, sectionId) => handleNavigate(deptId, sectionId)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* FTTH Info Footer Section */}
              <section className="py-16 px-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-2xl font-bold mb-10 text-center relative">
                    <span className="relative z-10">FTTH Infrastructure Overview</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-blue-500 rounded-full mt-2"></span>
                  </h2>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { icon: 'network-wired', color: 'text-blue-400', title: 'Fiber Deployment', desc: 'Complete fiber network infrastructure management' },
                      { icon: 'wifi', color: 'text-orange-400', title: 'Wireless Solutions', desc: 'Enterprise wireless connectivity services' },
                      { icon: 'tools', color: 'text-green-400', title: 'Installation & Maint.', desc: 'User installation and maintenance tracking' },
                      { icon: 'hard-hat', color: 'text-yellow-400', title: 'Civil Works', desc: 'Drilling, OSP, and QC operations' }
                    ].map((item, idx) => (
                      <div key={idx} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-md border border-white/5 hover:bg-white/10 transition-colors">
                        <i className={`fas fa-${item.icon} text-4xl ${item.color} mb-4`}></i>
                        <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : (
            // Section Detail View
            <div className="p-6 pt-24 lg:pt-10 min-h-screen">
              {currentDept && currentSection && (
                <div className="max-w-6xl mx-auto">
                  <SectionDetail 
                    dept={currentDept} 
                    section={currentSection} 
                    onBack={() => handleNavigate(null, null)} 
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Site Footer */}
          <footer className="bg-slate-900 text-white py-8 px-6 border-t border-slate-800">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/C4D0BAQGxApknM8O3Vg/company-logo_200_200/company-logo_200_200/0/1630525227090" 
                    alt="Agile Logo" 
                    className="w-10 h-10 rounded-lg bg-white p-1 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Agile&background=fff&color=0066CC&size=40';
                    }}
                  />
                  <div>
                    <div className="font-bold text-lg">Agile Solutions</div>
                    <div className="text-xs text-slate-400">FTTH Database Management System</div>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">
                  © {new Date().getFullYear()} Agile Solutions. All rights reserved.
                </div>
              </div>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default App;
