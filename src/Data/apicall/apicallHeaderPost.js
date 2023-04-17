import axios from 'axios';
import { BASEURL } from '../../../config';


export default (data,path,token) => {

  let header=''
  header={ headers: { 'WMS_App': 'encryptedKey', 'Content-Type': 'multipart/form-data','Authorization':`Bearer ${token}`} }
  const promise = axios.post(BASEURL + path,data,header)
  const dataPromise = promise.then((response) => response)
  return dataPromise
};
