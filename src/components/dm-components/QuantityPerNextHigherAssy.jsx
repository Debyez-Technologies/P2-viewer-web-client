// src/components/QuantityPerNextHigherAssy.jsx
import styles from '../../utils/styleMap.json';
function QuantityPerNextHigherAssy({ children }) {
  return <div className={styles['CatalogQuantity']}>{children}</div>;
}
QuantityPerNextHigherAssy.componentType = 'QuantityPerNextHigherAssy';
export default QuantityPerNextHigherAssy;