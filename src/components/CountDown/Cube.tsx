import type React from 'react';
import type { ICubeProps } from './countdown.interface';
import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';

const Cube: React.FC<ICubeProps> = ({
  size,
  units,
  rotation,
  suffix = '',
  show = true,
}) => {
  const faces = useMemo(
    () => [
      {
        name: 'front',
        transform: `translateZ(${size / 2}px)`,
        background: 'var(--bg-dark-10)',
      },

      {
        name: 'back',
        transform: `rotateX(180deg) translateZ(${size / 2}px)`,
        background: 'var(--bg-dark-10)',
      },
      {
        name: 'right',
        transform: `rotateY(90deg) translateZ(${size / 2}px)`,
        background: 'var(--bg-dark-10)',
      },
      {
        name: 'left',
        transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
        background: 'var(--primary-10)',
      },
      {
        name: 'top',
        transform: `rotateX(90deg) translateZ(${size / 2}px)`,
        background: 'var(--primary-10)',
      },
      {
        name: 'bottom',
        transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
        background: 'var(--primary-10)',
      },
    ],
    [size]
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [dynamicWidth, setDynamicWidth] = useState(size);

  useEffect(() => {
    if (!containerRef.current) return;

    // Observe natural widths of child faces (untransformed)
    const observer = new ResizeObserver(() => {
      const maxWidth = Math.max(
        ...Array.from(containerRef.current!.children).map((child) => {
          return (child as HTMLElement).offsetWidth;
        })
      );

      setDynamicWidth(maxWidth);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [units]);

  if (!show) {
    return null;
  }

  return (
    <>
      {/* HIDDEN MEASUREMENT CONTAINER */}
      <div
        ref={containerRef}
        className="absolute opacity-0 pointer-events-none"
        style={{ position: 'absolute' }}
      >
        {faces.map((face) => (
          <div
            key={face.name}
            className="inline-flex p-1"
            style={{ height: size }}
          >
            <Typography
              label={`${units}${suffix}`}
              variant={typographyVariants.body_14_600}
            />
          </div>
        ))}
      </div>

      {/* ACTUAL 3D CUBE */}
      <div style={{ perspective: dynamicWidth * 10000 + 'px' }}>
        <div
          className="relative transform-3d"
          style={{
            transition: 'transform 700ms cubic-bezier(.2,.8,.2,1)',
            width: dynamicWidth,
            height: size,
            transform: `translateZ(${-size / 2}px) rotateX(${-rotation}deg)`,
          }}
        >
          {faces.map((face) => (
            <div
              key={face.name}
              style={{
                transform: face.transform,
                background: face.background,
                width: dynamicWidth,
                height: size,
              }}
              className="backface-hidden absolute overflow-hidden flex justify-center items-center p-1"
            >
              <Typography
                label={`${units}${suffix}`}
                variant={typographyVariants.body_14_600}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cube;
