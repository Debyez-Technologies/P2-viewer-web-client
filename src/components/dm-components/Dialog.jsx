import React from 'react';

function Dialog({ children, submitCaption, cancelCaption, ...props }) {
  // Renders an interactive dialog box to interact with the user.
  // Based on the S1000D schema, it's a container for elements like <title>,
  // <userEntry>, <menu>, <pushButton>, and <message>.
  
  const style = {
    border: '1px solid #818cf8',
    borderRadius: '8px',
    padding: '24px',
    margin: '2em 0',
    backgroundColor: '#312e81',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  const buttonContainerStyle = {
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid #4f46e5',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  };

  return (
    <div className="dialog" style={style} {...props}>
      <form>
        {children}
        <div className="dialog-buttons" style={buttonContainerStyle}>
          {cancelCaption && <button type="button">{cancelCaption}</button>}
          {submitCaption && <button type="submit">{submitCaption}</button>}
        </div>
      </form>
    </div>
  );
}

export default Dialog;