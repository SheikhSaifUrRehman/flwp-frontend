import React from 'react';

import workerImg from './../assets/img/worker.jpg';

function HomeImageWithText() {
  return (
    <>
      <div className='sec-3 pt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <img
                src={
                  'https://www.incimages.com/uploaded_files/image/1920x1080/getty_451303909_240831.jpg'
                }
                className='img img-fluid'
              ></img>
            </div>
            <div className='col-md-6 d-flex justify-content-center align-items-center'>
              <div className=''>
                <h2 className=''>Everyday life made easier</h2>
                <p className=''>
                  When life gets busy, you don’t have to tackle it alone. Get
                  time back for what you love without breaking the bank.
                </p>
                <ul className='style-type-disc'>
                  <li>Choose your Worker by reviews, skills, and price</li>
                  <li>Schedule when it works for you — as early as today</li>
                  <li>Chat, tip, and review all through one platform</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeImageWithText;
