import React, { ChangeEvent, useState } from 'react';
import { ExpErrorDataObject, ExpFormDataObject } from '../Types/experience.types';

import { ErrorLogo, SuccessLogo } from '../Assets';

const ExperienceForm = ({
  handleChange,
  data,
  errors,
}: {
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  data: ExpFormDataObject;
  errors: ExpErrorDataObject;
}) => {
  const [activeInput, setActiveInput] = useState<string>('');

  return (
    <div className="w-[80%]">
      <div className="mt-[2rem]">
        <label className="font-medium relative">
          <span
            style={{
              color: `${
                activeInput !== 'position' && !errors.position?.validated && errors.position?.changed
                  ? '#EF5050'
                  : 'black'
              }`,
            }}
          >
            თანამდებობა
          </span>
          <br />
          {activeInput !== 'position' &&
            (!errors.position?.validated && errors.position?.changed ? (
              <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
            ) : (
              errors.position?.validated && <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
            ))}
          <input
            className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
              errors.position?.validated
                ? 'border-[#98E37E]'
                : !errors.position?.changed
                ? 'border-[#BCBCBC]'
                : 'border-[#EF5050]'
            }`}
            onFocus={() => setActiveInput('position')}
            onBlur={() => setActiveInput('')}
            type="text"
            name="position"
            value={data.position}
            placeholder="თანამდებობა"
            onChange={handleChange}
          />
        </label>
        <div className="font-light text-sm mt-2">მინიმუმ 2 სიმბოლო</div>
      </div>
      <div className="mt-[2rem]">
        <label className="font-medium relative">
          <span
            style={{
              color: `${
                activeInput !== 'employer' && !errors.employer?.validated && errors.employer?.changed
                  ? '#EF5050'
                  : 'black'
              }`,
            }}
          >
            დამსაქმებელი
          </span>
          <br />
          {activeInput !== 'employer' &&
            (!errors.employer?.validated && errors.employer?.changed ? (
              <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
            ) : (
              errors.employer?.validated && <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
            ))}
          <input
            className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
              errors.employer?.validated
                ? 'border-[#98E37E]'
                : !errors.employer?.changed
                ? 'border-[#BCBCBC]'
                : 'border-[#EF5050]'
            }`}
            onFocus={() => setActiveInput('employer')}
            onBlur={() => setActiveInput('')}
            type="text"
            name="employer"
            value={data.employer}
            placeholder="დამსაქმებელი"
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
                color: `${
                  activeInput !== 'start_date' && !errors.start_date?.validated && errors.start_date?.changed
                    ? '#EF5050'
                    : 'black'
                }`,
              }}
            >
              დაწყების თარიღი
            </span>
            <br />
            <input
              className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
                errors.start_date?.validated
                  ? 'border-[#98E37E]'
                  : !errors.start_date?.changed
                  ? 'border-[#BCBCBC]'
                  : 'border-[#EF5050]'
              }`}
              onFocus={() => setActiveInput('start_date')}
              onBlur={() => setActiveInput('')}
              type="date"
              name="start_date"
              value={data.start_date.replace(/[/]/g, '-')}
              onChange={handleChange}
            />
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
