import React from 'react';

function RemarksList({ children, ...props }) {
  // Renders a list of remarks pertinent to maintenance functions.
  // Based on the S1000D schema, it contains a <title> and <remarksGroup>(s).
  
  const style = {
    marginTop: '1.5em',
  };

  return (
    <div className="remarks-list" style={style} {...props}>
      {children}
    </div>
  );
}

export default RemarksList;