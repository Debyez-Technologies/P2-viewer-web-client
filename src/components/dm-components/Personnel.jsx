// Personnel.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function Personnel({ children, numRequired, ...props }) {
  const styleClass = styles['Personnel'];
  const badgeStyle = styles['PersonnelBadge'];
  const iconContainerStyle = styles['PersonnelIconContainer'];

  return (
    <div className={styleClass} {...props}>
      {/* Left side: Icon and Text */}
      <div className={iconContainerStyle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 flex-shrink-0 text-slate-500"
        >
          <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.99 9.99 0 0010 12.001a9.99 9.99 0 00-6.535 2.492z" />
        </svg>
        <span>{children}</span>
      </div>

      {/* Right side: Number Badge */}
      {numRequired && <span className={badgeStyle}>{numRequired}</span>}
    </div>
  );
}

export default Personnel;