export const route = () => {
  let getLocationDomain = location.hostname.split('.').reverse()[0]
  let setting = {
    local: {
      apiUrl: 'http://127.0.0.1:5000',
    },
    server: {
      apiUrl: 'http://127.0.0.1:5000',
    }
  }
  let APIUrl = ''
  if (getLocationDomain === 'dev' || location.hostname === '127.0.0.1' || location.hostname === 'localhost') {
    APIUrl = setting.local.apiUrl
  } else {
    APIUrl = setting.server.apiUrl
  }
  return {
    APIUrl: APIUrl,
  }
}
