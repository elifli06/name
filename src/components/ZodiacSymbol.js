import React from 'react';

const ZodiacSymbol = ({ 
  symbol, 
  name, 
  size = 'md', 
  className = '',
  animation = '', 
  animationDuration = '',
  animationDelay = '',
  hoverAnimation = ''
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    small: 'text-2xl',
  };

  const animationStyle = {
    animationName: animation || undefined,
    animationDuration: animationDuration || undefined,
    animationDelay: animationDelay || undefined,
    animationIterationCount: animation ? 'infinite' : undefined,
    animationFillMode: animation ? 'both' : undefined
  };

  return (
    <div 
      className={`zodiac-symbol ${sizeClasses[size]} ${animation ? '' : 'animate-fadeIn'} ${hoverAnimation ? 'hover:' + hoverAnimation : ''} ${className}`} 
      title={name}
      style={{ 
        display: 'inline-flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        ...animationStyle
      }}
    >
      {symbol || '★'}
    </div>
  );
};

export default ZodiacSymbol; 