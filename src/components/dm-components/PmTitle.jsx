import styles from '../../utils/styleMap.json';

function PmTitle({ children, ...props }) {
  const styleClass = styles['PmTitle'];
  // Using an h1 for the primary title of the publication
  return (
    <h1 className={styleClass} {...props}>
      {children}
    </h1>
  );
}

export default PmTitle;