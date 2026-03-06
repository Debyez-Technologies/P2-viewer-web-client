import React from 'react';

/**
 * Component for the S1000D <learningContent> element.
 * 
 * Contains the main instructional content for a learning objective.
 * 
 * Parent: <LearningContainer>
 * Children: <title>, <description>, <LcInstruction>
 */
export default function LearningContent({ children }) {
  return (
    <article className="space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-2">Learning Content</h1>
      <div className="prose max-w-none">
        {children}
      </div>
    </article>
  );
}