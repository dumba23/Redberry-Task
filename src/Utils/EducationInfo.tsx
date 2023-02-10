import React from 'react';
import { EducationFormDataObject } from '../Types/education.types';

const ExperienceInfo = ({ institute, degree_id, due_date, description }: EducationFormDataObject) => {
  return (
    <div className="flex w-[80%] mt-4 flex-col">
      {institute !== '' && degree_id !== 0 && (
        <div className="font-medium text-base text-[#1A1A1A]">
          {institute + ', '}
          {degree_id}
        </div>
      )}

      {due_date !== '' && (
        <div className="text-[#909090] text-base font-normal italic">{due_date.replace(/[/]/g, '-')}</div>
      )}
      <div className="text-[#000000] text-base font-normal">{description !== '' && description}</div>
    </div>
  );
};

export default ExperienceInfo;
