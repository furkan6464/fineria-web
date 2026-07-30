import logoMark from '@/assets/brand/fineria-mark.png';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  textColor?: string;
}

export function Logo({ size = 36, showText = true, className = '', textColor = 'var(--ink-900)' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoMark}
        alt="Fineria"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="flex-shrink-0"
      />
      {showText && (
        <span
          className="font-extrabold tracking-tight"
          style={{ fontSize: size * 0.52, color: textColor, letterSpacing: '-0.02em' }}
        >
          Fineria
        </span>
      )}
    </div>
  );
}
