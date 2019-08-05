import apiCall from '../apis'
import login from './index'

export function getEnvByProcess (processName) {
  let method = 'get'
  let url = '/api/v1/process/read/' + processName
  return apiCall.apis(method, url).then((success) => {
    return success.data? success.data.data: success
  }).catch((error) => {
    return error
  })
}



export function addNewEnv (data) {
  let method = 'post'
  let url = '/api/v1/process/write'
  return apiCall.apis(method, url, data).then((success) => {
    return success.data
  }).catch((error) => {
    return error
  })
}


export default {
  addNewEnv,
  getEnvByProcess
}