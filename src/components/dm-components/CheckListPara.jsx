// src/components/CheckListPara.jsx
import styles from '../../utils/styleMap.json';

function CheckListPara({ children, ...props }) {
  return (
    <p className={styles['CheckListPara']} {...props}>
      {children}
    </p>
  );
}
export default CheckListPara;