// src/components/Remarks.jsx
import styles from '../../utils/styleMap.json';

function Remarks({ children, ...props }) {
  return (
    <div className={styles['Remarks']} {...props}>
      {children}
    </div>
  );
}
Remarks.componentType = 'Remarks';
export default Remarks;