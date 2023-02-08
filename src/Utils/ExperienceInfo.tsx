import React from 'react';

const ExperienceInfo = ({
  position,
  employer,
  start_date,
  due_date,
  description,
}: {
  position: string;
  employer: string;
  start_date: string;
  due_date: string;
  description: string;
}) => {
  return (
    <div className="flex w-[80%] mt-4 flex-col">
      {position !== '' && employer !== '' && (
        <div className="font-medium text-base text-[#1A1A1A]">
          {position + ', '}
          {employer}
        </div>
      )}

      {start_date !== '' && due_date !== '' && (
        <div className="text-[#909090] text-base font-normal italic">
          {start_date.replace(/[/]/g, '-') + ' - '}
          {due_date.replace(/[/]/g, '-')}
        </div>
      )}
      <div className="text-[#000000] text-base font-normal">{description !== '' && description}</div>
    </div>
  );
};

export default ExperienceInfo;
