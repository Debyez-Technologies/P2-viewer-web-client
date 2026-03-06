// src/components/SupplyDescrGroup.jsx
import styles from '../../utils/styleMap.json';

function SupplyDescrGroup({ children, ...props }) {
  const styleClass = styles['SupplyDescrGroup'];
  return (
    <div className={styleClass} {...props}>
      {children}
    </div>
  );
}

export default SupplyDescrGroup;