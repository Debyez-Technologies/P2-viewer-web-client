// src/components/DescrWire.jsx
import styles from '../../utils/styleMap.json';

function DescrWire({ children, ...props }) {
  return (
    <section className={styles['FieldSection']} {...props}>
      <h3 className={styles['FieldSectionTitle']}>Wire Fields</h3>
      {children}
    </section>
  );
}
export default DescrWire;