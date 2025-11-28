interface BlogCoverProps {
  index: number;
  title: string;
  className?: string;
}

/**
 * Blog cover component that alternates between two colors
 * Uses brand color variations for visual consistency
 */
export function BlogCover({ index, title, className = '' }: BlogCoverProps) {
  // Alternate between two colors based on index
  const isEven = index % 2 === 0;
  
  // Two brand color variations - alternating between darker and lighter purple
  const color1 = 'bg-gradient-to-br from-[#7C5CFC] via-[#6B4FE8] to-[#5A42D4]'; // Darker purple gradient
  const color2 = 'bg-gradient-to-br from-[#8B6DFF] via-[#7C5CFC] to-[#6B4FE8]'; // Lighter purple gradient
  
  const bgColor = isEven ? color1 : color2;
  
  // Get first letter or first two letters for the cover
  const initials = title
    .split(' ')
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2) || 'H';

  return (
    <div className={`${bgColor} ${className} flex items-center justify-center relative overflow-hidden`}>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>
      
      {/* Initials or title preview */}
      <div className="relative z-10 text-white/90 font-bold text-4xl lg:text-5xl font-display">
        {initials}
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05))] bg-[length:20px_20px]" />
    </div>
  );
}

