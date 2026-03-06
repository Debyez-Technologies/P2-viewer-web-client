import React from 'react';

function TaskItem({ children, ...props }) {
  // Renders an individual task that belongs to an inspection.
  // Based on the S1000D schema, it contains <refs> and a <task>.
  
  const style = {
    padding: '8px 0',
    borderTop: '1px solid #334155',
  };

  return (
    <div className="task-item" style={style} {...props}>
      <strong>{props.taskSeqNumber}. {props.taskName}</strong>
      <div style={{ marginLeft: '20px' }}>
        {children}
      </div>
    </div>
  );
}

export default TaskItem;