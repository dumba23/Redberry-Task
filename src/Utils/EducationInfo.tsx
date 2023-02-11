import React, { useEffect, useState } from 'react';
import { DegreeDataObject, EducationFormDataObject } from '../Types/education.types';

const ExperienceInfo = ({ institute, degree_id, due_date, description, degree }: EducationFormDataObject) => {
  const [degreeData, setDegreeData] = useState<Array<DegreeDataObject>>([{ id: 0, title: '' }]);

  useEffect(() => {
    fetch('https://resume.redberryinternship.ge/api/degrees')
      .then((response) => response.json())
      .then((data) => setDegreeData(data));
  }, []);

  return (
    <div className="flex w-[80%] mt-4 flex-col">
      {institute !== '' && (
        <div className="font-medium text-base text-[#1A1A1A]">
          <>{institute + ', '}</>
          <>{degree_id !== 0 ? degreeData[degree_id - 1] && degreeData[degree_id - 1].title : degree}</>
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
