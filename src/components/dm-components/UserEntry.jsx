import React from 'react';

function UserEntry({ children, ...props }) {
  // Renders a field for user data input.
  // Based on the S1000D schema, it contains a <prompt> (the label for the input)
  // and references the variable it will update.
  
  const style = {
    margin: '12px 0',
  };

  return (
    <div className="user-entry" style={style} {...props}>
      {/* The first child is usually the <prompt> (label), the rest are metadata. */}
      <label>
        {React.Children.toArray(children)[0]}
        <input type="text" style={{ marginLeft: '10px', background: '#e0e7ff', color: '#1e1b4b' }} />
      </label>
    </div>
  );
}

export default UserEntry;