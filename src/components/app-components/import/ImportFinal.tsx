import React from 'react';
import { useImportStore } from '../../../store/import-store';
import Spinner from '../../ui-components/Spinner';
import { CircleCheckBig, CircleX } from 'lucide-react';

const ImportFinalStatus = () => {
  const importStep = useImportStore((state) => state.importStep);
  const error = useImportStore((state) => state.error);
  const isLoading = useImportStore((state) => state.isLoading);
  const closeWizard = useImportStore((state) => state.closeWizard);

  if (isLoading || importStep === 'saving') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spinner />
        <p className="mt-4 text-gray-600">
          Processing your request...
        </p>
      </div>
    );
  }

  if (importStep === 'error') {
    return (
      <div className="flex flex-col p-4 justify-center items-center">
        <h3 className="flex justify-center items-center gap-3 w-full text-lg font-semibold text-red-600">
          <CircleX />
          Import Failed
        </h3>

        <p className="mt-4 text-sm text-red-700 bg-red-100 p-3 rounded-md text-center max-w-md">
          {error}
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={closeWizard}
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (importStep === 'savenoConfig') {
    return (
      <div className="flex flex-col p-4 justify-center items-center">
        <h3 className="flex justify-center items-center gap-3 w-full text-lg font-semibold text-green-600">
          <CircleCheckBig />
          Success!
        </h3>

        <p className="mt-2 text-gray-600 text-center">
          The publication has been imported with pending configuration.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={closeWizard}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  if (importStep === 'success') {
    return (
      <div className="flex flex-col p-4 justify-center items-center">
        <h3 className="flex justify-center gap-3 w-full text-lg font-semibold text-viewer-core">
          <CircleCheckBig />
          Success!
        </h3>

        <p className="mt-2 text-gray-600 text-center">
          The publication has been imported and configured successfully.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={closeWizard}
            className="px-4 py-2 bg-viewer-core text-white rounded-md"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ImportFinalStatus;