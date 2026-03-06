// src/components/FieldDefinitionRow.jsx (A reusable layout component)
import styles from '../../utils/styleMap.json';
import React from 'react';

function FieldDefinitionRow({ children, ...props }) {
  // This component expects two children: <FieldName> and <Descr>
  const [fieldName, description] = React.Children.toArray(children);

  return (
    <div className={styles['FieldDefinitionRow']} {...props}>
      <div className={styles['FieldName']}>
        {fieldName}
      </div>
      <div className={styles['FieldDescription']}>
        {description}
      </div>
    </div>
  );
}
export default FieldDefinitionRow;