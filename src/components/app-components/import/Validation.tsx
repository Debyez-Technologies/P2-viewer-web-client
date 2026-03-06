
import { Button } from '@/components/ui/button';
import { useImportStore } from '../../../store/import-store';
import Spinner from '../../ui-components/Spinner'
import { SkipForward } from 'lucide-react';

const Validation = () => {

  const runValidation = useImportStore((state) => state.runValidation)
  const skipValidation = useImportStore((state) => state.skipValidation)
  const isLoading = useImportStore((state) => state.isLoading)

  return (
    <div>
      <p className="text-gray-600 mb-6">Would you like to run the validation process on the uploaded data modules?</p>
      <div className="flex justify-end space-x-4">
        <Button
          onClick={skipValidation}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          <SkipForward />
          Skip
        </Button>
        <Button
          onClick={runValidation}
          disabled={isLoading}
          className="px-4 py-2 bg-viewer-core text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 flex items-center"
        >
          {isLoading ? <Spinner /> : 'Run Validation'}
        </Button>
      </div>
    </div>
  );
};

export default Validation;