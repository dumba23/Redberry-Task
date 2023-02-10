import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ShutterstockImg, LandingLogoMid, LandingLogoTop } from '../Assets/index';

const LandingPage = () => {
  useEffect(() => {
    localStorage.removeItem('dataPersonal');
    localStorage.removeItem('errorsPersonal');
    localStorage.removeItem('dataExp');
    localStorage.removeItem('errorsExp');
    localStorage.removeItem('dataEducation');
    localStorage.removeItem('errorsEducation');
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${ShutterstockImg})` }}
      className="w-[100vw] h-[100vh] flex flex-col items-center"
    >
      <div className="border-b border-[#1A1A1A] w-[95vw] h-[4rem] flex items-center">
        <div style={{ backgroundImage: `url(${LandingLogoTop})` }} className="w-[14.75rem] h-[2.375rem]"></div>
      </div>
      <div
        style={{ backgroundImage: `url(${LandingLogoMid})` }}
        className="absolute z-0 left-[55%] top-[42%] w-[18.75rem] h-[18.75rem]"
      ></div>
      <Link
        to={'/piradi'}
        className="px-[60px] py-[18px] mt-[26.5rem] w-[29rem] bg-black rounded-lg text-white font-medium text-xl flex justify-center"
      >
        რეზიუმეს დამატება
      </Link>
    </div>
  );
};

export default LandingPage;
