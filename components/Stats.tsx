import React from 'react';

export const Stats: React.FC = () => {
  const stats = [
    { value: '6', label: 'Departments', color: 'text-blue-600' },
    { value: '7', label: 'Sections', color: 'text-orange-500' },
    { value: '12+', label: 'Active Links', color: 'text-green-600' },
    { value: '5', label: 'Database Types', color: 'text-purple-600' }
  ];

  return (
    <section className="bg-white shadow-lg rounded-2xl border border-gray-100 mb-10 mx-6 md:mx-0 transform -translate-y-12 md:-translate-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-6 hover:bg-gray-50 transition-colors first:rounded-l-2xl last:rounded-r-2xl">
            <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
