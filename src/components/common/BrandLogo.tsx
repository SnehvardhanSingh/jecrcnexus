import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  compact = false,
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center bg-brand-tealLight rounded-xl p-1.5 border border-brand-teal/20 shadow-2xs overflow-hidden flex-shrink-0">
        <img
          src="/jecrc-nexus-logo.png"
          alt="JECRC Nexus Official Logo"
          className={`${sizeClasses[size]} object-contain transition-transform duration-200 hover:scale-105`}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold text-brand-dark tracking-tight ${compact ? 'text-base' : 'text-lg'}`}>
            JECRC <span className="text-brand-teal">Nexus</span>
          </span>
          {!compact && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-brand-tealLight text-brand-tealDark border border-brand-teal/20 rounded-md">
              JU
            </span>
          )}
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-brand-slate leading-tight">
            Academic & Collaboration Hub
          </span>
        )}
      </div>
    </div>
  );
};
