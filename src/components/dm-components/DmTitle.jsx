import React from 'react';
import styles from '../../utils/styleMap.json';
import { usePublicationStore } from '../../store/publication-store';
import { getInfoCodeFromKey } from '../../utils/dmUtils';

// 1. Import the component types for comparison
import { TechName, InfoName } from './index'; // Assuming index.js is in the same folder

function DmTitle({ children }) {
  const currentKey = usePublicationStore((state) => state.currentKey);
  const infoCode = getInfoCodeFromKey(currentKey);
  if (infoCode === '001') {
    return null;
  }

  let techName = null;
  let infoName = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      // 2. Use direct type comparison
      if (child.type === TechName) {
        techName = child;
      } else if (child.type === InfoName) {
        infoName = child;
      }
    }
  });

  return (
    <div className={styles['DmTitle']}>
      {infoName}
      {techName}
    </div>
  );
}

export default DmTitle;