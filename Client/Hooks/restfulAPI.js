import axios from 'axios';

export function callLambdaFunction(requestType, requestBody) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  };
  return processRestfulAPI("/.netlify/functions/" + requestType, requestOptions);
}

async function processRestfulAPI(restfulAPI, requestOptions) {
  try
  {
    let response = await axios.post(restfulAPI, requestOptions);
    return { statusCode: response.status, statusText: response.statusText, body: response };
  }
  catch(err)
  {
    return { statusCode: 404, statusText: 'Resource Not Found', body: null }
  }
}
