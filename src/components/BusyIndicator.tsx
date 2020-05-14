// Source react-busy-indicator@1.0.0

import React, { useState, useEffect } from 'react';

const baseClass =
  'BusyIndicator-' +
  Math.random()
    .toString(36)
    .slice(2);

// Add busy indicator stylesheet
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
.${baseClass} {
  position: fixed;
  height: 3px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) inset;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform ease-in 300ms, opacity ease-in 300ms;
  transition-delay: 0;
  opacity: 0;
}
.${baseClass}.active {
  animation: ${baseClass} 2s cubic-bezier(.4,.45,.6,.55) infinite;
  animation-fill-mode: forwards;
  opacity: 1;
}
@keyframes ${baseClass} {
  0% {
    transform: scaleX(0);
  }
  10% {
    transform: scaleX(0.3);
  }
  50% {
    transform: scaleX(0.7);
  }
  90% {
    transform: scaleX(0.8);
  }
  100% {
    transform: scaleX(1);
  }
}`;
document.getElementsByTagName('head')[0].appendChild(style);

interface BusyIndicatorProps extends React.HTMLAttributes<any> {
  color?: string;
  delayMs?: number;
  isBusy?: boolean;
  active?: boolean;
}

export default function BusyIndicator({ className, color, active, isBusy, delayMs, style, ...props }: BusyIndicatorProps) {
  let [hasRendered, setHasRendered] = useState(false);
  const isActive = !!isBusy;

  useEffect(() => {
    let timeout: any;
    if (!hasRendered) {
      timeout = setTimeout(() => setHasRendered(true));
    }
    return () => clearTimeout(timeout);
  }, [hasRendered, isBusy]);

  // Only add the `active` class to this element while the
  // next page is loading, triggering a CSS animation to
  // show or hide the loading bar.
  return React.createElement('div', {
    ...props,
    className: `${baseClass} ${isActive ? 'active' : ''} ${className || ''}`,
    style: {
      backgroundColor: color,

      ...(isActive
        ? {
            transitionDelay: (delayMs || 0) + 'ms'
          }
        : {}),

      ...style
    }
  });
}

(BusyIndicator as any).defaultProps = {
  color: '#F54391',
  delayMs: 333
};
