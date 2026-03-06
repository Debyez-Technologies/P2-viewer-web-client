import { useImportStore } from '../../../store/import-store';
import Modal from '../../ui-components/Modal';
import ZipUpload from './ZipUpload';
import Validation from './Validation';
import Configuration from './Configuration';
import ImportFinalStatus from './ImportFinal';
import ValidationReportModal from '../validation/ValidationReportModal';

const stepTitles = {
  uploading: 'Upload Publication',
  validation: 'Validate Publication',
  viewingReport: 'Validation Report',
  configDetails: 'Project Configuration',
  configSplitting: 'Arrange Content',
  saving: 'Saving...',
  savenoConfig: 'Saving without Complete Configuration',
  success: 'Import Complete',
  error: 'An Error Occurred',
};

const ImportWizard = () => {
  const importStep = useImportStore((state) => state.importStep);
  const closeWizard = useImportStore((state) => state.closeWizard);

  if (importStep === 'idle') {
    return null;
  }

  if (importStep === 'viewingReport') {
    return <ValidationReportModal />;
  }

  const title = stepTitles[importStep] || 'Import Publication';

  const renderStep = () => {
    switch (importStep) {
      case 'uploading':
        return <ZipUpload onClose={closeWizard} />;
      case 'validation':
        return <Validation />;
      case 'configDetails':
      case 'configSplitting':
        return <Configuration />;
      case 'saving':
      case 'savenoConfig':
      case 'success':
      case 'error':
        return <ImportFinalStatus />;
      default:
        return null;
    }
  };

  return (
    <Modal title={title} onClose={closeWizard}>
      {renderStep()}
    </Modal>
  );
};

export default ImportWizard;