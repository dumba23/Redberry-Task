import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BackLogo, LogoInfo } from '../Assets/Images';
import { ExpErrorDataArray, ExpFormDataObject } from '../Types/experience.types';
import ExperienceForm from '../Utils/ExperienceForm';
import ExperienceInfo from '../Utils/ExperienceInfo';
import PersonalInfo from '../Utils/PersonalInfo';

const ExperiencePage = () => {
  const storedFormData = JSON.parse(localStorage.getItem('dataPersonal')) || {
    name: '',
    surname: '',
    email: '',
    about_me: '',
    image: null,
    phone_number: '',
  };

  const storedExpData = JSON.parse(localStorage.getItem('dataExp')) || [
    {
      position: '',
      employer: '',
      start_date: '',
      due_date: '',
      description: '',
    },
  ];
  const initial_error_data = {
    position: {
      validated: false,
      changed: false,
    },
    employer: {
      validated: false,
      changed: false,
    },
    start_date: {
      validated: false,
      changed: false,
    },
    due_date: {
      validated: false,
      changed: false,
    },
    description: {
      validated: false,
      changed: false,
    },
  };

  const storedErrorData = JSON.parse(localStorage.getItem('errorsExp')) || [initial_error_data];

  const [formDatas, setFormDatas] = useState<Array<ExpFormDataObject>>(storedExpData);
  const [errorData, setErrorData] = useState<ExpErrorDataArray>(storedErrorData);

  const [countForm, setCountForm] = useState<Array<Number>>([1]);

  const navigate = useNavigate();

  useEffect(() => {
    const formData = {
      position: '',
      employer: '',
      start_date: '',
      due_date: '',
      description: '',
    };

    if (countForm.length !== formDatas.length) {
      setFormDatas([...formDatas, formData]);
      setErrorData([...errorData, initial_error_data] as unknown as ExpErrorDataArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countForm]);

  useEffect(() => {
    localStorage.setItem('dataExp', JSON.stringify(formDatas));
  }, [formDatas]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('dataExp'));
    if (data) {
      setFormDatas(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('errorsExp', JSON.stringify(errorData));
  }, [errorData]);

  useEffect(() => {
    const errors = JSON.parse(localStorage.getItem('errorsExp'));
    if (errors) {
      setErrorData(errors);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    event.preventDefault();
    const { name, value } = event.target;

    const newErrors = errorData.map((obj, idx) => {
      if (idx === index && value.length >= 2) {
        return { ...obj, [name]: { validated: true, changed: true } };
      } else if (idx === index && value.length < 2) {
        return { ...obj, [name]: { validated: false, changed: true } };
      }
      return obj;
    });
    setErrorData(newErrors as ExpErrorDataArray);

    const newData = formDatas.map((obj, idx) => {
      if (idx === index && name.slice(name.length - 4, name.length) !== 'date') {
        return { ...obj, [name]: value };
      } else if (idx === index && (name === 'start_date' || name === 'due_date')) {
        return { ...obj, [name]: value.replace(/-/g, '/') };
      }
      return obj;
    });
    setFormDatas(newData);
  };

  const handleCountFormUpdate = () => {
    setCountForm([...countForm, 1]);
  };

  const handleSubmit = () => {
    //Check first form validation
    let countFormError = 0;

    const newErrors = errorData.map((obj, idx) => {
      if (idx === 0) {
        let newObj = {};
        Object.keys(obj).map((key) => {
          if (!obj?.[key].changed) {
            newObj = { ...newObj, [key]: { validated: false, changed: true } };
            return newObj;
          } else if (obj?.[key].changed && obj?.[key].validated) {
            newObj = { ...newObj, [key]: { validated: true, changed: true } };
          } else if (obj?.[key].changed && !obj?.[key].validated) {
            newObj = { ...newObj, [key]: { validated: false, changed: true } };
          }
          return obj;
        });
        return newObj;
      }

      return obj;
    });
    setErrorData(newErrors as ExpErrorDataArray);

    for (const value in errorData[0]) {
      if (!errorData[0]?.[value].validated) {
        countFormError += 1;
      }
    }

    //Check if additional forms are validated or never changed
    //Based on that increase countErrorForm and if there is any do not open next page
    //Starting from iteration with 1 because we have already tested first form

    for (let i = 1; i < errorData.length; i++) {
      let countChanged = 0;
      let countError = 0;
      const newErrorsAll = newErrors.map((obj, idx) => {
        if (idx === i) {
          let newObj = {};
          Object.keys(obj).map((key) => {
            if (!obj?.[key].changed) {
              countChanged += 1;
              newObj = { ...newObj, [key]: { validated: false, changed: true } };
              return newObj;
            } else if (obj?.[key].changed && obj?.[key].validated) {
              newObj = { ...newObj, [key]: { validated: true, changed: true } };
            } else if (obj?.[key].changed && !obj?.[key].validated) {
              countChanged += 1;
              newObj = { ...newObj, [key]: { validated: false, changed: true } };
            }
            countError += 1;
            return obj;
          });
          return newObj;
        }

        return obj;
      });

      if (countError > 0) {
        countFormError += countChanged;
        setErrorData(newErrorsAll as ExpErrorDataArray);
      }
    }
    if (countFormError === 0) {
      navigate('/ganatleba');
    }
  };

  return (
    <div className="flex flex-row">
      <div className="w-3/5 h-[100vh] flex flex-col items-center bg-[#F9F9F9] overflow-y-scroll">
        <Link to={'/'} className="absolute left-10 top-12 translate-y-1">
          <img src={BackLogo} alt="Logo" />
        </Link>
        <div className="border-b border-[#1A1A1A] w-[80%] h-[4rem] flex justify-between mt-[2.5rem] items-center">
          <div className="font-bold text-2xl">გამოცდილება</div>
          <div>2/3</div>
        </div>
        {formDatas.map((_, i) => (
          <ExperienceForm
            handleChange={(e) => handleChange(e, i)}
            key={i}
            data={
              formDatas[i] || {
                position: '',
                employer: '',
                start_date: '',
                due_date: '',
                description: '',
              }
            }
            errors={errorData[i] || initial_error_data}
          />
        ))}
        <div className="mt-12 w-[80%]">
          <button
            onClick={handleCountFormUpdate}
            className="text-base font-medium bg-[#62A1EB] w-[290px] py-4 rounded text-white"
          >
            მეტი გამოცდილების დამატება
          </button>
        </div>
        <div className="flex justify-between w-[80%]">
          <Link
            to={'/piradi'}
            className="w-[8rem] px-[4rem] py-[0.8rem] bg-[#6B40E3] font-medium text-white rounded mt-[9rem] flex justify-center"
          >
            უკან
          </Link>
          <button
            onClick={handleSubmit}
            className="w-[8rem] px-[4rem] py-[0.8rem] bg-[#6B40E3] font-medium text-white rounded mt-[9rem] flex justify-center"
          >
            შემდეგი
          </button>
        </div>
      </div>
      <div className="w-2/5 relative flex flex-col items-center">
        <PersonalInfo
          name={storedFormData.name}
          surname={storedFormData.surname}
          email={storedFormData.email}
          mobile={storedFormData.phone_number}
          image={storedFormData.image}
          about={storedFormData.about_me}
        />
        <div className="w-[79%] h-[1px] bg-[#C1C1C1] mt-6" />
        <div className="text-[#F93B1D] w-[80%] mt-4 font-bold text-lg">გამოცდილება</div>
        {formDatas.map((_, i) => {
          return (
            formDatas[i] && (
              <ExperienceInfo
                key={i}
                position={formDatas[i].position}
                employer={formDatas[i].employer}
                start_date={formDatas[i].start_date}
                due_date={formDatas[i].due_date}
                description={formDatas[i].description}
              />
            )
          );
        })}
        <img className="absolute top-[994px] left-[78px]" src={LogoInfo} alt="logo" />
      </div>
    </div>
  );
};

export default ExperiencePage;
