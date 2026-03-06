import React from 'react';

// A map to create human-readable titles from the S1000D tag name.
const titleMap = {
  lcAbilities: 'Abilities',
  lcAccessibility: 'Accessibility',
  lcActualPerformanceStatement: 'Actual Performance',
  lcAge: 'Age Demographics',
  lcAttitude: 'Attitude',
  lcAttitudeTowardContent: 'Attitude Toward Content',
  lcBrowsers: 'Browser Requirements',
  lcCapacity: 'Performer Capacity',
  lcClassroom: 'Classroom Requirements',
  lcClient: 'Client',
  lcCourseIdentNumber: 'Course Identification Number',
  lcCurrentEntryBehaviors: 'Current Entry Behaviors',
  lcData: 'Data Factors',
  lcDeliveryDate: 'Delivery Date',
  lcDesiredPerformanceStatement: 'Desired Performance',
  lcDownloadTime: 'Download Time',
  lcEducationLevel: 'Education Level',
  lcEntryBehavior: 'Entry Behavior',
  lcFileSizeLimitations: 'File Size Limitations',
  lcFormativeEvaluation: 'Formative Evaluation',
  lcGapStatement: 'Gap Statement',
  lcGoalStatement: 'Goal Statement',
  lcGraphicStandards: 'Graphic Standards',
  lcHumanResourceDevelopment: 'Human Resource Development',
  lcImmediatePerformanceCompetence: 'Immediate Performance Competence',
  lcIncentives: 'Incentives',
  lcInstruction: 'Instruction',
  lcInterventionImplementation: 'Intervention Implementation',
  lcIntro: 'Introduction',
  lcJobCode: 'Job Code',
  lcJobDesign: 'Job Design',
  lcJobTitle: 'Job Title',
  lcJobTransfer: 'Job Transfer Evaluation',
  lcJtaItem: 'Job Task Analysis Item',
  lcKnowledge: 'Knowledge',
  lcLearningPlan: 'Learning Plan Details',
  lcLearningPreferences: 'Learning Preferences',
  lcLearningStrategy: 'Learning Strategy',
  lcLms: 'LMS Requirements',
  lcLocalCultureConsiderations: 'Local Culture Considerations',
  lcManagerialSupport: 'Managerial Support',
  lcMasteryScoreCriteria: 'Mastery Score Criteria',
  lcMinimumPassThreshold: 'Minimum Pass Threshold',
  lcMissionStatement: 'Mission Statement',
  lcModificationDate: 'Modification Date',
  lcMotives: 'Performer Motives',
  lcNextSteps: 'Next Steps',
  lcNonLmsItEnvironment: 'Non-LMS IT Environment',
  lcObjectiveStatement: 'Objective Statement',
  lcOjt: 'On-the-Job Training (OJT)',
  lcOrganizationalEnvironmentAnalysis: 'Organizational Environment Analysis',
  lcOrganizationalImpact: 'Organizational Impact Evaluation',
  lcPaperBasedMaterials: 'Paper-Based Materials',
  lcPerformanceRubric: 'Performance Rubric',
  lcPerformanceSupport: 'Performance Support',
  lcPersonalDevelopment: 'Personal Development',
  lcPhysicalAspectsOfSite: 'Physical Aspects of Site',
  lcPlanObjective: 'Plan Objective',
  lcPlanSubject: 'Plan Subject',
  lcPlayers: 'Media Players',
  lcPrerequisites: 'Prerequisites',
  lcProfessionalBackground: 'Professional Background',
  lcRequiredEntryBehaviors: 'Required Entry Behaviors',
  lcRequiredEquipment: 'Required Equipment',
  lcRequiredFacilities: 'Required Facilities',
  lcRequiredFinances: 'Required Finances',
  lcRequiredPersonnel: 'Required Personnel',
  lcResolution: 'Screen Resolution',
  lcResources: 'Resources',
  lcReview: 'Review',
  lcScoringMethod: 'Scoring Method',
  lcSecurity: 'Security Requirements',
  lcSkills: 'Skills',
  lcSocialAspectsOfSite: 'Social Aspects of Site',
  lcSpecialFactors: 'Special Factors',
  lcSummary: 'Summary',
  lcTime: 'Time',
  lcTrainingType: 'Training Type',
  lcValues: 'Organizational Values',
  lcViewers: 'Media Viewers',
  lcVisionStatement: 'Vision Statement',
  // Add other mappings as needed
};

/**
 * A reusable component for rendering a generic titled section within a
 * learning data module. It derives its title from the S1000D element name.
 * 
 * @param {object} props
 * @param {string} props.name - The original S1000D tag name (e.g., 'lcAbilities').
 * @param {React.ReactNode} props.children - The child components to render,
 *   which can include <title> and <description>.
 */
export default function LcSection({ name, children }) {
  const title = titleMap[name] || name;

  // The direct child is often <description>, which becomes a TextBlock/para.
  // Sometimes it's <title> and <description>. This generic component just wraps.
  return (
    <section className="my-4">
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <div className="mt-2 pl-4 border-l-2 border-gray-200 prose prose-sm max-w-none">
        {children}
      </div>
    </section>
  );
}