import styles from './christmas.module.css';

const FLAKES = [
  { left: '4%', size: 5, delay: '-1s', duration: '15s', drift: '16px', opacity: 0.8, color: '#fff' },
  { left: '11%', size: 3, delay: '-8s', duration: '18s', drift: '-12px', opacity: 0.55, color: '#f3e2b3' },
  { left: '18%', size: 6, delay: '-4s', duration: '13s', drift: '22px', opacity: 0.7, color: '#fff' },
  { left: '26%', size: 4, delay: '-12s', duration: '20s', drift: '-18px', opacity: 0.45, color: '#fff' },
  { left: '33%', size: 7, delay: '-2s', duration: '16s', drift: '10px', opacity: 0.35, color: '#f7f1e4' },
  { left: '41%', size: 3, delay: '-9s', duration: '12s', drift: '14px', opacity: 0.75, color: '#fff' },
  { left: '48%', size: 5, delay: '-6s', duration: '19s', drift: '-8px', opacity: 0.5, color: '#f3e2b3' },
  { left: '55%', size: 4, delay: '-14s', duration: '14s', drift: '20px', opacity: 0.65, color: '#fff' },
  { left: '63%', size: 6, delay: '-3s', duration: '17s', drift: '-16px', opacity: 0.4, color: '#fff' },
  { left: '71%', size: 3, delay: '-11s', duration: '13s', drift: '12px', opacity: 0.8, color: '#f3e2b3' },
  { left: '78%', size: 5, delay: '-7s', duration: '21s', drift: '-10px', opacity: 0.55, color: '#fff' },
  { left: '86%', size: 4, delay: '-1.5s', duration: '15s', drift: '18px', opacity: 0.7, color: '#fff' },
  { left: '93%', size: 6, delay: '-10s', duration: '18s', drift: '-14px', opacity: 0.35, color: '#f7f1e4' },
  { left: '8%', size: 3, delay: '-16s', duration: '22s', drift: '8px', opacity: 0.5, color: '#fff' },
  { left: '37%', size: 4, delay: '-5s', duration: '11s', drift: '-20px', opacity: 0.6, color: '#fff' },
  { left: '67%', size: 5, delay: '-13s', duration: '16s', drift: '15px', opacity: 0.45, color: '#f3e2b3' },
  { left: '22%', size: 3, delay: '-18s', duration: '14s', drift: '9px', opacity: 0.7, color: '#fff' },
  { left: '82%', size: 4, delay: '-4.5s', duration: '19s', drift: '-11px', opacity: 0.55, color: '#fff' },
] as const;

export default function Snow() {
  return (
    <div className={styles.snow} aria-hidden="true">
      {FLAKES.map((flake) => (
        <span
          key={`${flake.left}-${flake.delay}`}
          className={styles.flake}
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            opacity: flake.opacity,
            background: flake.color,
            ['--drift' as string]: flake.drift,
          }}
        />
      ))}
    </div>
  );
}
