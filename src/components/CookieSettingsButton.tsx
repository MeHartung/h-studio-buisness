'use client';

export default function CookieSettingsButton({ label }: { label: string }) {
  const handleClick = () => {
    const event = new CustomEvent('openCookieManager');
    window.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleClick}
      className="hover:text-text transition-colors min-h-[44px] min-w-[44px]"
      aria-label={label || "Open cookie settings"}
    >
      {label}
    </button>
  );
}

