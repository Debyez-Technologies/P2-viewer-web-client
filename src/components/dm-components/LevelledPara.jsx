import React from 'react';
import styles from '../../utils/styleMap.json';
import { componentRegistry, registerComponent } from './componentRegistry';
// 1. Import the component types for comparison
import { Title } from './index';

function LevelledPara({ children, level = 1, ...props }) {
  // We need to recursively reference ourself, so we use `LevelledPara` directly.
  const childrenWithLevelProps = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // 2. Use direct type comparison
    if (child.type === Title) {
      return React.cloneElement(child, { level: level });
    }

    // You can compare against the component itself for recursive checks
    if (child.type === componentRegistry['LevelledPara']) {
      return React.cloneElement(child, { level: level + 1 });
    }

    return child;
  });

  return (
    <section className={styles['LevelledPara']} {...props}>
      {childrenWithLevelProps}
    </section>
  );
}
registerComponent('LevelledPara', LevelledPara);

export default LevelledPara;