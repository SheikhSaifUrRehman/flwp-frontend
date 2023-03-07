import axios from 'axios';
import { path } from './../path';

export const socialRegister = (response) => async (dispatch) => {
  const data = {
    name: response.profileObj.name,
    id: response.profileObj.googleId,
    email: response.profileObj.email,
    imageUrl: response.profileObj.imageUrl,
    isFacebookUser: true,
    isGoogleUser: false,
  };
  let url = `${path}api/users/social`;
  const result = await axios.post(url, data);

  if (result.data.token) {
    let url = `${path}api/users/`;
    const config = { headers: { 'x-auth-token': result.data.token } };
    const user = await axios.get(url, config);

    dispatch({
      type: 'SET_USER',
      payload: { user: user.data.user },
    });

    dispatch({
      type: 'SET_ISLOGGED',
      payload: { isLoggedIn: true },
    });

    dispatch({
      type: 'SET_TOKEN',
      payload: { token: result.data.token },
    });
    localStorage.setItem('token', result.data.token);

    dispatch({
      type: 'SET_REFRESH_TOKEN',
      payload: { refreshToken: user.data.refreshToken },
    });
    localStorage.setItem('refreshToken', result.data.refreshToken);
  } else {
    console.log(' error ');
  }
};

export const customSignup = (data) => async (dispatch) => {
  let url = `${path}api/users`;
  const result = await axios.post(url, data).catch((err) => {
    return { error: err.response };
  });

  if (result.error) return result;

  let urlUser = `${path}api/users/`;
  const config = { headers: { 'x-auth-token': result.data.token } };
  const user = await axios.get(urlUser, config);

  if (user.error) return user;

  return user;
};

export const customLogin = (data) => async (dispatch) => {
  let url = `${path}api/users/login`;
  const user = await axios.post(url, data).catch((err) => {
    return { error: err.response };
  });

  if (user.error) return user;

  dispatch({
    type: 'SET_USER',
    payload: { user: user.data.user },
  });

  dispatch({
    type: 'SET_ISLOGGED',
    payload: { isLoggedIn: true },
  });

  dispatch({
    type: 'SET_TOKEN',
    payload: { token: user.data.token },
  });
  localStorage.setItem('token', user.data.token);

  dispatch({
    type: 'SET_REFRESH_TOKEN',
    payload: { refreshToken: user.data.refreshToken },
  });
  localStorage.setItem('refreshToken', user.data.refreshToken);

  return user;
};

export const getUser = (response) => async (dispatch) => {
  let url = `${path}api/users/`;
  const config = {
    headers: { 'x-auth-token': localStorage.getItem('token') },
  };
  const user = await axios.get(url, config).catch((err) => {
    // refresh token logic
    if (
      err.response.data.message === 'jwt expired' &&
      err.response.data.status === 401
    ) {
      console.log('JWT expired');
      let urlRefreshToken = `${path}api/users/refresh-token`;
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('refreshToken'),
        },
      };
      axios
        .get(urlRefreshToken, config)
        .then((res) => {
          localStorage.removeItem('token');
          localStorage.removeItem('tempToken');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          getUser();
        })
        .catch((err) => console.log(err));
    }
  });

  if (user != undefined) {
    dispatch({
      type: 'SET_USER',
      payload: { user: user.data.user },
    });

    dispatch({
      type: 'SET_ISLOGGED',
      payload: { isLoggedIn: true },
    });

    dispatch({
      type: 'SET_TOKEN',
      payload: { token: localStorage.getItem('token') },
    });
  } else {
    dispatch({
      type: 'SET_USER',
      payload: { user: {} },
    });

    dispatch({
      type: 'SET_ISLOGGED',
      payload: { isLoggedIn: false },
    });

    dispatch({
      type: 'SET_TOKEN',
      payload: { token: '' },
    });
  }
};

export const logoutUser = (response) => async (dispatch) => {
  dispatch({
    type: 'SET_USER',
    payload: { user: {} },
  });

  dispatch({
    type: 'SET_ISLOGGED',
    payload: { isLoggedIn: false },
  });

  dispatch({
    type: 'SET_TOKEN',
    payload: { token: '' },
  });


  localStorage.removeItem('token');
};

export const setUser = (response) => async (dispatch) => {
  // console.clear();
  // console.log(`response`, response);

  dispatch({
    type: 'SET_USER',
    payload: { user: response.user },
  });
};
