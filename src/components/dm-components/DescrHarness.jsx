// src/components/DescrHarness.jsx
import styles from '../../utils/styleMap.json';

function DescrHarness({ children, ...props }) {
  return (
    <section className={styles['FieldSection']} {...props}>
      <h3 className={styles['FieldSectionTitle']}>Harness Fields</h3>
      {children}
    </section>
  );
}
export default DescrHarness;