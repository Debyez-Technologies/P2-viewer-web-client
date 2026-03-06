import React from 'react';

/**
 * Component for the S1000D <crewMember> element.
 * 
 * Identifies a single crew member by their role or type. This is typically
 * rendered as a small, descriptive tag.
 * 
 * Parent: <CrewMemberGroup>
 * Children: None
 * Attributes: crewMemberType (required)
 */
export default function CrewMember({ attributes }) {
  return (
    <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
      {attributes.crewMemberType}
    </span>
  );
}