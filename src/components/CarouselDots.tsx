type Props = {
  count: number;
  active: number;
  className?: string;
};

export default function CarouselDots({ count, active, className = '' }: Props) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-[6px] ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block rounded-full shrink-0"
          style={{
            width: 6,
            height: 6,
            backgroundColor: '#1a1a1a',
            opacity: active === i ? 1 : 0.2,
            transition: 'opacity var(--motion-slow) ease',
          }}
        />
      ))}
    </div>
  );
}
