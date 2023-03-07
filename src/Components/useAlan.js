import { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { setLoginModal, setSignupModal } from '../actions/modals';

import alanBtn from '@alan-ai/alan-sdk-web';
import { logoutUser } from '../actions/users';
import { toast } from 'react-toastify';

const COMMANDS = {
  LOGOUT_USER: 'logout',
  LOGIN_PAGE: 'login-page',
  HOME_PAGE: 'home-page',

  SIGNUP_PAGE: 'signup-page',
  WORKERS_PAGE: 'workers-page',
  SERVICES_PAGE: 'services-page',
  USER_REQS_PAGE: 'userRequests-page',
};

const UseAlan = ({ history }) => {
  const [alanInstance, setAlanInstance] = useState();
  const dispatch = useDispatch();

  const loginPage = useCallback(() => {
    alanInstance.playText(' please login ');
    dispatch(setLoginModal(true));
  }, [alanInstance, history]);

  const homePage = useCallback(() => {
    alanInstance.playText(' going to home page ');
    history.push('/');
  }, [alanInstance, history]);

  const logoutPage = useCallback(() => {
    alanInstance.playText('Logging Out');
    dispatch(logoutUser());
    toast.success('Logout success');
  }, [alanInstance, history]);

  const signUpPage = useCallback(() => {
    alanInstance.playText('Showing Signup Form');
    dispatch(setSignupModal(true));
  }, [alanInstance, history]);

  const workersPage = useCallback(() => {
    alanInstance.playText(' Showing Workers ');
    history.push('/workers');
  }, [alanInstance, history]);

  const servicesPage = useCallback(() => {
    alanInstance.playText(' Showing Services ');
    history.push('/services');
  }, [alanInstance, history]);

  const userReqsPage = useCallback(() => {
    alanInstance.playText(' Showing User Requests ');
    history.push('/user-requests');
  }, [alanInstance, history]);

  useEffect(() => {
    window.addEventListener(COMMANDS.LOGIN_PAGE, loginPage);
    window.addEventListener(COMMANDS.HOME_PAGE, homePage);
    window.addEventListener(COMMANDS.LOGOUT_USER, logoutPage);
    window.addEventListener(COMMANDS.SIGNUP_PAGE, signUpPage);
    window.addEventListener(COMMANDS.WORKERS_PAGE, workersPage);
    window.addEventListener(COMMANDS.SERVICES_PAGE, servicesPage);
    window.addEventListener(COMMANDS.USER_REQS_PAGE, userReqsPage);

    return () => {
      window.removeEventListener(COMMANDS.LOGIN_PAGE, loginPage);
      window.removeEventListener(COMMANDS.HOME_PAGE, homePage);
      window.removeEventListener(COMMANDS.LOGOUT_USER, logoutPage);
      window.removeEventListener(COMMANDS.SIGNUP_PAGE, signUpPage);
      window.removeEventListener(COMMANDS.WORKERS_PAGE, workersPage);
      window.removeEventListener(
        COMMANDS.SERVICES_PAGE,
        servicesPage
      );
      window.removeEventListener(
        COMMANDS.USER_REQS_PAGE,
        userReqsPage
      );
    };
  }, [
    homePage,
    loginPage,
    logoutPage,
    signUpPage,
    workersPage,
    servicesPage,
    userReqsPage,
  ]);

  useEffect(() => {
    if (alanInstance != null) return;
    // console.clear();
    console.log(
      `process.env.REACT_APP_ALAN_KEY`,
      process.env.REACT_APP_ALAN_KEY
    );
    console.log(
      `process.env.REACT_APP_CLOUDINARY_CLOUD_NAME`,
      process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    );
    setAlanInstance(
      alanBtn({
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command }) => {
          window.dispatchEvent(new CustomEvent(command));
        },
      })
    );
  }, []);

  return null;
};

export default withRouter(UseAlan);
