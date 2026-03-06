import styles from '../../utils/styleMap.json'

function Emphasis({ children, ...props }) {
  // Renders emphasized (italic) text.
  // A generic inline element containing text.
  const styleClass = styles["Emphasis"]
  return <em className={styleClass}{...props}>{children}</em>;
}

export default Emphasis;