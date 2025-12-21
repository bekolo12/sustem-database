import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { DepartmentCard } from './components/DepartmentCard';
import { SectionDetail } from './components/SectionDetail';
import { COMPANY_DATA } from './constants';
import { ActiveSectionState } from './types';

const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // App State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSectionState | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'baker' && password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

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

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 fiber-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <img 
              src="https://media.licdn.com/dms/image/v2/C4D0BAQGxApknM8O3Vg/company-logo_200_200/company-logo_200_200/0/1630525227090" 
              alt="Agile Logo" 
              className="w-20 h-20 mx-auto rounded-2xl bg-slate-50 p-2 object-contain shadow-lg mb-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Agile&background=0066CC&color=fff&size=80';
              }}
            />
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to FTTH Database System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2 border border-red-100">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <i className="fas fa-arrow-right text-sm"></i>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
             <p className="text-xs text-gray-400">Agile Solutions • FTTH Management v2.0</p>
          </div>
        </div>
      </div>
    );
  }

  // Render Main App
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