import styles from '../../utils/styleMap.json'

function IsolationStepAnswer({ children, ...props }) {
  // Renders the answer section of an isolation step.
  // Based on the S1000D schema, it contains either a <yesNoAnswer> (structural)
  // or a <listOfChoices>.
  const styleClass = styles["IsolationStepAnswer"]
  return (
    <div className={styleClass} {...props}>
      {children}
    </div>
  );
}

export default IsolationStepAnswer;