import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  // Height sizing tailored for crisp display
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  return (
    <div 
      className={`inline-flex items-center gap-3 cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center bg-white rounded-xl p-1 shadow-xs border border-slate-200/60 overflow-hidden flex-shrink-0">
        <img
          src="/jecrc-nexus-logo.png"
          alt="JECRC Nexus Official Logo"
          className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-200 hover:scale-105`}
        />
      </div>

      {showTagline && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-brand-dark tracking-tight text-lg sm:text-xl">
              JECRC <span className="text-brand-blue">NEXUS</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-50 text-brand-blue border border-blue-200 rounded-md">
              JU
            </span>
          </div>
          <span className="text-[11px] font-medium text-brand-slate">
            Your Campus. Your Knowledge. Your Community.
          </span>
        </div>
      )}
    </div>
  );
};
