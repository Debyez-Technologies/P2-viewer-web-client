// import styles from '../../utils/styleMap.json'

// function PreliminaryRqmts({ children, ...props }) {
//   // A container for the preliminary requirements section of a procedure.
//   // Based on the schema, children are components like <ReqSupportEquips>, <ReqSpares>, etc.
//   const styleClass = styles["PreliminaryRqmts"]
// "PreliminaryRqmts": "my-6 p-4 bg-slate-50 rounded-lg border border-slate-200",
//   return (
//     <div className={styleClass}>
//         <h2 className='text-lg font-bold text-slate-800 mb-4 pb-2 border-b'>Preliminary Requirements</h2>
//         <section className='pl-3'{...props}>{children}</section>
//     </div>
//     )
// }

// export default PreliminaryRqmts;
// src/components/PreliminaryRqmts.jsx
import styles from '../../utils/styleMap.json';

function PreliminaryRqmts({ children, ...props }) {
  return (
    <div className={styles['PreliminaryRqmts']} {...props}>
      <h2 className={styles['PreliminaryRqmtsHeading']}>Preliminary Requirements</h2>
      <div className='pl-4'>
        {children}
      </div>
    </div>
  );
}
export default PreliminaryRqmts;