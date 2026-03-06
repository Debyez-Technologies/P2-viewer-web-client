// src/components/CloseRqmts.jsx
import styles from '../../utils/styleMap.json';

function CloseRqmts({ children, ...props }) {
  return (
    <div className={styles['CloseRqmts']} {...props}>
      <div className={styles['CloseRqmtsHeader']}>
        {/* Icon for visual flair */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles['CloseRqmtsIcon']}>
          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
        </svg> */}
        <h3 className={styles['CloseRqmtsTitle']}>Closing Requirements</h3>
      </div>
      <div className={styles['CloseRqmtsContent']}>
        {children}
      </div>
    </div>
  );
}
export default CloseRqmts;