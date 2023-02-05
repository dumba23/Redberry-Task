import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import formatPhoneNumber from '../Utils/formatPhoneNumber';

import { BackLogo, ErrorLogo, SuccessLogo, LogoInfo } from '../Assets/Images';
import PersonalInfo from '../Utils/PersonalInfo';

type FormDataObject = {
  name: string;
  surname: string;
  email: string;
  about: string;
  file: string | ArrayBuffer;
  mobile: string;
};

type ErrorDataObject = {
  name: boolean;
  surname: boolean;
  email: boolean;
  about: boolean;
  file: boolean;
  mobile: boolean;
};

const InfoPage = () => {
  const storedFormData = JSON.parse(localStorage.getItem('data')) || {
    name: '',
    surname: '',
    email: '',
    about: '',
    file: null,
    mobile: '',
  };

  const [formData, setFormData] = useState<FormDataObject>(storedFormData);
  const [errorData, setErrorData] = useState<ErrorDataObject>({
    name: false,
    surname: false,
    email: false,
    about: false,
    file: false,
    mobile: false,
  });
  const [activeInput, setActiveInput] = useState<string>('');
  const [tempMobile, setTempMobile] = useState<string>(storedFormData.mobile);

  const navigate = useNavigate();

  const EmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  const GeorgianRegex = /^[\u10A0-\u10FF]*$/;
  const MobileNumberRegex = /^(\+?995)?(79\d{7}|5\d{8})$/;

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setFormData(data);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === 'file') {
      const target = event.target as HTMLInputElement;
      const files = target.files[0];
      const reader = new FileReader();
      if (files.name.toLowerCase().endsWith('.png') || files.name.toLowerCase().endsWith('.jpg')) {
        reader.readAsDataURL(files);
        reader.addEventListener('load', () => {
          setFormData({ ...formData, [name]: reader.result });
        });
      }
    } else if (name === 'mobile') {
      setFormData({ ...formData, [name]: value.replace(/\s/g, '').slice(0, 13) });
      setTempMobile(value);
    } else setFormData({ ...formData, [name]: value });
  };

  const handleValidateName = (name: string) => {
    if (formData?.[name] === '' && !errorData?.[name]) {
      return 'border-[#BCBCBC]';
    } else if (formData?.[name].length >= 2 && GeorgianRegex.test(formData?.[name])) {
      return 'border-[#98E37E]';
    } else return 'border-[#EF5050]';
  };

  const handleValidateEmail = () => {
    const emailEnd = '@redberry.ge';
    if (formData.email === '' && errorData.email === false) {
      return 'border-[#BCBCBC]';
    } else if (
      EmailRegex.test(formData.email) &&
      formData.email.slice(formData.email.length - emailEnd.length, formData.email.length) === emailEnd
    ) {
      return 'border-[#98E37E]';
    } else return 'border-[#EF5050]';
  };

  const handleValidateMobileNumber = () => {
    if (formData.mobile === '' && errorData.mobile === false) {
      return 'border-[#BCBCBC]';
    } else if (MobileNumberRegex.test(formData.mobile)) {
      return 'border-[#98E37E]';
    } else return 'border-[#EF5050]';
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let count = 0;
    let newErrorData = {} as ErrorDataObject;
    for (const value in formData) {
      if ((formData[value] === '' || formData[value] === null) && formData[value] !== 'about') {
        newErrorData = { ...newErrorData, [value]: true };
        count = count + 1;
      }
    }

    if (formData.file === null) {
      alert('Please choose a image with .png or .jpeg format');
    }

    setErrorData({ ...newErrorData });

    if (count === 0) {
      navigate('/gamotsdileba');
    }
  };

  return (
    <div className="flex flex-row">
      <div className="w-3/5 h-[100vh] flex flex-col items-center bg-[#F9F9F9]">
        <Link to={'/'} className="absolute left-10 top-12 translate-y-1">
          <img src={BackLogo} alt="Logo" onClick={() => localStorage.removeItem('data')} />
        </Link>
        <div className="border-b border-[#1A1A1A] w-[80%] h-[4rem] flex justify-between mt-[2.5rem] items-center">
          <div className="font-bold text-2xl">პირადი ინფო</div>
          <div>1/3</div>
        </div>
        <div className="flex mt-[4.8rem] w-[80%] h-[100%]">
          <form className="w-[100%]">
            <div className="flex flex-row justify-between">
              <div className="w-[50%] p-2">
                <label className="font-medium relative">
                  <span
                    style={{
                      color: `${
                        (activeInput !== 'name' && handleValidateName('name').slice(8, 15)) === '#EF5050'
                          ? '#EF5050'
                          : 'black'
                      }`,
                    }}
                  >
                    სახელი
                  </span>
                  <br />
                  {activeInput !== 'name' &&
                    (handleValidateName('name').slice(7, 16) === '[#EF5050]' ? (
                      <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
                    ) : (
                      handleValidateName('name').slice(7, 16) !== '[#BCBCBC]' && (
                        <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
                      )
                    ))}
                  <input
                    className={`border focus:outline-[#BCBCBC] rounded w-[80%] h-[3rem] p-2 font-normal mt-2 ${handleValidateName(
                      'name'
                    )}`}
                    onFocus={() => setActiveInput('name')}
                    onBlur={() => setActiveInput('')}
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="ანზორ"
                    onChange={handleChange}
                  />
                </label>
                <div className="font-light text-sm mt-2">მინიმუმ 2 ასო, ქართული ასოები</div>
              </div>
              <div className="w-[50%] p-2">
                <label className="font-medium relative">
                  <span
                    style={{
                      color: `${
                        (activeInput !== 'surname' && handleValidateName('surname').slice(8, 15)) === '#EF5050'
                          ? '#EF5050'
                          : 'black'
                      }`,
                    }}
                  >
                    გვარი
                  </span>
                  <br />
                  {activeInput !== 'surname' &&
                    (handleValidateName('surname').slice(7, 16) === '[#EF5050]' ? (
                      <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
                    ) : (
                      handleValidateName('surname').slice(7, 16) !== '[#BCBCBC]' && (
                        <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
                      )
                    ))}
                  <input
                    className={`border focus:outline-[#BCBCBC] rounded w-[80%] h-[3rem] p-2 font-normal mt-2 ${handleValidateName(
                      'surname'
                    )}`}
                    onFocus={() => setActiveInput('surname')}
                    onBlur={() => setActiveInput('')}
                    type="text"
                    name="surname"
                    value={formData.surname}
                    placeholder="მუმლაძე"
                    onChange={handleChange}
                  />
                </label>
                <div className="font-light text-sm mt-2">მინიმუმ 2 ასო, ქართული ასოები</div>
              </div>
            </div>
            <div className="flex items-center mt-[3rem]">
              <div className="font-medium text-lg mr-[1.2rem]">პირადი ფოტოს ატვირთვა</div>
              <label className="custom-file-upload">
                <input name="file" type="file" className="hidden" onChange={handleChange} />
                <div className="px-3 py-1 w-[6.7rem] items-center bg-[#0E80BF] rounded text-white text-sm font-normal flex justify-center items-center">
                  ატვირთვა
                </div>
              </label>
            </div>
            <div className="mt-[3rem]">
              <label className="font-normal font-medium">
                ჩემ შესახებ (არასავალდებულო) <br />
                <textarea
                  className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[6.5rem] p-2 font-normal mt-2 ${
                    formData.about.length > 2 ? 'border-[#98E37E]' : 'border-[#BCBCBC]'
                  }`}
                  name="about"
                  value={formData.about}
                  placeholder="ზოგადი ინფო შენ შესახებ"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mt-[2rem]">
              <label className="font-medium relative">
                <span
                  style={{
                    color: `${
                      (activeInput !== 'email' && handleValidateEmail().slice(8, 15)) === '#EF5050'
                        ? '#EF5050'
                        : 'black'
                    }`,
                  }}
                >
                  ელ.ფოსტა
                </span>
                <br />
                {activeInput !== 'email' &&
                  (handleValidateEmail().slice(7, 16) === '[#EF5050]' ? (
                    <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
                  ) : (
                    handleValidateEmail().slice(7, 16) !== '[#BCBCBC]' && (
                      <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
                    )
                  ))}
                <input
                  className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${handleValidateEmail()}`}
                  onFocus={() => setActiveInput('email')}
                  onBlur={() => setActiveInput('')}
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="anzor666@redberry.ge"
                  onChange={handleChange}
                />
              </label>
              <div className="font-light text-sm mt-2">უნდა მთავრდებოდეს redberry.ge-ით</div>
            </div>
            <div className="mt-[2rem]">
              <label className="font-medium relative">
                <span
                  style={{
                    color: `${
                      (activeInput !== 'mobile' && handleValidateMobileNumber().slice(8, 15)) === '#EF5050'
                        ? '#EF5050'
                        : 'black'
                    }`,
                  }}
                >
                  მობილურის ნომერი
                </span>
                <br />
                {activeInput !== 'mobile' &&
                  (handleValidateMobileNumber().slice(7, 16) === '[#EF5050]' ? (
                    <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
                  ) : (
                    handleValidateMobileNumber().slice(7, 16) !== '[#BCBCBC]' && (
                      <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
                    )
                  ))}
                <input
                  className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${handleValidateMobileNumber()}`}
                  onFocus={() => setActiveInput('mobile')}
                  onBlur={() => setActiveInput('')}
                  type="text"
                  name="mobile"
                  value={formatPhoneNumber(tempMobile)}
                  placeholder="+995 551 12 34 56"
                  onChange={handleChange}
                />
              </label>
              <div className="font-light text-sm mt-2">უნდა აკმაყოფილებდეს ქართული ნომრების ფორმატს</div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="w-[8rem] px-[4rem] py-[0.8rem] bg-[#6B40E3] font-medium text-white rounded mt-[9rem] flex justify-center"
              >
                შემდეგი
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-2/5 relative">
        <PersonalInfo
          name={formData.name}
          surname={formData.surname}
          email={formData.email}
          mobile={formData.mobile}
          file={formData.file}
          about={formData.about}
        />
        <img className="absolute top-[994px] left-[78px]" src={LogoInfo} alt="logo" />
      </div>
    </div>
  );
};

export default InfoPage;
