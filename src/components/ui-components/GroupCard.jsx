const GroupCard = ({ name, description, onClick }) => (
  <div onClick={onClick} 
       className="flex border-b p-3 hover:cursor-pointer">
    <div>
      <h3 className="text-xl">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);
export default GroupCard;