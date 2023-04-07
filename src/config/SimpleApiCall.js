import axios from 'axios';

const simpleApiPostWithToken = (url, data, token) => {
  console.log(
    `url -> ${url}`,
    `data -> ${JSON.stringify(data)}`,
    `token -> ${token}`,
  );
  const bearerToken = 'Bearer ' + token;
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}`, data, {
        headers: {
          Authorization: bearerToken,
        },
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const simpleGetApidWithTokenAndParams = ({url, token, params}) => {
  const bearerToken = 'Bearer ' + token;
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}`, {
        params: params,
        headers: {
          Authorization: bearerToken,
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

export {simpleApiPostWithToken, simpleGetApidWithTokenAndParams};
