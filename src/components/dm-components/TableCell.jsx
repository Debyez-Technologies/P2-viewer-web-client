import React from 'react';
import styles from '../../utils/styleMap.json';
import { useTableContext } from '../../../providers/TableContext';

// 1. Import the component type for comparison
import { Para } from './index';

function TableCell({ children, ...props }) {
  const { isHeader } = useTableContext();
  const styleClass = isHeader ? styles['THEntry'] : styles['Entry'];
  const Tag = isHeader ? 'th' : 'td';

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
    <Tag className={styleClass} {...props}>
      {renderUnwrappedChildren()}
    </Tag>
  );
}

export default TableCell;