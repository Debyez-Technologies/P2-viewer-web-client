// src/components/MainProcedure.jsx
import styles from '../../utils/styleMap.json';

function MainProcedure({ children, ...props }) {
  return (
    <div className={styles['MainProcedure']} {...props}>
        <div className='text-center text-2xl font-bold'>Main Procedure</div>
      {children}
    </div>
  );
}
export default MainProcedure;