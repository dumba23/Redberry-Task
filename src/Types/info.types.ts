export type InfoFormDataObject = {
  name: string;
  surname: string;
  email: string;
  about_me: string;
  image: string | ArrayBuffer;
  phone_number: string;
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
  about_me: {
    validated: boolean;
    changed: boolean;
  };
  image: {
    validated: boolean;
    changed: boolean;
  };
  phone_number: {
    validated: boolean;
    changed: boolean;
  };
};
