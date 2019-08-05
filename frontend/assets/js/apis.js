import axios from 'axios'
// import $ from 'jquery'
import {route} from './routes.config'


export async function apis (method, url, data) {
  var promise = ''
  try {
    await axios({
      method: method,
      // crossDomain: true,
      url: route().APIUrl + url,
      data: data,
      withCredentials: false,
      responseType: 'json',
      headers: {
      }
    }).then((success) => {
      promise = success
    }).catch((error) => {
      promise = error
    })
  } catch (exce) {
    return exce
  }
  return promise
}



export default {
  apis
}
