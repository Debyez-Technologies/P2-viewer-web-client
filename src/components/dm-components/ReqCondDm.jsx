// src/components/ReqCondDm.jsx
import styles from '../../utils/styleMap.json';

function ReqCondDm({ children, ...props }) {
  return (
    <div className={styles['ReqCondDm']} {...props}>
      {children}
    </div>
  );
}
export default ReqCondDm;