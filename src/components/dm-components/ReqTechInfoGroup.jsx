import styles from '../../utils/styleMap.json'

function ReqTechInfoGroup({ children, ...props }) {
  // A container for required technical information.
  // Based on the schema, it will contain references like <DmRef> as children.
  const styleClass = styles["ReqTechInfoGroup"]
  return <div className={styleClass} {...props}>{children}</div>;
}

export default ReqTechInfoGroup;