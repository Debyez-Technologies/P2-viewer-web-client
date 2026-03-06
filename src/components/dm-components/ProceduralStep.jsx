// src/components/ProceduralStep.jsx
import styles from '../../utils/styleMap.json';

function ProceduralStep({ children, ...props }) {
  return (
    <div className={styles['ProceduralStep']} {...props}>
      {/* 
        The classes are now written directly here.
        This ensures Tailwind's JIT compiler will see them and generate the required CSS.
      */}
      {/* <div 
        className="absolute left-[-9px] top-4 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-white"
      ></div> */}

      {/* The rest of the step content */}
      <div className={styles['ProceduralStepContent']}>
        {children}
      </div>
    </div>
  );
}
export default ProceduralStep;