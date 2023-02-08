export type ExpFormDataObject = {
  position: string;
  employer: string;
  start_date: string;
  due_date: string;
  description: string;
};

export type ExpErrorDataObject = {
  position: {
    validated: boolean;
    changed: boolean;
  };
  employer: {
    validated: boolean;
    changed: boolean;
  };
  start_date: {
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

export type ExpErrorDataArray = ExpErrorDataObject[];
