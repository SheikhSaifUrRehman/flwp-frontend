import React from 'react';
import axios from 'axios';
import worker from './../assets/img/worker.jpg';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { getUser } from '../actions/users';
import { useSelector } from 'react-redux';
import { path } from './../path';
// import WorkerVideo from './../assets/videos/worker.mp4'

import { setLoading } from './../actions/loading';

function CreateWorker() {
  const [workerForm, setWorkerForm] = React.useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const cities = useSelector((state) => state.workers.searchInfo.city);
  const categories = useSelector((state) => state.workers.searchInfo.category);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!workerForm.cnic_no || workerForm.cnic_no.length !== 13) {
      toast.error('Invalid CNIC');
      return;
    }

    const picArr = [];
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        picArr.push(workerForm.picture);
      }
      picArr.push(workerForm.cnic_pic);
    }

    const fd = new FormData();

    fd.append('name', user.name);
    fd.append('email', user.email);
    fd.append('age', workerForm.age);
    fd.append('area', workerForm.area);
    fd.append('bio', workerForm.bio);
    fd.append('category_id', workerForm.category_id);
    fd.append('city', workerForm.city);
    fd.append('cnic_no', workerForm.cnic_no);
    fd.append('contact_number', workerForm.contact_number);
    fd.append('daily_rate', workerForm.daily_rate);
    fd.append('education', workerForm.education);
    fd.append('experience', workerForm.experience);
    fd.append('hourly_rate', workerForm.hourly_rate);
    fd.append('picture', workerForm.picture);
    fd.append('secondary_contact_number', workerForm.secondary_contact_number);
    fd.append('subCategory_id', workerForm.subCategory_id);
    fd.append('weekly_rate', workerForm.weekly_rate);
    fd.append('whatsapp_number', workerForm.whatsapp_number);
    fd.append('picture', picArr);

    let url = `${path}api/workers`;
    const config = { headers: { 'x-auth-token': token } };
    dispatch(setLoading(true));
    axios
      .post(url, fd, config)
      .then((res) => {
        console.log(res.data);
        history.push('/');
        dispatch(getUser());
        toast.info(
          `Worker Request Created , You'll be notified when you'll be verified`
        );
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong');
        dispatch(setLoading(false));
      });
  };

  return (
    <div className='create-worker-page container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='text-center'>
                <img src={worker} style={{ margin: 'auto' }} alt='Adfw' />
              </div>
            </div>
            <div className='col-md-6 my-5'>
              <p>
              FreeLancer Workplace one of the biggest players in the gig economy where
                people offer their time and services as housecleaners, movers,
                furniture assemblers etc.
              </p>
              <p>
              FreeLancer Workplace is arguably the best thing to come out of the modern
                day tech revolution. Hiring a worker can really help make every
                facet of your life a breeze
              </p>
            </div>
          </div>
        </div>
        <div className='col-md-12 mt-5'>
          <form action='' onSubmit={handleSubmitForm}>
            <div className='row mb-3'>
              <div className='col-6 pr-1'>
                <label htmlFor=''> Name: </label>
                <input
                  required
                  type='text'
                  value={user.name}
                  className='form-control rounded-0  mb-2'
                />
              </div>
              <div className='col-6 pl-1'>
                <label htmlFor=''> Email: </label>
                <input
                  required
                  type='email'
                  value={user.email}
                  className='form-control rounded-0  mb-2'
                />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-4 pr-1'>
                <label htmlFor=''> Contact Number (03123232333): </label>
                <input
                  required
                  type='number'
                  value={workerForm.contact_number}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      contact_number: e.target.value,
                    })
                  }
                  placeholder='اپنا فون نمبر یہاں لکھیں'
                  className='form-control rounded-0  mb-2'
                />
              </div>
              <div className='col-4 pr-1'>
                <label htmlFor=''>
                  {' '}
                  Secondary Contact Number (03123232333):{' '}
                </label>
                <input
                  required
                  type='number'
                  value={workerForm.secondary_contact_number}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      secondary_contact_number: e.target.value,
                    })
                  }
                  placeholder='اپنا فون نمبر یہاں لکھیں'
                  className='form-control rounded-0  mb-2'
                />
              </div>
              <div className='col-4 pl-1'>
                <label htmlFor=''> WhatsApp Number (03123232333): </label>
                <input
                  required
                  type='number'
                  value={workerForm.whatsapp_number}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      whatsapp_number: e.target.value,
                    })
                  }
                  placeholder='اپنا واٹس ایپ نمبر یہاں لکھیں'
                  className='form-control rounded-0  mb-2'
                />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-6 pr-1'>
                <label htmlFor=''> City: </label>
                <select
                  required
                  value={workerForm.city}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      city: e.target.value,
                    })
                  }
                  class='custom-select mb-3'
                  id='validationCustom04'
                  style={{ border: `1px solid #1668a8` }}
                >
                  <option value=''>آپ کا شہر</option>
                  {cities &&
                    cities.map((e) => (
                      <option value={e._id} key={e._id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='col-6 pl-1'>
                <label htmlFor=''> Area: </label>
                <select
                  name=''
                  className='form-control'
                  value={workerForm.area}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      area: e.target.value,
                    })
                  }
                >
                  <option value=''>آپ کا علاقہ یہاں</option>
                  {cities &&
                    cities.map(
                      (e) =>
                        e._id === workerForm.city &&
                        e.areas &&
                        e.areas.map((a) => (
                          <option key={a._id} value={a._id}>
                            {a.name}
                          </option>
                        ))
                    )}
                </select>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-6 pr-1'>
                <label htmlFor=''> Category: </label>
                <select
                  required
                  value={workerForm.category_id}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      category_id: e.target.value,
                    })
                  }
                  class='custom-select mb-3'
                  id='validationCustom04'
                  style={{ border: `1px solid #1668a8` }}
                >
                  <option value=''> Category </option>
                  {categories &&
                    categories.map((e) => (
                      <option value={e._id} key={e._id}>
                        {' '}
                        {e.name}{' '}
                      </option>
                    ))}
                </select>
              </div>
              <div className='col-6 pl-1'>
                <label htmlFor=''> Sub Categorry: </label>
                <select
                  name=''
                  className='form-control'
                  value={workerForm.subCategory_id}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      subCategory_id: e.target.value,
                    })
                  }
                >
                  <option value=''>Sub category</option>
                  {categories &&
                    categories.map(
                      (e) =>
                        e._id === workerForm.category_id &&
                        e.SubCategory &&
                        e.SubCategory.map((a) => (
                          <option key={a._id} value={a._id}>
                            {' '}
                            {a.name}{' '}
                          </option>
                        ))
                    )}
                </select>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-4 pr-1'>
                <label htmlFor=''> Hourly Rate (Rs): </label>
                <input
                  required
                  type='number'
                  value={workerForm.hourly_rate}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      hourly_rate: e.target.value,
                    })
                  }
                  placeholder='اپنا  گھنٹہ یہاں لکھیں'
                  className='form-control rounded-0  mb-2'
                />
              </div>
              <div className='col-4 pl-1'>
                <label htmlFor=''> Daily Rate (Rs): </label>
                <input
                  required
                  type='number'
                  value={workerForm.daily_rate}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      daily_rate: e.target.value,
                    })
                  }
                  placeholder='اپنا یومیہ شرح یہاں لکھیں'
                  className='form-control rounded-0  mb-2'
                />
              </div>
              <div className='col-4 pl-1'>
                <label htmlFor=''> Weekly Rate (Rs): </label>
                <input
                  required
                  type='number'
                  value={workerForm.weekly_rate}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      weekly_rate: e.target.value,
                    })
                  }
                  placeholder='اپنا  گھنٹہ یہاں لکھیں'
                  className='form-control rounded-0  mb-2'
                />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-6 pr-1'>
                <label htmlFor=''> Education: </label>
                <select
                  name=''
                  className='form-control'
                  value={workerForm.education}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      education: e.target.value,
                    })
                  }
                >
                  <option value=''>آپ کی تعلیم یہاں</option>
                  <option value='SSC'>SSC</option>
                  <option value='HSSC'>HSSC</option>
                  <option value='BS'>BS</option>
                  <option value='MS'>PHD</option>
                </select>
              </div>
              <div className='col-6 pl-1'>
                <label htmlFor=''> Age: </label>
                <input
                  required
                  type='number'
                  min={18}
                  value={workerForm.age}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      age: e.target.value,
                    })
                  }
                  placeholder='اپنا عمر یہاں لکھیں'
                  className='form-control rounded-0  mb-2'
                />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-6 pr-1'>
                <label htmlFor=''> Experience: </label>
                <select
                  name=''
                  className='form-control'
                  value={workerForm.experience}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      experience: e.target.value,
                    })
                  }
                >
                  <option value=''>Experience</option>
                  <option value='6 Month'>6 Month</option>
                  <option value='1 Year'>1 Year</option>
                  <option value='2 Years'>2 Years</option>
                  <option value='3 Years'>3 Years</option>
                  <option value='3+ Years'>3+ Years</option>
                </select>
              </div>
              <div className='col-6 pl-1'>
                <label htmlFor=''> Cnic Number (4523232323232): </label>
                <input
                  type='text'
                  value={workerForm.cnic_no}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      cnic_no: e.target.value,
                    })
                  }
                  placeholder='اپنا نام یہاں لکھیں'
                  className='form-control rounded-0  mb-2'
                />
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-6 pr-1'>
                <label htmlFor=''> Picture: </label>
                {/* <input required type="file" value={workerForm.picture} onChange={ e => setWorkerForm({...workerForm, picture: e.target.value })}  placeholder="اپنا نام یہاں لکھیں" className="form-control rounded-0  mb-2"/> */}
                <input
                  required
                  type='file'
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      picture: e.target.files[0],
                    })
                  }
                  placeholder='آپ کی تصویر'
                  className='form-control rounded-0  mb-2'
                />
              </div>
              <div className='col-6 pl-1'>
                <label htmlFor=''> CNIC Pics: </label>
                {/* <input required type="file" value={workerForm.cnic_pic} onChange={ e => setWorkerForm({...workerForm, cnic_pic: e.target.value })}  placeholder="اپنا نام یہاں لکھیں" className="form-control rounded-0  mb-2"/> */}
                <input
                  required
                  type='file'
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      cnic_pic: e.target.files[0],
                    })
                  }
                  placeholder='پ کی تصویر'
                  className='form-control rounded-0  mb-2'
                />
              </div>
            </div>

            <div className='row my-4'>
              <div className='col-md-12'>
                <label> Enter something about yourself: </label>
                <textarea
                  required
                  type='text'
                  placeholder='کچھ آپ کے بارے میں'
                  value={workerForm.bio}
                  onChange={(e) =>
                    setWorkerForm({
                      ...workerForm,
                      bio: e.target.value,
                    })
                  }
                  className='form-control'
                  rows='4'
                ></textarea>
              </div>
            </div>

            <input
              type='submit'
              className='btn btn-block bg-pri text-white mb-5 rounded-0'
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateWorker;
