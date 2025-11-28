'use client';

export default function CookieSettingsButton({ label }: { label: string }) {
  const handleClick = () => {
    const event = new CustomEvent('openCookieManager');
    window.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleClick}
      className="hover:text-text transition-colors"
    >
      {label}
    </button>
  );
}

