import styles from '../../utils/styleMap.json';

function ShortPmTitle({ children, ...props }) {
  const styleClass = styles['ShortPmTitle'];
  // Using an h2 for the subtitle
  return (
    <h2 className={styleClass} {...props}>
      {children}
    </h2>
  );
}

export default ShortPmTitle;