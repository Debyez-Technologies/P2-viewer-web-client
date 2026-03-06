import React from 'react';

// A map to create human-readable titles from the S1000D tag name.
const titleMap = {
  sbRevisionInfo: 'Revision Information',
  sbSummary: 'Summary',
  sbPlanningInfo: 'Planning Information',
  sbAdditionalInfo: 'Additional Information',
};

/**
 * A reusable component for rendering a generic titled section within a
 * Service Bulletin. It derives its title from the S1000D element name.
 * 
 * This component is used for:
 * - <sbRevisionInfo>
 * - <sbSummary>
 * - <sbPlanningInfo>
 * - <sbAdditionalInfo>
 * 
 * @param {object} props
 * @param {string} props.name - The original S1000D tag name (e.g., 'sbSummary').
 * @param {React.ReactNode} props.children - The child components, typically <SbTopic> or <para>.
 */
export default function SbSection({ name, children }) {
  const title = titleMap[name] || name;

  return (
    <section className="p-4 my-4 border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}