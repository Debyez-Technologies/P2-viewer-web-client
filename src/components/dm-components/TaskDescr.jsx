import React from 'react';

function TaskDescr({ children, ...props }) {
  // Renders the description of a task.
  // Based on the S1000D schema, it contains one or more <simplePara> elements.
  
  return (
    <div className="task-descr" {...props}>
      {children}
    </div>
  );
}

export default TaskDescr;