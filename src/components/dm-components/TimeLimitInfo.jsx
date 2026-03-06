import React from 'react';

function TimeLimitInfo({ children, ...props }) {
  // Renders information about time limits, periodicities, and life details for equipment.
  // Based on the S1000D schema, it contains <equipGroup>, <timeLimitCategory>, and <timeLimit>.
  
  const style = {
    padding: '16px',
    margin: '1em 0',
    border: '1px solid #be123c',
    backgroundColor: '#4c1d29',
    borderRadius: '5px',
  };

  return (
    <section className="time-limit-info" style={style} {...props}>
      <h4>Time Limit: {props.timeLimitIdent}</h4>
      {children}
    </section>
  );
}

export default TimeLimitInfo;