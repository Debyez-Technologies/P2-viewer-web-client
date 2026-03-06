import React from 'react';

function ListOfChoices({ children, ...props }) {
  // Renders a list of multiple choices as part of an isolation step answer.
  // Based on the S1000D schema, its children are <choice> elements (rendered as TextBlock).
  
  return (
    <div className="list-of-choices" {...props}>
      <strong>Choices:</strong>
      <ul>
        {React.Children.map(children, child => <li>{child}</li>)}
      </ul>
    </div>
  );
}

export default ListOfChoices;