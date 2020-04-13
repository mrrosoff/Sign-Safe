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
    return await axios.post(restfulAPI, requestOptions);
  }

  catch(err)
  {
    console.error('Resource Not Found');
  }
}
