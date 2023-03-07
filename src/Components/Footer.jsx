import React from 'react';
import logoImg from './../assets/img/fypl.png';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div>
      <div className='sec-footer'>
        <div className='overlay pt-5 pb-3  w-100'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-3'>
                <img src={logoImg} style={{ width: 170 }} />
                <p>
                  When life gets busy, you don’t have to tackle it
                  alone. Get time back for what you love without
                  breaking the bank.
                </p>
              </div>

              <div className='col-md-3'>
                <h5>Services</h5>
                <Link to='/services' className=''>
                  <p>View All</p>{' '}
                </Link>
              </div>

              <div className='col-md-3'>
                <h5>About</h5>
                <Link to='/about' className=''>
                  <p>About</p>{' '}
                </Link>
                <Link to='/help' className=''>
                  <p>Help</p>{' '}
                </Link>
                <Link to='/privacy-policy' className=''>
                  <p>privacy Policy</p>{' '}
                </Link>
              </div>

              <div className='col-md-3'>
                <h5>Contact</h5>
                <Link to='/contact' className=''>
                  <p>Contact Us</p>{' '}
                </Link>
              </div>
            </div>

            <div className='footer-sec-bottom text-center'>
              <p className='text-white'>Copyright @ FREELANCER WORKPLACE 2023</p>

              <div className='social text-center text-white '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    d='M15.402 21v-6.966h2.333l.349-2.708h-2.682V9.598c0-.784.218-1.319 1.342-1.319h1.434V5.857a19.19 19.19 0 0 0-2.09-.107c-2.067 0-3.482 1.262-3.482 3.58v1.996h-2.338v2.708h2.338V21H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4.598z'
                    fill='rgba(255,255,255,1)'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    d='M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z'
                    fill='rgba(255,255,255,1)'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    d='M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z'
                    fill='rgba(255,255,255,1)'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
