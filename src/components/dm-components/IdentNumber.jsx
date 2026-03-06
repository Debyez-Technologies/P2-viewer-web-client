// src/components/IdentNumber.jsx
import styles from '../../utils/styleMap.json';

function IdentNumber({ children, ...props }) {
  return (
    <span className={styles['IdentNumber']} {...props}>
      ID: {children}
    </span>
  );
}
IdentNumber.componentType = 'IdentNumber';
export default IdentNumber;