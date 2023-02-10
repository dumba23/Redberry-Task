import React, { ChangeEvent, useState, useEffect } from 'react';
import { EducationFormDataObject, EducationErrorDataObject, DegreeDataObject } from '../Types/education.types';

import { ArrowLogo, ErrorLogo, SuccessLogo } from '../Assets';

const ExperienceForm = ({
  handleChange,
  handleClick,
  data,
  errors,
}: {
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleClick: (value: number) => void;
  data: EducationFormDataObject;
  errors: EducationErrorDataObject;
}) => {
  const [activeInput, setActiveInput] = useState<string>('');
  const [degreeData, setDegreeData] = useState<Array<DegreeDataObject>>([{ id: 0, title: '' }]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [chosenValue, setChosenValue] = useState<string>('');

  useEffect(() => {
    fetch('https://resume.redberryinternship.ge/api/degrees')
      .then((response) => response.json())
      .then((data) => setDegreeData(data));
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (value: string, id: number) => {
    setChosenValue(value);
    handleClick(id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-[80%]">
      <div className="mt-[2rem]">
        <label className="font-medium relative">
          <span
            style={{
              color: `${
                activeInput !== 'institute' && !errors.institute?.validated && errors.institute?.changed
                  ? '#EF5050'
                  : 'black'
              }`,
            }}
          >
            სასწავლებელი
          </span>
          <br />
          {activeInput !== 'institute' &&
            (!errors.institute?.validated && errors.institute?.changed ? (
              <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
            ) : (
              errors.institute?.validated && <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
            ))}
          <input
            className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
              errors.institute?.validated
                ? 'border-[#98E37E]'
                : !errors.institute?.changed
                ? 'border-[#BCBCBC]'
                : 'border-[#EF5050]'
            }`}
            onFocus={() => setActiveInput('institute')}
            onBlur={() => setActiveInput('')}
            type="text"
            name="institute"
            value={data.institute}
            placeholder="სასწავლებელი"
            onChange={handleChange}
          />
        </label>
        <div className="font-light text-sm mt-2">მინიმუმ 2 სიმბოლო</div>
      </div>
      <div className="flex justify-between">
        <div className="mt-[2rem] w-[45%]">
          <label className="font-medium relative">
            <span
              style={{
                color: `${!errors.degree_id?.validated && errors.degree_id?.changed ? '#EF5050' : 'black'}`,
              }}
            >
              ხარისხი
            </span>
            <br />
            <div
              className={`flex items-center bg-white justify-between border z-0 relative focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
                errors.degree_id?.validated
                  ? 'border-[#98E37E]'
                  : !errors.degree_id?.changed
                  ? 'border-[#BCBCBC]'
                  : 'border-[#EF5050]'
              }`}
              onFocus={() => setActiveInput('degree_id')}
              onBlur={() => setActiveInput('')}
              onClick={handleDropdownClick}
            >
              {chosenValue === '' ? (
                <span className="font-normal text-base text-[#a1a1aa]">{chosenValue === '' && 'აირჩიეთ ხარისხი'}</span>
              ) : (
                <span className="font-normal text-base text-[#000000]">{chosenValue !== '' && chosenValue}</span>
              )}

              <span>
                <img className="px-4" alt="arrow" src={ArrowLogo} />
              </span>
            </div>
            <div className="absolute bg-white w-[100%] z-10">
              {isDropdownOpen &&
                degreeData.map((item) => {
                  return (
                    <div
                      className="flex py-2 items-center justify-between"
                      key={item.id}
                      onClick={() => handleDropdownItemClick(item.title, item.id)}
                    >
                      <span className="px-4 text-[#1A1A1A] font-normal text-base">{item.title}</span>
                    </div>
                  );
                })}
            </div>
          </label>
        </div>
        <div className="mt-[2rem] w-[45%]">
          <label className="font-medium relative">
            <span
              style={{
                color: `${
                  activeInput !== 'due_date' && !errors.due_date?.validated && errors.due_date?.changed
                    ? '#EF5050'
                    : 'black'
                }`,
              }}
            >
              დამთავრების თარიღი
            </span>
            <br />
            <input
              className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
                errors.due_date?.validated
                  ? 'border-[#98E37E]'
                  : !errors.due_date?.changed
                  ? 'border-[#BCBCBC]'
                  : 'border-[#EF5050]'
              }`}
              onFocus={() => setActiveInput('due_date')}
              onBlur={() => setActiveInput('')}
              type="date"
              name="due_date"
              value={data.due_date.replace(/[/]/g, '-')}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <div className="mt-[3rem]">
        <label className="font-normal font-medium">
          <span
            style={{
              color: `${
                activeInput !== 'description' && !errors.description?.validated && errors.description?.changed
                  ? '#EF5050'
                  : 'black'
              }`,
            }}
          >
            აღწერა
          </span>
          <br />
          <textarea
            className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[6.5rem] p-2 font-normal mt-2 ${
              errors.description?.validated
                ? 'border-[#98E37E]'
                : !errors.description?.changed
                ? 'border-[#BCBCBC]'
                : 'border-[#EF5050]'
            }`}
            onFocus={() => setActiveInput('description')}
            onBlur={() => setActiveInput('')}
            name="description"
            value={data.description}
            placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="w-[100%] h-[1px] bg-[#C1C1C1] mt-12" />
    </div>
  );
};

export default ExperienceForm;
