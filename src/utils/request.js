import fetch from 'isomorphic-fetch';
import { SubmissionError } from 'redux-form';
import store from 'store';

const HTTP_REQUEST_OPTIONS = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};

const serializeGetQueryUrl = (obj, prefix) => {
  const str = [];
  let param;

  for (param in obj) {
    if (obj.hasOwnProperty(param)) {
      const key = prefix ? `${prefix}[${param}]` : param;
      const value = obj[param];

      str.push((value && typeof value === 'object')
        ? serializeGetQueryUrl(value, key)
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return str.join('&');
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const request = (url, data = {}, method = 'GET', throwSubmissionError = false) => {
  const options = {
    ...HTTP_REQUEST_OPTIONS,
    method,
  };

  let requestUrl;

  const { _csrf = {} } = store.getState();
  const _data = {
    ..._csrf,
    ...data,
  };

  if (method === 'GET') {
    const stringParams = serializeGetQueryUrl(_data);
    if (stringParams.length) {
      requestUrl = `${url}?${stringParams}`;
    } else {
      requestUrl = url;
    }
  } else {
    options.body = JSON.stringify(_data);
    requestUrl = url;
  }

  return fetch(requestUrl, options)
    .then(checkStatus)
    .catch(e => {
      if (throwSubmissionError) {
        return e.response.json().then(body => {
          throw new SubmissionError({ _error: body.error.message });
        });
      }

      return e.response;
    })
    .then((response) => response.json())
    // .catch((err) => ({ err }))
    ;
};

export default request;
