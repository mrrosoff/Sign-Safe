import axios from 'axios';

export const callLambdaFunction = async (requestType, requestBody) =>
{
  try
  {
    return await axios.post("/.netlify/functions/" + requestType, JSON.stringify(requestBody));
  }

  catch(err)
  {
    console.error('Resource Not Found');
  }
};
