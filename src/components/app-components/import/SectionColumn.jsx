import React, { useState } from 'react';
import { useImportStore } from '../../../store/import-store';
import SectionItem from './SectionItem';

const SectionColumn = () => {

  const sections = useImportStore((state) => state.sections)
  const addSection = useImportStore((state) => state.addSection)
  const [newSectionName, setNewSectionName] = useState('');

  const handleAddSection = () => {
    addSection(newSectionName);
    setNewSectionName('');
  };

  return (
    <div className="flex flex-col border border-gray-300 rounded-md p-4 bg-gray-50 overflow-hidden">
      <h3 className="font-bold mb-2 flex-shrink-0">Publication Groups</h3>
      <div className="flex mb-4 flex-shrink-0">
        <input
          type="text"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          placeholder="New group name..."
          className="flex-grow px-2 py-1 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
        />
        <button onClick={handleAddSection} className="px-3 py-1 bg-gray-600 text-white rounded-r-md hover:bg-gray-700">Add</button>
      </div>
      <div className="flex-grow overflow-y-auto space-y-4 pr-2">
        {sections.map((section) => (
          // Pass the section data to the new component
          <SectionItem key={section.id} section={section} />
        ))}
        {sections.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p>Create a group to begin organizing chapters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionColumn;