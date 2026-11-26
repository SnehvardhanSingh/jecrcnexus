import React from 'react';

export const HeroBannerIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 360 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Soft ambient shapes */}
    <circle cx="235" cy="115" r="88" fill="#FFFFFF" fillOpacity="0.12" />
    <circle cx="145" cy="165" r="46" fill="#F8C423" fillOpacity="0.18" />
    <path
      d="M42 195C82 178 148 176 205 186C262 196 312 186 344 195"
      stroke="#FFFFFF"
      strokeOpacity="0.35"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Floating academic badges */}
    <g>
      <rect x="34" y="34" width="54" height="36" rx="10" fill="#FFFFFF" fillOpacity="0.18" />
      <path d="M48 48H74M48 56H66" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Student 1 (Left - White/Navy academic jacket, holding diploma/scroll) */}
    <g>
      {/* Legs */}
      <path d="M138 148L128 188" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
      <path d="M156 146L172 186" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
      {/* Shoes */}
      <ellipse cx="124" cy="192" rx="9" ry="5" fill="#F56A53" />
      <ellipse cx="176" cy="190" rx="9" ry="5" fill="#F56A53" />
      {/* Raised Arm */}
      <path d="M162 84L184 44" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
      {/* Scroll / Certificate */}
      <rect
        x="176"
        y="25"
        width="10"
        height="26"
        rx="4"
        transform="rotate(24 176 25)"
        fill="#F8C423"
      />
      <rect
        x="172"
        y="34"
        width="12"
        height="4"
        rx="2"
        transform="rotate(24 172 34)"
        fill="#F56A53"
      />
      {/* Torso */}
      <path
        d="M126 86C126 76 135 70 146 70H156C167 70 174 78 172 90L166 148H130L126 86Z"
        fill="#FFFFFF"
      />
      {/* Left Arm */}
      <path d="M130 88L108 118" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
      {/* Notebook in hand */}
      <rect x="92" y="110" width="22" height="28" rx="4" transform="rotate(-12 92 110)" fill="#F8C423" />
      <path d="M98 119L109 117" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" />
      {/* Head */}
      <circle cx="150" cy="54" r="11" fill="#1A2332" />
      <circle cx="152" cy="55" r="8" fill="#F7C9B6" />
      {/* Graduation Cap */}
      <path d="M136 45L152 38L168 45L152 51L136 45Z" fill="#1A2332" />
      <path d="M165 46V56" stroke="#F8C423" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Student 2 (Right - Coral academic robe, celebrating with tablet/scroll) */}
    <g>
      {/* Legs */}
      <path d="M245 148L238 192" stroke="#1A2332" strokeWidth="9" strokeLinecap="round" />
      <path d="M262 145L288 176" stroke="#1A2332" strokeWidth="9" strokeLinecap="round" />
      {/* Shoes */}
      <ellipse cx="236" cy="195" rx="9" ry="5" fill="#F8C423" />
      <ellipse cx="292" cy="179" rx="9" ry="5" fill="#F8C423" />
      {/* Raised Arm */}
      <path d="M238 82L222 38" stroke="#F56A53" strokeWidth="9" strokeLinecap="round" />
      {/* Diploma */}
      <rect
        x="212"
        y="22"
        width="10"
        height="24"
        rx="4"
        transform="rotate(-18 212 22)"
        fill="#FFFFFF"
      />
      <rect
        x="215"
        y="31"
        width="12"
        height="4"
        rx="2"
        transform="rotate(-18 215 31)"
        fill="#F8C423"
      />
      {/* Torso / Gown */}
      <path
        d="M232 76C232 68 240 62 252 62C264 62 272 70 272 82L276 148H230L232 76Z"
        fill="#F56A53"
      />
      {/* Collar accent */}
      <path d="M242 64L252 78L262 64" stroke="#F8C423" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right arm holding laptop */}
      <path d="M268 84L296 108" stroke="#F56A53" strokeWidth="9" strokeLinecap="round" />
      <rect x="284" y="102" width="28" height="20" rx="4" fill="#FFFFFF" />
      <circle cx="298" cy="112" r="3" fill="#39B2A3" />
      {/* Head */}
      <circle cx="252" cy="48" r="11" fill="#1A2332" />
      <circle cx="250" cy="49" r="8" fill="#E8A98E" />
      {/* Graduation Cap */}
      <path d="M234 39L252 31L270 39L252 46L234 39Z" fill="#FFFFFF" />
      <path d="M238 41V51" stroke="#F8C423" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Botanical leaves & sparkles */}
    <path d="M72 195C72 178 60 168 48 164C54 178 60 189 72 195Z" fill="#FFFFFF" fillOpacity="0.45" />
    <path d="M316 195C316 180 328 172 338 169C334 181 326 190 316 195Z" fill="#F8C423" fillOpacity="0.65" />
    <circle cx="204" cy="64" r="4" fill="#F8C423" />
    <circle cx="298" cy="60" r="3" fill="#FFFFFF" fillOpacity="0.7" />
    <circle cx="110" cy="64" r="3" fill="#F56A53" />
  </svg>
);

export const SidebarStudyIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 180 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Background Clock Circle */}
    <circle cx="62" cy="42" r="30" fill="#FFFFFF" fillOpacity="0.22" />
    <circle cx="62" cy="42" r="22" fill="#EAF8F6" />
    <path d="M62 29V42L71 48" stroke="#39B2A3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

    {/* Plant on left */}
    <path d="M24 114H38L36 122H26L24 114Z" fill="#F8C423" />
    <path d="M31 114C31 102 22 96 18 92C23 102 27 108 31 114Z" fill="#A7F3D0" />
    <path d="M31 114C32 100 40 94 45 90C41 101 36 108 31 114Z" fill="#6EE7B7" />

    {/* Student at desk */}
    <circle cx="96" cy="44" r="10" fill="#1A2332" />
    <circle cx="96" cy="46" r="7" fill="#F7C9B6" />
    {/* Torso */}
    <path d="M74 68C74 59 83 54 96 54C109 54 118 59 118 68L115 92H77L74 68Z" fill="#FFFFFF" />
    {/* Arms */}
    <path d="M77 67L88 82" stroke="#F8C423" strokeWidth="6" strokeLinecap="round" />
    <path d="M115 67L104 82" stroke="#F8C423" strokeWidth="6" strokeLinecap="round" />

    {/* Desk */}
    <rect x="48" y="82" width="96" height="8" rx="4" fill="#39B2A3" />
    <rect x="64" y="90" width="8" height="32" rx="3" fill="#2A9487" />
    <rect x="120" y="90" width="8" height="32" rx="3" fill="#2A9487" />

    {/* Laptop on desk */}
    <rect x="82" y="68" width="28" height="14" rx="3" fill="#1A2332" />
    <circle cx="96" cy="75" r="2.2" fill="#39B2A3" />

    {/* Backpack on right */}
    <rect x="136" y="90" width="24" height="30" rx="8" fill="#F8C423" />
    <rect x="141" y="102" width="14" height="10" rx="3" fill="#FFFFFF" fillOpacity="0.7" />
    <path d="M143 90C143 85 153 85 153 90" stroke="#1A2332" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
