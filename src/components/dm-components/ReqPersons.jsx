// src/components/ReqPersons.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function ReqPersons({ children, ...props }) {
  const isEmpty = React.Children.count(children) === 0;

  if (isEmpty) {
    return (
      <div className={styles['SectionContainer']}>
        <h4 className={styles['SectionHeading']}>Required Personnel</h4>
        <p className={styles['SectionNotRequired']}>None Required</p>
      </div>
    );
  }

  return (
    <div className={styles['SectionContainer']} {...props}>
      <h4 className={styles['SectionHeading']}>Required Personnel</h4>
      <div className='pl-4'>
      {children}
      </div>
    </div>
  );
}
export default ReqPersons;