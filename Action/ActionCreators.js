import API_CONST from '../Constants/APIConstants';

export const login = (data) => {
  return {
    type: API_CONST.N_LOGIN,
    data  
  };
};