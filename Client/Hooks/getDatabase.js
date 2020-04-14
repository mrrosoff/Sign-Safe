import axios from 'axios';

export function callLambdaFunction(requestType, requestBody) {

  return processRestfulAPI("/.netlify/functions/" + requestType, JSON.stringify(requestBody));
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
