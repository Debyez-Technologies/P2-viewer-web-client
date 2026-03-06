// src/components/SupportEquipDescrGroup.jsx
import styles from '../../utils/styleMap.json';

function SupportEquipDescrGroup({ children, ...props }) {
  const styleClass = styles['SupportEquipDescrGroup'];
  return (
    <div className={styleClass} {...props}>
      {children}
    </div>
  );
}

export default SupportEquipDescrGroup;