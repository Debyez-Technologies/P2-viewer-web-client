import React, { useState } from 'react';
import { useImportStore } from '../../../store/import-store';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { FaChevronDown, FaChevronRight, FaEdit, FaCheck } from "react-icons/fa";
import ModuleItem from './ModuleItem';

const SectionItem = ({ section }) => {

  const toggleSectionCollapse = useImportStore((state) => state.toggleSectionCollapse)
  const editSectionName = useImportStore((state) => state.editSectionName)

  // Local state to manage "edit mode" for the title
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(section.name);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSaveName = () => {
    editSectionName(section.id, editedName);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveName();
    }
  };

  return (
    <Droppable key={section.id} droppableId={section.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`p-2 rounded-md transition-all duration-300 ${snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-white'} border`}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 flex-grow">
              <button
                onClick={() => toggleSectionCollapse(section.id)}
                className="p-1 hover:bg-gray-200 rounded-full"
                title={section.isCollapsed ? 'Expand' : 'Collapse'}
              >
                {section.isCollapsed ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
              </button>

              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={handleNameChange}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSaveName} // Save when input loses focus
                  className="font-semibold text-md text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                  autoFocus
                />
              ) : (
                <h4
                  className="font-semibold text-md text-gray-800 cursor-pointer"
                  onDoubleClick={() => setIsEditing(true)}
                  title={section.name}
                >
                  {section.name}
                </h4>
              )}
            </div>

            {isEditing ? (
              <button onClick={handleSaveName} className="p-1 text-green-500 hover:bg-green-100 rounded-full">
                <FaCheck />
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="p-1 text-gray-400 hover:bg-gray-200 rounded-full">
                <FaEdit size={14} />
              </button>
            )}
          </div>

          {/* Collapsible Content Area */}
          {!section.isCollapsed && (
            <div className="pl-6 pt-1 border-l-2 border-gray-200 ml-3">
              {section.modules.map((module, moduleIndex) => (
                <Draggable key={module.key} draggableId={module.key} index={moduleIndex}>
                  {(provided) => (
                    <ModuleItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      title={module.title}
                      dmKey={module.key}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {section.modules.length === 0 && (
                <div className="text-xs text-center text-gray-400 py-4">
                  Drop chapters here
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default SectionItem;