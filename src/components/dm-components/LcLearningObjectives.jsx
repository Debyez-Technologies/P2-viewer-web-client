import React from 'react';

/**
 * Component for the S1000D <lcLearningObjectives> element.
 * 
 * Contains the learning objectives data, stating the actions, conditions,
 * and standards expected of the learner.
 * 
 * Parent: <LcInterventionDefinition>
 * Children: <title>, <description>, <LcObjectiveItemGroup>
 */
export default function LcLearningObjectives({ children }) {
  return (
    <div className="p-4 my-2 bg-white rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Learning Objectives</h3>
      {children}
    </div>
  );
}