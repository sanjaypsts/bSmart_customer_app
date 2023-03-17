import axios from 'axios';
import { BASEURL } from '../../config';

export default () => {

  return axios.create({

    baseURL: `${BASEURL}`,
    headers: {
      WMS_App: 'encryptedKey',
      'Content-Type': 'multipart/form-data',
     
    },
  });
};
