import styles from '../../utils/styleMap.json'


function Multimedia({ children, ...props }) {
  // A container for a multimedia object.
  // Based on the S1000D schema, it contains a <MultimediaObject> component as a child.
  const styleClass = styles["Multimedia"]
  return <div className={styleClass} {...props}>{children}</div>;
}

export default Multimedia;