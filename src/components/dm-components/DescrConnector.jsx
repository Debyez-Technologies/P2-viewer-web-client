// src/components/DescrConnector.jsx
import styles from '../../utils/styleMap.json';

function DescrConnector({ children, ...props }) {
  return (
    <div className={styles['FieldSubGroup']} {...props}>
      <h4 className={styles['FieldSubGroupTitle']}>Connector Parts</h4>
      {children}
    </div>
  );
}
export default DescrConnector;