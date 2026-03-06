// src/components/PartRef.jsx
import styles from '../../utils/styleMap.json';

function PartRef({ children, partNumberValue, ...props }) {
  return (
    <div {...props}>
      <div className={styles['CatalogPartNumber']}>{partNumberValue}</div>
      {/* This will now correctly render any nested <refs> or <dmRef> components */}
      <div className="mt-1">{children}</div>
    </div>
  );
}
PartRef.componentType = 'PartRef';
export default PartRef;