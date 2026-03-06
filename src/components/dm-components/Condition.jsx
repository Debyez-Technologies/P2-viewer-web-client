import styles from '../../utils/styleMap.json'

function Condition({ children, ...props }) {
  // Renders a block describing the steps to replicate an identified indication
  // or condition. The `conditionType` prop ("normal" or "abnormal") can be used for styling.
  // Based on the S1000D schema, its children can be <Para>, <Note>, <Table>, or <Figure>.
  
    const styleClass = styles["Condition"]
  return (
    <div className={styleClass} {...props}>
      <strong style={{ color: props.conditionType === 'abnormal' ? '#f59e0b' : '#38bdf8', display: 'block', marginBottom: '8px' }}>
        Condition: {props.conditionType || 'Normal'}
      </strong>
      {children}
    </div>
  );
}

export default Condition;