import React from 'react';

/**
 * Component for the S1000D <lcDuration> element.
 * 
 * Displays the estimated duration of a learning activity.
 * 
 * Parent: <LearningOverview>, <LearningAssessment>, <LcTrainingComponent>
 * Children: <title>, <LcTime>
 */
export default function LcDuration({ children }) {
  return (
    <div className="my-2">
      {children}
    </div>
  );
}