// Danger.jsx
import React from 'react';

function Danger({ children, ...props }) {
  const stripeStyle = "bg-[repeating-linear-gradient(135deg,_#dc2626,_#dc2626_15px,_#000000_15px,_#000000_30px)]";

  return (
    <div className={`p-2 my-4 ${stripeStyle}`} {...props}>
      <div className="bg-white border-2 border-black p-4">
        <h2 className="text-xl font-bold text-center mb-2 text-red-600">DANGER</h2>
        <div className="text-left space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Danger;