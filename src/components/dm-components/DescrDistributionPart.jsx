// src/components/DescrDistributionPart.jsx
import styles from '../../utils/styleMap.json';

function DescrDistributionPart({ children, ...props }) {
  return (
    <div className={styles['FieldSubGroup']} {...props}>
      <h4 className={styles['FieldSubGroupTitle']}>Distribution Parts (Lugs, Terminals)</h4>
      {children}
    </div>
  );
}
export default DescrDistributionPart;