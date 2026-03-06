// src/components/ReqCond.jsx
import styles from '../../utils/styleMap.json';

function ReqCond({ children, ...props }) {
  // We use a div instead of a p here to avoid potential div > p nesting issues from the parser.
  return (
    <div className={styles['ReqCond']} {...props}>
      {children}
    </div>
  );
}
export default ReqCond;