import React from 'react';

function TaskDefinition({ children, ...props }) {
  // Renders the necessary information to define a planned maintenance task.
  // Based on the S1000D schema, this is a major container for <task>, <preliminaryRqmts>,
  // <equipGroup>, <limit>, and other task-related information.
  
  const style = {
    padding: '16px',
    margin: '1em 0',
    border: '1px solid #64748b',
    borderRadius: '5px',
  };

  return (
    <section className="task-definition" style={style} {...props}>
      <h3>Task Definition: {props.taskIdent}</h3>
      {children}
    </section>
  );
}

export default TaskDefinition;