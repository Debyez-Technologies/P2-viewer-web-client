// src/components/ReqQuantity.jsx
import styles from '../../utils/styleMap.json';

function ReqQuantity({ children, ...props }) {
  return (
    <span className={styles['EquipQuantityBadge']} {...props}>
      {children}
    </span>
  );
}
ReqQuantity.componentType = 'ReqQuantity';
export default ReqQuantity;