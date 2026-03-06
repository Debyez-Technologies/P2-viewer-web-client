import React, { useState } from 'react';
import { useImportStore } from '../../../store/import-store';
import { DragDropContext } from '@hello-pangea/dnd';
import Spinner from '../../ui-components/Spinner';
import SectionColumn from './SectionColumn'; // New sub-component
import UnassignedColumn from './UnassignedColumn'; // New sub-component

const ConfigGroup = () => {

  const handleDragEnd = useImportStore((state) => state.handleDragEnd)
  const saveSections = useImportStore((state) => state.saveSections)
  const skipConfiguration = useImportStore((state) => state.skipConfiguration)
  const isLoading = useImportStore((state) => state.isLoading)
  const dataModules = useImportStore((state) => state.dataModules)

  // The "Finish" button is only enabled when all modules are assigned.
  const isSaveDisabled = isLoading || dataModules.length > 0;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2 gap-6 h-[60vh]">
        <SectionColumn />
        <UnassignedColumn />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-end pt-4">
        <button
          onClick={skipConfiguration}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
        >
          Skip Configuration
        </button>
        <button
          onClick={saveSections}
          disabled={isSaveDisabled}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          title={isSaveDisabled ? 'All modules must be assigned to a section' : 'Finish Import'}
        >
          {isLoading ? <Spinner /> : 'Finish Import'}
        </button>
      </div>
    </DragDropContext>
  );
};

export default ConfigGroup;