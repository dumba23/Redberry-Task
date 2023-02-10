import { EducationFormDataObject } from './education.types';
import { ExpFormDataObject } from './experience.types';

export type DataObject = {
  name: string;
  surname: string;
  email: string;
  image: string | Blob;
  about_me: string;
  phone_number: string;
  educations: EducationFormDataObject[];
  experiences: ExpFormDataObject[];
};
