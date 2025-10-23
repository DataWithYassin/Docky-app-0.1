import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-slate-400 mt-16">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Docky. All rights reserved.</p>
        <p className="text-sm mt-1">Your Extra Shift, Made Easy.</p>
      </div>
    </footer>
  );
};

export default Footer;