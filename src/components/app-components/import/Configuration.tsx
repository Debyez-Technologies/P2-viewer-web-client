import {useImportStore} from '../../../store/import-store';
import ConfigDetails from './ConfigDetails';

const Configuration = () => {
  const importStep = useImportStore((state) => state.importStep);

  if (importStep === 'configDetails') {
    return <ConfigDetails />;
  }

  return null;
};

export default Configuration;