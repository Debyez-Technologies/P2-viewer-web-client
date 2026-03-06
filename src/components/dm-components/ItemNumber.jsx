import styles from '../../utils/styleMap.json';

function ItemNumber({ children, ...props }) {
  const styleClass = styles['ItemNumber'];
  return (
    <div className={styleClass} {...props}>
      {children}
    </div>
  );
}

ItemNumber.componentType = 'ItemNumber';
export default ItemNumber;