import React from "react";

interface NavIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 📝 Blog Icon: Vibrant coral notebook with golden pencil & ruled sheet
 */
export function BlogNavIcon({ size = 24, className, style }: NavIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, ...style }}
    >
      <defs>
        <linearGradient id="blogCoverGrad" x1="3" y1="3" x2="17" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A30" />
          <stop offset="1" stopColor="#E63946" />
        </linearGradient>
        <linearGradient id="blogSheetGrad" x1="5" y1="5" x2="15" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFF4E6" />
        </linearGradient>
        <linearGradient id="pencilBody" x1="12" y1="12" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD166" />
          <stop offset="1" stopColor="#F4A261" />
        </linearGradient>
      </defs>

      {/* Notebook Cover */}
      <rect x="3" y="3" width="14" height="18" rx="2.5" fill="url(#blogCoverGrad)" />

      {/* Notebook Paper Page */}
      <rect x="5.2" y="5.2" width="10.2" height="13.6" rx="1.5" fill="url(#blogSheetGrad)" />

      {/* Ruled Lines */}
      <line x1="7.2" y1="8.5" x2="13.5" y2="8.5" stroke="#F4A261" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="7.2" y1="11.5" x2="13.5" y2="11.5" stroke="#F4A261" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="7.2" y1="14.5" x2="11.5" y2="14.5" stroke="#F4A261" strokeWidth="1.2" strokeLinecap="round" />

      {/* Binder Ring Accents */}
      <circle cx="5.2" cy="7.5" r="0.9" fill="#FFFFFF" />
      <circle cx="5.2" cy="12" r="0.9" fill="#FFFFFF" />
      <circle cx="5.2" cy="16.5" r="0.9" fill="#FFFFFF" />

      {/* 3D Floating Pencil */}
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.35))">
        <path
          d="M19.8 4.2L20.8 5.2C21.4 5.8 21.4 6.8 20.8 7.4L15.2 13L12.5 13.8L13.3 11.1L18.9 5.5C19.1 5.3 19.5 4.4 19.8 4.2Z"
          fill="url(#pencilBody)"
        />
        {/* Pink Eraser Tip */}
        <path d="M19.8 4.2L20.8 5.2L19.4 6.6L18.4 5.6L19.8 4.2Z" fill="#FF5C8D" />
        {/* Graphite Tip */}
        <path d="M12.5 13.8L13.3 11.1L14 11.8L12.5 13.8Z" fill="#2B2D42" />
      </g>
    </svg>
  );
}

/**
 * 📚 Shelves Icon: Colorful books on bookshelf with glowing bookmark
 */
export function ShelvesNavIcon({ size = 24, className, style }: NavIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, ...style }}
    >
      <defs>
        <linearGradient id="bookBlue" x1="3" y1="5" x2="8" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="bookPurple" x1="8" y1="3" x2="14" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C084FC" />
          <stop offset="1" stopColor="#7E22CE" />
        </linearGradient>
        <linearGradient id="bookGreen" x1="14" y1="6" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Shelf Base Plank */}
      <rect x="2" y="19" width="20" height="2.2" rx="1.1" fill="#71717A" />

      {/* Book 1 (Blue) */}
      <rect x="3.5" y="6.5" width="4" height="12.5" rx="1" fill="url(#bookBlue)" />
      <line x1="4.5" y1="9.5" x2="6.5" y2="9.5" stroke="#E0F2FE" strokeWidth="1" strokeLinecap="round" />
      <line x1="4.5" y1="12.5" x2="6.5" y2="12.5" stroke="#E0F2FE" strokeWidth="1" strokeLinecap="round" />

      {/* Book 2 (Tilted Royal Purple) */}
      <rect x="8.5" y="4" width="4.2" height="15" rx="1" fill="url(#bookPurple)" />
      <circle cx="10.6" cy="7.5" r="1.1" fill="#F3E8FF" />
      <line x1="9.6" y1="11" x2="11.6" y2="11" stroke="#F3E8FF" strokeWidth="1" strokeLinecap="round" />
      <line x1="9.6" y1="13.5" x2="11.6" y2="13.5" stroke="#F3E8FF" strokeWidth="1" strokeLinecap="round" />

      {/* Book 3 (Emerald Green) */}
      <rect x="13.7" y="7.5" width="4" height="11.5" rx="1" fill="url(#bookGreen)" />
      <line x1="14.7" y1="10.5" x2="16.7" y2="10.5" stroke="#D1FAE5" strokeWidth="1" strokeLinecap="round" />

      {/* Gold Ribbon Bookmark hanging down */}
      <path d="M10 19V21.5L10.6 20.7L11.2 21.5V19H10Z" fill="#FBBF24" />
    </svg>
  );
}

/**
 * 💻 Projects Icon: Sleek dark code window with traffic-light dots & neon brackets
 */
export function ProjectsNavIcon({ size = 24, className, style }: NavIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, ...style }}
    >
      <defs>
        <linearGradient id="windowBg" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E1E2E" />
          <stop offset="1" stopColor="#11111B" />
        </linearGradient>
      </defs>

      {/* Window Body */}
      <rect x="2" y="4" width="20" height="16" rx="3.5" fill="url(#windowBg)" stroke="#313244" strokeWidth="1" />

      {/* Traffic Light Header Dots */}
      <circle cx="5.5" cy="7.5" r="1.25" fill="#FF5F56" />
      <circle cx="8.5" cy="7.5" r="1.25" fill="#FFBD2E" />
      <circle cx="11.5" cy="7.5" r="1.25" fill="#27C93F" />

      {/* Window Header Divider */}
      <line x1="2" y1="10.5" x2="22" y2="10.5" stroke="#313244" strokeWidth="0.8" />

      {/* Neon Code Brackets: < / > */}
      <path d="M7.5 13L5.5 15L7.5 17" stroke="#00F0FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 13L18.5 15L16.5 17" stroke="#00F0FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 12.5L11 17.5" stroke="#F43F5E" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 👤 About me Icon: Vibrant sunset-violet gradient circular avatar badge with sparkle
 */
export function AboutNavIcon({ size = 24, className, style }: NavIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, ...style }}
    >
      <defs>
        <linearGradient id="avatarGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <mask id="avatarCircleMask">
          <circle cx="12" cy="12" r="9.5" fill="#FFFFFF" />
        </mask>
      </defs>

      {/* Vibrant Gradient Shield */}
      <circle cx="12" cy="12" r="9.5" fill="url(#avatarGradient)" />

      {/* Crisp Silhouette Head & Shoulders */}
      <g mask="url(#avatarCircleMask)">
        <circle cx="12" cy="8.8" r="3.4" fill="#FFFFFF" />
        <path d="M6 19C6 15.6 8.7 13.5 12 13.5C15.3 13.5 18 15.6 18 19V20.5H6V19Z" fill="#FFFFFF" />
      </g>

      {/* Golden Sparkle Star */}
      <path
        d="M18.5 4L19 5.5L20.5 6L19 6.5L18.5 8L18 6.5L16.5 6L18 5.5L18.5 4Z"
        fill="#FBBF24"
        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
      />
    </svg>
  );
}
