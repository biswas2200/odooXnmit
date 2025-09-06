import React from 'react';

interface SustainabilityBadgeProps {
  badge: string;
  className?: string;
}

const SustainabilityBadge: React.FC<SustainabilityBadgeProps> = ({ badge, className }) => {
  return (
    <span className={`badge badge-success text-xs ${className || ''}`}>
      {badge.replace('-', ' ')}
    </span>
  );
};

export default SustainabilityBadge;
