// src/components/DescrForPart.jsx
import styles from '../../utils/styleMap.json';
function DescrForPart({ children }) {
  return <div className={styles['CatalogDescription']}>{children}</div>;
}
DescrForPart.componentType = 'DescrForPart';
export default DescrForPart;