import React from 'react';

/**
 * Component for the S1000D <lcProject> element.
 * 
 * Contains administrative information about the learning plan project. This is
 * a high-level container at the start of a Learning Plan.
 * 
 * Parent: <LearningPlan>
 * Children: <title>, <description>, <lcClient>, <lcLearningPlan>, etc.
 */
export default function LcProject({ children }) {
  return (
    <section className="p-4 my-4 bg-gray-100 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Information</h2>
      {children}
    </section>
  );
}