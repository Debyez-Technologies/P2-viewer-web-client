// src/components/WiringFields.jsx
import styles from '../../utils/styleMap.json';

function WiringFields({ children, ...props }) {
  return (
    <div className={styles['WiringFields']} {...props}>
      <h2 className={styles['WiringFieldsTitle']}>Wiring Data Field Descriptions</h2>
      {children}
    </div>
  );
}
export default WiringFields;