// src/components/ReqSupportEquips.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function ReqSupportEquips({ children, ...props }) {
  const firstChild = React.Children.toArray(children)[0];
  const isEmpty = React.Children.count(children) === 0 || firstChild?.type?.componentType === 'NoSupportEquips';

  if (isEmpty) {
    return (
      <div className={styles['SectionContainer']}>
        <h4 className={styles['SectionHeading']}>Required Support Equipment</h4>
        <p className={styles['SectionNotRequired']}>None Required</p>
      </div>
    );
  }
  
  return (
    <div className={styles['SectionContainer']} {...props}>
      <h4 className={styles['SectionHeading']}>Required Support Equipment</h4>
      <div className='pl-4'>
        {children}
      </div>
    </div>
  );
}
export default ReqSupportEquips;