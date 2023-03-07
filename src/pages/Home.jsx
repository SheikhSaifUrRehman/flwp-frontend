import React from 'react';

import { Link } from 'react-router-dom';

import HomeImageWithText from '../Components/HomeImageWithText';
import CovidPopup from '../Components/CovidPopup';

import Category from './../Components/Category';
import Worker from './../Components/Worker';
import ShowLogin from './../Components/ShowLogin';
import SubCategoryList from './../Components/SubCategoryList';
import bannerImg from './../assets/img/banner.jpg';

function Home(props) {
  return (
    <div>
      {/* <CovidPopup /> */}
      <hr />
      <HomeImageWithText />
      <hr />
      <Worker />

      <div className='sec-1 pt-1'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 d-flex justify-content-center align-items-center'>
              <div className=''>
                <h2 className=''>
                  Help <span className='text-pri'>When</span> you need <br />{' '}
                  <span className='text-pri'> where</span> your need
                </h2>
                <p className=''>
                  When life gets busy, you don’t have to tackle it alone. Get
                  time back for what you love without breaking the bank.
                </p>
              </div>
            </div>
            <div className='col-md-6'>
              <img
                src='https://i.dawn.com/primary/2014/10/544daddfaaa09.jpg'
                className='img img-fluid'
              ></img>
            </div>
          </div>
        </div>
      </div>
      <Category />
      <hr />
      <ShowLogin />
      <hr />
      <SubCategoryList />
    </div>
  );
}

export default Home;
