import axios from 'axios';

const simpleApiGetWithParams = ({url, params}) => {
  console.log('url ->', url, 'params ->', params);
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}`, {
        params: params,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {simpleApiGetWithParams};
