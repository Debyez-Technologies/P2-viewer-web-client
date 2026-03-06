import React from 'react';
import {useImportStore} from '../../../store/import-store';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import ModuleItem from './ModuleItem';

const UnassignedColumn = () => {
  const dataModules = useImportStore(state => state.dataModules);

  return (
    <div className="flex flex-col overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50">
      <h3 className="font-bold mb-2">Unassigned Chapters ({dataModules.length})</h3>
      <Droppable droppableId="unassigned">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-grow overflow-y-auto p-2 rounded-md transition-colors ${snapshot.isDraggingOver ? 'bg-green-100' : ''}`}
          >
            {dataModules.map((module, index) => (
              <Draggable key={module.key} draggableId={module.key} index={index}>
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
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default UnassignedColumn;