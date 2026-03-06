// src/components/DescrStandardPartGroup.jsx
import styles from '../../utils/styleMap.json';

function DescrStandardPartGroup({ children, ...props }) {
  return (
    <section className={styles['FieldSection']} {...props}>
      <h3 className={styles['FieldSectionTitle']}>Standard Part Fields</h3>
      {children}
    </section>
  );
}
export default DescrStandardPartGroup;