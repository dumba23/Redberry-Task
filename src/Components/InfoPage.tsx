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
  name: {
    validated: boolean;
    changed: boolean;
  };
  surname: {
    validated: boolean;
    changed: boolean;
  };
  email: {
    validated: boolean;
    changed: boolean;
  };
  about: {
    validated: boolean;
    changed: boolean;
  };
  file: {
    validated: boolean;
    changed: boolean;
  };
  mobile: {
    validated: boolean;
    changed: boolean;
  };
};

const InfoPage = () => {
  const storedFormData = JSON.parse(localStorage.getItem('dataPersonal')) || {
    name: '',
    surname: '',
    email: '',
    about: '',
    file: null,
    mobile: '',
  };

  const storedErrorData = JSON.parse(localStorage.getItem('errorsPersonal')) || {
    name: {
      validated: false,
      changed: false,
    },
    surname: {
      validated: false,
      changed: false,
    },
    email: {
      validated: false,
      changed: false,
    },
    about: {
      validated: false,
      changed: false,
    },
    file: {
      validated: false,
      changed: false,
    },
    mobile: {
      validated: false,
      changed: false,
    },
  };

  const [formData, setFormData] = useState<FormDataObject>(storedFormData);
  const [errorData, setErrorData] = useState<ErrorDataObject>(storedErrorData);
  const [activeInput, setActiveInput] = useState<string>('');
  const [tempMobile, setTempMobile] = useState<string>(storedFormData.mobile);

  const navigate = useNavigate();

  const EmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  const GeorgianRegex = /^[\u10A0-\u10FF]*$/;
  const MobileNumberRegex = /^(\+?995)?(79\d{7}|5\d{8})$/;

  useEffect(() => {
    localStorage.setItem('dataPersonal', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('dataPersonal'));
    if (data) {
      setFormData(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('errorsPersonal', JSON.stringify(errorData));
  }, [errorData]);

  useEffect(() => {
    const errors = JSON.parse(localStorage.getItem('errorsPersonal'));
    if (errors) {
      setErrorData(errors);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case 'name':
      case 'surname':
        if (value.length > 1 && GeorgianRegex.test(value)) {
          setErrorData({ ...errorData, [name]: { validated: true, changed: true } });
        } else {
          setErrorData({ ...errorData, [name]: { validated: false, changed: true } });
        }
        break;
      case 'email':
        const emailEnd = '@redberry.ge';
        if (EmailRegex.test(value) && value.slice(value.length - emailEnd.length, value.length) === emailEnd) {
          setErrorData({ ...errorData, [name]: { validated: true, changed: true } });
        } else {
          setErrorData({ ...errorData, [name]: { validated: false, changed: true } });
        }
        break;
      case 'mobile':
        if (MobileNumberRegex.test(value.slice(0, 17).replace(/ /g, ''))) {
          setErrorData({ ...errorData, [name]: { validated: true, changed: true } });
        } else {
          setErrorData({ ...errorData, [name]: { validated: false, changed: true } });
        }
        break;
    }

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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let i = 0;

    if (formData.file === null) {
      alert('Please choose a image with .png or .jpeg format');
    } else {
      i += 1;
    }

    let newErrorObject = {} as ErrorDataObject;
    for (const value in errorData) {
      if (errorData[value].validated) {
        newErrorObject = { ...newErrorObject, [value]: { validated: true, changed: true } };
        i += 1;
      } else if (!errorData[value].changed) {
        newErrorObject = { ...newErrorObject, [value]: { validated: false, changed: true } };
        setErrorData(newErrorObject);
      }
    }
    if (i === 5) {
      navigate('/gamotsdileba');
    }
  };

  return (
    <div className="flex flex-row">
      <div className="w-3/5 h-[100vh] flex flex-col items-center bg-[#F9F9F9]">
        <Link to={'/'} className="absolute left-10 top-12 translate-y-1">
          <img src={BackLogo} alt="Logo" />
        </Link>
        <div className="border-b border-[#1A1A1A] w-[80%] h-[4rem] flex justify-between mt-[2.5rem] items-center">
          <div className="font-bold text-2xl">პირადი ინფო</div>
          <div>1/3</div>
        </div>
        <div className="flex mt-[4.8rem] w-[80%] h-[100%]">
          <form className="w-[100%]">
            <div className="flex w-100% flex-row justify-between">
              <div className="w-[47%] p-2">
                <label className="font-medium relative">
                  <span
                    style={{
                      color: `${
                        activeInput !== 'name' && !errorData.name?.validated && errorData.name?.changed
                          ? '#EF5050'
                          : 'black'
                      }`,
                    }}
                  >
                    სახელი
                  </span>
                  <br />
                  {activeInput !== 'name' &&
                    (!errorData.name?.validated && errorData.name?.changed ? (
                      <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
                    ) : (
                      errorData.name?.validated && (
                        <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
                      )
                    ))}
                  <input
                    className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
                      errorData.name?.validated
                        ? 'border-[#98E37E]'
                        : !errorData.name?.changed
                        ? 'border-[#BCBCBC]'
                        : 'border-[#EF5050]'
                    }`}
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
              <div className="flex flex-col w-[47%] p-2">
                <label className="font-medium relative ">
                  <span
                    style={{
                      color: `${
                        activeInput !== 'surname' && !errorData.surname?.validated && errorData.surname?.changed
                          ? '#EF5050'
                          : 'black'
                      }`,
                    }}
                  >
                    გვარი
                  </span>
                  <br />
                  {activeInput !== 'surname' &&
                    (!errorData.surname?.validated && errorData.surname?.changed ? (
                      <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
                    ) : (
                      errorData.surname?.validated && (
                        <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
                      )
                    ))}
                  <input
                    className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
                      errorData.surname?.validated
                        ? 'border-[#98E37E]'
                        : !errorData.surname?.changed
                        ? 'border-[#BCBCBC]'
                        : 'border-[#EF5050]'
                    }`}
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
                      activeInput !== 'email' && !errorData.email?.validated && errorData.email?.changed
                        ? '#EF5050'
                        : 'black'
                    }`,
                  }}
                >
                  ელ.ფოსტა
                </span>
                <br />
                {activeInput !== 'email' &&
                  (!errorData.email?.validated && errorData.email?.changed ? (
                    <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
                  ) : (
                    errorData.email?.validated && (
                      <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
                    )
                  ))}
                <input
                  className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
                    errorData.email?.validated
                      ? 'border-[#98E37E]'
                      : !errorData.email?.changed
                      ? 'border-[#BCBCBC]'
                      : 'border-[#EF5050]'
                  }`}
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
                      activeInput !== 'mobile' && !errorData.mobile?.validated && errorData.mobile?.changed
                        ? '#EF5050'
                        : 'black'
                    }`,
                  }}
                >
                  მობილურის ნომერი
                </span>
                <br />
                {activeInput !== 'mobile' &&
                  (!errorData.mobile?.validated && errorData.mobile?.changed ? (
                    <img className="absolute top-11 right-0 translate-x-8" src={ErrorLogo} alt="error" />
                  ) : (
                    errorData.mobile?.validated && (
                      <img className="absolute top-11 right-3" src={SuccessLogo} alt="success" />
                    )
                  ))}
                <input
                  className={`border focus:outline-[#BCBCBC] rounded w-[100%] h-[3rem] p-2 font-normal mt-2 ${
                    errorData.mobile?.validated
                      ? 'border-[#98E37E]'
                      : !errorData.mobile?.changed
                      ? 'border-[#BCBCBC]'
                      : 'border-[#EF5050]'
                  }`}
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
      <div className="w-2/5 relative flex justify-center">
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
