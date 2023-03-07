import React from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';
import { path } from './../path';

function Contact() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [contactForm, setContactForm] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.message
    ) {
      toast.error('Fill In All Fields');
      return;
    }

    const url = `${path}api/utility/contact`;
    axios
      .post(url, contactForm)
      .then((res) => {
        console.log(res.data);
        toast.success(`${res.data.result}`);
        setContactForm({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || 'SomeThing Went Wrong'
        );
        console.log(err);
      });
  };

  return (
    <div className='contact-page'>
      <div className='sec-1-contact'>
        <div className='container-fluid px-0'>
          <div className='vh-100 back_grad'>
            <div className='row pt-5  w-100 align-items-center'>
              <div className='col-md-6 text-white ml-md-5'>
                <div className='mt-4 pl-4 pl-md-0'>
                  <h3 className='mb-3'>About FreeLancer Workplace</h3>
                  <p className='text-light'>
                  FreeLancer Workplace one of the biggest players in the gig
                    economy where people offer their time and services
                    as housecleaners, movers, furniture assemblers
                    etc.
                  </p>
                  <p className='text-light'>
                  FreeLancer Workplace is arguably the best thing to come out
                    of the modern day tech revolution. Hiring a worker
                    can really help make every facet of your life a
                    breeze{' '}
                  </p>
                  <p className='text-light'>
                  FreeLancer Workplace a company known for, among other things,
                    sending tool-wielding workers to rescue customers
                    befuddled by build-it-yourself furniture kits.
                  </p>
                </div>
              </div>
              <div className='col-md-5 pb-4 pb-md-0'>
                <div className='contact-form bg-white ml-4 ml-md-0'>
                  <form
                    onSubmit={handleSubmitForm}
                    className='p-4 py-5'
                  >
                    <label className='mb-0'>Name: </label>
                    <input
                      type='text'
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          name: e.target.value,
                        })
                      }
                      className='form-control mb-3 rounded-0'
                      placeholder='Enter Name'
                    ></input>
                    <label className='mb-0'>Email: </label>
                    <input
                      type='email'
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className='form-control mb-3 rounded-0'
                      placeholder='Enter Email'
                    ></input>
                    <label className='mb-0'>Message: </label>
                    <textarea
                      type='text'
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      rows='4'
                      className='form-control mb-3 rounded-0'
                      placeholder='Enter your message here'
                    ></textarea>
                    <input
                      type='Submit'
                      className='form-control mb-3 rounded-0 btn btn-block bg-pri text-white'
                      placeholder='Enter password'
                    ></input>
                  </form>
                </div>
              </div>
              {/* <div className="col-md-1"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
