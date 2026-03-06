import React from 'react';

function PushButton({ children, ...props }) {
  // Renders a push button that can trigger an external application or a secondary dialog.
  // Based on the S1000D schema, it contains a <prompt> which acts as the button's label.
  
  return (
    <button type="button" className="push-button" {...props}>
      {/* Children will be the <prompt> (TextBlock) for the button label */}
      {children}
    </button>
  );
}

export default PushButton;