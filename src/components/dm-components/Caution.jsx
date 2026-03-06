// Caution.jsx
import React from 'react';

function Caution({ children, ...props }) {
  const definition = "ANY OPERATING PROCEDURE, PRACTICE, OR CONDITION WHICH, IF NOT STRICTLY COMPLIED WITH, MAY RESULT IN DAMAGE TO THE EQUIPMENT.";
  const stripeStyle = "bg-[repeating-linear-gradient(135deg,_#eab308,_#eab308_15px,_#000000_15px,_#000000_30px)]";
  
  return (
    <div className={`p-2 my-4 ${stripeStyle}`} {...props}>
      <div className="bg-white border-2 border-black p-4">
        <h2 className="text-xl font-bold text-center mb-2 text-yellow-600">CAUTION</h2>
        <p className="font-semibold text-center mb-4 text-sm">{definition}</p>
        <div className="text-left border-t border-gray-300 pt-2 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Caution;