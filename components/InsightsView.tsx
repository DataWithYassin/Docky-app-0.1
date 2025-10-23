import React from 'react';

const InsightsView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="bg-white p-12 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-primary tracking-tight">Insights</h2>
        <p className="text-slate-600 mt-4">
          This feature is coming soon! We're working on providing valuable data and analytics to help you make smarter decisions about your shifts and hiring.
        </p>
        <div className="mt-6 text-5xl">📊</div>
      </div>
    </div>
  );
};

export default InsightsView;