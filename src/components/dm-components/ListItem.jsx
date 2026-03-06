import React from 'react';
import styles from '../../utils/styleMap.json';

// 1. Import the component type for comparison
import { Para } from './index';

function ListItem({ children, ...props }) {
  const styleClass = styles['ListItem'];

  const renderUnwrappedChildren = () => {
    return React.Children.map(children, child => {
      // 2. Use direct type comparison
      if (React.isValidElement(child) && child.type === Para) {
        return child.props.children;
      }
      return child;
    });
  };

  return (
    <li className={styleClass} {...props}>
      {renderUnwrappedChildren()}
    </li>
  );
}

export default ListItem;