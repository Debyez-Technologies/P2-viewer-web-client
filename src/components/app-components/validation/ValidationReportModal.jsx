import React from 'react';
import {useImportStore} from '../../../store/import-store';
import ValidationReportView from './ValidationReportView'; // The view component

const ValidationReportModal = () => {
    // The wizard controls visibility, so we just render the content.
    const closeWizard = useImportStore((state) => state.closeWizard);

    return (
        // Note: I'm using your styling from the provided component
        <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white text-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h2 className="text-xl font-bold">Validation Report</h2>
                    <button onClick={closeWizard} className="text-2xl hover:text-gray-600">&times;</button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <ValidationReportView />
                </div>
            </div>
        </div>
    );
};

export default ValidationReportModal;