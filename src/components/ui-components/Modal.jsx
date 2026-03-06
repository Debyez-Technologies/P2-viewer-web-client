
const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
       <div className="flex w-full flex-col gap-3 p-5">
         <div className="flex justify-between items-center">
          <h2 className="text-xl">{title}</h2>
          <button onClick={onClose} className="hover:text-gray-800">&times;</button>
        </div>
        <div className="border-b w-full"></div>
       </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal