import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden text-white py-20 px-6 rounded-b-[3rem] shadow-2xl mb-8 -mx-6 md:mx-0 md:rounded-3xl">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC] via-[#004499] to-[#002266] opacity-95"></div>
         <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
         />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 text-center md:text-left">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/30 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
            <img 
              src="https://media.licdn.com/dms/image/v2/C4D0BAQGxApknM8O3Vg/company-logo_200_200/company-logo_200_200/0/1630525227090" 
              alt="Agile Logo" 
              className="relative w-24 h-24 rounded-2xl bg-white p-2 object-contain shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Agile&background=fff&color=0066CC&size=64';
              }}
            />
          </div>
          <div className="mt-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Agile Solutions</h1>
            <p className="text-blue-100 text-lg font-light tracking-wide">FTTH Company Database Management System</p>
          </div>
        </div>
        
        <p className="text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed text-center md:text-left mx-auto md:mx-0">
          Comprehensive Database Solution for Fiber to the Home Operations - Managing Enterprise, Consumer, and Fiber Deployment departments.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {[
            { icon: 'building', text: '6 Departments', color: 'text-orange-400' },
            { icon: 'database', text: 'Multiple Databases', color: 'text-green-400' },
            { icon: 'chart-line', text: 'Active Dashboards', color: 'text-yellow-400' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 hover:bg-white/20 transition-colors cursor-default">
              <i className={`fas fa-${item.icon} ${item.color}`}></i>
              <span className="font-medium text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
