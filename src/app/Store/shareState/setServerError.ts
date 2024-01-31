export type ErrorFromServer = {
  type: string;
  message: string;
};

export const setErrorMassage = (errResp: ErrorFromServer): string => {
  let errorMessage = 'error';
  if (errResp.message) {
    errorMessage = errResp.message;
  }
  return errorMessage;
};
