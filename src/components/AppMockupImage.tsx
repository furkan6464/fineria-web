const REF_WIDTH = 1080;
const REF_HEIGHT = 1350;

// Tight crop around the phone bezel — the source canvas has generous
// padding around the device that reads as "small and floating" otherwise.
const DEFAULT_CROP = { left: 285, top: 150, width: 505, height: 1040 };

interface Crop {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface AppMockupImageProps {
  src: string;
  label?: string;
  /** Üst sınır genişlik; dar ekranda kapsayıcıya göre küçülür. */
  width?: number;
  crop?: Crop;
  className?: string;
}

export function AppMockupImage({
  src,
  label,
  width = 300,
  crop = DEFAULT_CROP,
  className = '',
}: AppMockupImageProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        width: '100%',
        maxWidth: width,
        aspectRatio: `${crop.width} / ${crop.height}`,
      }}
    >
      <img
        src={src}
        alt={label ?? 'Fineria uygulama ekranı'}
        style={{
          width: `${(REF_WIDTH / crop.width) * 100}%`,
          height: `${(REF_HEIGHT / crop.height) * 100}%`,
          maxWidth: 'none',
          transform: `translate(${-(crop.left / REF_WIDTH) * 100}%, ${-(crop.top / REF_HEIGHT) * 100}%)`,
        }}
      />
    </div>
  );
}
