import React from 'react';

function MenuChoice({ children, ...props }) {
  // Renders a single choice within a menu.
  // Based on the S1000D schema, it contains a <prompt> (the choice's text)
  // and can trigger other actions like showing another <dialog>.
  
  const style = {
    display: 'block',
    margin: '8px 0',
  };

  return (
    <div className="menu-choice" style={style} {...props}>
      <label>
        <input type="radio" name="menu-group" />
        {/* Children will be the <prompt> (TextBlock) for this choice */}
        <span style={{ marginLeft: '8px' }}>{children}</span>
      </label>
    </div>
  );
}

export default MenuChoice;