// src/components/CheckListInfo.jsx
import styles from '../../utils/styleMap.json';

function CheckListInfo({ children, ...props }) {
  return (
    <div className={styles['CheckListInfo']} {...props}>
      {children}
    </div>
  );
}
export default CheckListInfo;