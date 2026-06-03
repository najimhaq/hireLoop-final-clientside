'use client';

import { DashboardStats } from "./DashboardStats";



export function StatsGrid({ stats, columns = 4, className = '' }) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  return (
    <div
      className={`grid gap-6 ${gridCols[columns] || gridCols[4]} ${className}`}
    >
      {stats.map((stat, index) => (
        <DashboardStats
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          trend={stat.trend}
          trendValue={stat.trendValue}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
