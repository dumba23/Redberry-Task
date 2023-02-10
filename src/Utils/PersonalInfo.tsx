import React from 'react';
import formatPhoneNumber from './formatPhoneNumber';

import { MobileLogo, EmailLogo } from '../Assets';

const PersonalInfo = ({
  name,
  surname,
  email,
  about,
  image,
  mobile,
}: {
  name: string;
  surname: string;
  email: string;
  about: string;
  image: string | ArrayBuffer;
  mobile: string;
}) => {
  return (
    <div className="flex flex-row w-[80%] pt-10">
      <div className="w-3/5">
        <div className="font-bold text-4xl text-[#F93B1D]">
          {name !== '' && name + ' '}
          {surname !== '' && surname}
        </div>
        <div>
          <div className="flex mt-3 items-center">
            {email !== '' && (
              <>
                <img alt="logo" className="w-[16px] h-[16px]" src={EmailLogo} />
                <span className="font-normal text-lg text-[#1A1A1A] ml-3">{email}</span>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="flex mt-2 items-center">
            {mobile !== '' && (
              <>
                <img className="w-[16px] h-[16px]" alt="logo" src={MobileLogo} />
                <span className="font-normal text-lg text-[#1A1A1A] ml-3">{formatPhoneNumber(mobile)}</span>
              </>
            )}
          </div>
        </div>
        <div className="mt-8">
          {about !== '' && (
            <>
              <div className="text-[#F93B1D] font-bold text-lg">ჩემ შესახებ</div>
              <div className="text-[#000000] font-normal text-base">{about}</div>
            </>
          )}
        </div>
      </div>
      <div className="w-2/5">
        {image !== null && (
          <img className="rounded-[50%] h-[246px] object-cover object-center" alt="person" src={image as string} />
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
