export type EducationFormDataObject = {
  institute: string;
  degree_id: number;
  due_date: string;
  description: string;
};

export type EducationErrorDataObject = {
  institute: {
    validated: boolean;
    changed: boolean;
  };
  degree_id: {
    validated: boolean;
    changed: boolean;
  };
  due_date: {
    validated: boolean;
    changed: boolean;
  };
  description: {
    validated: boolean;
    changed: boolean;
  };
};

export type EducationErrorDataArray = EducationErrorDataObject[];

export type DegreeDataObject = {
  id: number;
  title: string;
};
