// src/components/DescrElectricalEquip.jsx
import styles from '../../utils/styleMap.json';

function DescrElectricalEquip({ children, ...props }) {
  return (
    <section className={styles['FieldSection']} {...props}>
      <h3 className={styles['FieldSectionTitle']}>Electrical Equipment Fields</h3>
      {children}
    </section>
  );
}
export default DescrElectricalEquip;