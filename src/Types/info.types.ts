export type InfoFormDataObject = {
    name: string;
    surname: string;
    email: string;
    about: string;
    file: string | ArrayBuffer;
    mobile: string;
  };
  
export type ErrorDataInfoObject = {
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