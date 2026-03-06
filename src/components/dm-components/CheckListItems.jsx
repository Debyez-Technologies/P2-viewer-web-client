// src/components/CheckListItems.jsx
import styles from '../../utils/styleMap.json';

function CheckListItems({ children, ...props }) {
  return (
    <div className={styles['CheckListItems']} {...props}>
      {children}
    </div>
  );
}
export default CheckListItems;