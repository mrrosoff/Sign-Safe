import axios from 'axios';

export function sendServerRequest(requestType, serverPort = getOriginalServerPort()) {
  const requestOptions = { method: "GET" };
  return processRestfulAPI(serverPort + "/api/" + requestType, requestOptions);
}

export function sendServerRequestWithBody(requestType, requestBody, serverPort = getOriginalServerPort()) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: requestBody
  };
  return processRestfulAPI(serverPort + "/api/" + requestType, requestOptions);
}

async function processRestfulAPI(restfulAPI, requestOptions) {
  try {
    let response = await axios.post(restfulAPI, requestOptions);
    return { statusCode: response.status, statusText: response.statusText, body: response };
  }
  catch(err) {
    return { statusCode: 404, statusText: 'Resource Not Found', body: null }
  }
}

export function getOriginalServerPort() {
  return location.protocol + "\/\/" + location.hostname + ":" + location.port;
}
