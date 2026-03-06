import styles from '../../utils/styleMap.json';

function Trade({ children, ...props }) {
  const styleClass = styles['Trade'];
  return (
    <p className={styleClass} {...props}>
      {children}
    </p>
  );
}

export default Trade;