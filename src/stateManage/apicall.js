import axios from 'axios';
import { BASEURL } from '../../config';

export default (data,path) => {
  let header=''
  header={ headers: {  'WMS_App': 'encryptedKey', 'Content-Type': 'multipart/form-data', } }
  const promise = axios.post(BASEURL + path,data,header)
  const dataPromise = promise.then((response) => response)
  return dataPromise
};
