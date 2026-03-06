import styles from '../../utils/styleMap.json'

function FaultIsolationProcedure({ children, ...props }) {
  // Renders a container for a detailed fault isolation procedure.
  // Based on the S1000D schema, it contains <faultDescr>, <possibleCauseGroup>,
  // and the main <isolationProcedure>.
  const styleClass = styles["FaultIsolationProcedure"]
  return (
    <section className={styleClass} {...props}>
      {children}
    </section>
  );
}

export default FaultIsolationProcedure;