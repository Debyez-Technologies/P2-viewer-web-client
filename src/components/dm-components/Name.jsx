// src/components/Name.jsx
import styles from '../../utils/styleMap.json';

function Name({ children, ...props }) {
  return (
    <span className={styles['EquipName']} {...props}>
      {children}
    </span>
  );
}
Name.componentType = 'Name';
export default Name;