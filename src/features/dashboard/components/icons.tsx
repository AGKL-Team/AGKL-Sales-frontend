
import React from 'react';

export const CatalogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export const AccountIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"></path>
    <circle cx="12" cy="10" r="3"></circle>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export const SalesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 6h20v2H2zM4 12h2M4 16h2M20 12h-2M20 16h-2M6 12h12v8H6zM6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"></path>
    <path d="M12 18.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
  </svg>
);

export const BrandsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 12h-2a2 2 0 1 0 0 4h2"></path>
    <path d="M12 8a2 2 0 1 0-4 0v4"></path>
    <path d="m14 16-2-4"></path>
  </svg>
);

export const ReportsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M8 21h8"></path>
    <path d="M12 17v4"></path>
    <path d="M8 7h8"></path>
    <path d="M8 11h4"></path>
  </svg>
);
