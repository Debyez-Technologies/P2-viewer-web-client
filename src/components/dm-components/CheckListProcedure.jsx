// src/components/CheckListProcedure.jsx
import styles from '../../utils/styleMap.json';

function CheckListProcedure({ children, ...props }) {
  return (
    <div className={styles['CheckListProcedure']} {...props}>
      <div className={styles['CheckListProcedureCheckbox']}></div>
      <div className={styles['CheckListProcedureContent']}>
        {children}
      </div>
    </div>
  );
}
// Add the static identifier
CheckListProcedure.componentType = 'CheckListProcedure';
export default CheckListProcedure;