'use client';

import { STATISTICS, COLORS } from '@/lib/constants';
import { useEffect, useState } from 'react';

function CounterNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, duration]);

  return <span>{count}</span>;
}

export function StatisticsSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATISTICS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  {index === 0 && '🏢'}
                  {index === 1 && '👥'}
                  {index === 2 && '🎯'}
                </div>
              </div>
              <p className="text-4xl font-bold mb-2" style={{ color: COLORS.primary }}>
                <CounterNumber target={parseInt(stat.number)} />
                {stat.number.includes('+') && '+'}
              </p>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
