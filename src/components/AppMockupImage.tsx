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
  width?: number;
  crop?: Crop;
  className?: string;
}

export function AppMockupImage({ src, label, width = 300, crop = DEFAULT_CROP, className = '' }: AppMockupImageProps) {
  const scale = width / crop.width;
  const height = width * (crop.height / crop.width);
  const imgWidth = REF_WIDTH * scale;
  const imgHeight = REF_HEIGHT * scale;

  return (
    <div className={`overflow-hidden ${className}`} style={{ width, height }}>
      <img
        src={src}
        alt={label ?? 'Fineria uygulama ekranı'}
        style={{
          width: imgWidth,
          height: imgHeight,
          maxWidth: 'none',
          transform: `translate(${-crop.left * scale}px, ${-crop.top * scale}px)`,
        }}
      />
    </div>
  );
}
