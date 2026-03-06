// src/components/ReqSafety.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function ReqSafety({ children, ...props }) {
  // Assuming safety is never "empty" if the tag is present.
  return (
    <div className={styles['SectionContainer']} {...props}>
      <h4 className={styles['SectionHeading']}>Safety Requirements</h4>
      {children}
    </div>
  );
}
export default ReqSafety;