// Warning.jsx

function Warning({ children, ...props }) {
  const definition = "ANY OPERATING PROCEDURE, PRACTICE, OR CONDITION WHICH, IF NOT STRICTLY COMPLIED WITH, MAY RESULT IN PERSONAL INJURY OR LOSS OF LIFE.";
  const stripeStyle = "bg-[repeating-linear-gradient(135deg,_#ef4444,_#ef4444_15px,_#ffffff_15px,_#ffffff_30px)]";

  return (
    <div className={`p-2 my-4 ${stripeStyle}`} {...props}>
      <div className="bg-white border-2 border-black p-4">
        <h2 className="text-xl font-bold text-center mb-2 text-red-500">WARNING</h2>
        <p className="font-semibold text-center mb-4 text-sm">{definition}</p>
        <div className="text-left border-t border-gray-300 pt-2 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Warning;