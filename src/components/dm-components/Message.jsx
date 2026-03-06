import React from 'react';

function Message({ children, ...props }) {
  // Renders an informational message from the IETP to the user.
  // Based on the S1000D schema, it contains a <title> and a <prompt>.
  
  const style = {
    padding: '12px',
    backgroundColor: '#1e40af',
    border: '1px solid #3b82f6',
    borderRadius: '4px',
    color: '#eff6ff',
  };

  return (
    <div className="message" style={style} {...props}>
      {children}
    </div>
  );
}

export default Message;