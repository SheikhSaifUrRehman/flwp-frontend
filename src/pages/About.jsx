import React, { useEffect, useState } from "react";
import Banngerimg1 from "./../assets/img/body-bg.jpg";
import LightBackImg from "./../assets/img/light_back.jpg";
import WorkerImg1 from "./../assets/img/me.png";
// import WorkerImg2 from './../assets/img/umad.jpg';
import logoImg from "./../assets/img/fypl.png";
import CountUp from "react-countup";
import JoinTeam from "./../Components/JoinTeam";

import { setTeamModal } from "./../actions/modals";
import { useDispatch } from "react-redux";
import axios from "axios";
import { path } from "../path";

import Skeleton from "react-loading-skeleton";
import { Tooltip } from "@material-ui/core";

function About() {
  const dispatch = useDispatch();
  const [stats, setStats] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${path}api/workers/all`);
        // setStats(res.data.workers.length);

        const res2 = await axios.get(`${path}api/users/all`);

        // setStats([res.data.workers.length, res2.data.users]);
      } catch (err) {
        alert(err.message);
      }
    })();
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="sec-1-about">
        <div className="container-fluid px-0">
          <div
            className="back_img"
            style={{
              backgroundImage: `url(${Banngerimg1})`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="overlay h-100 w-100">
              <div className="p-abs">
                <h1 className="text-white text-center">
                  Revolutionizing Everyday Work
                </h1>
                <p className="lead text-center text-white">
                  FreeLancer Workplace is arguably the best thing to come out of
                  the modern day tech revolution. Hiring a Tasker can really
                  help make every facet of your life a breeze.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-2-about pt-5">
        <div className="container text-center">
          <div
            className=" mb-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img src={logoImg} style={{ width: 300 }} alt="img" />
          </div>
          <h1 className="mb-3">Get More Done in Less Time</h1>
          <p className="lead">
            Our same-day service platform instantly connects you with skilled
            Taskers to help with odd-jobs and errands, so you can be more
            productive, every day
          </p>
        </div>
      </div>

      <div className="sec-3-about pt-5">
        <div className="container-fluid px-0">
          <div
            className="back_img"
            style={{ backgroundImage: `url(${LightBackImg})` }}
          >
            <div className="container h-100">
              <div className="row h-100  justify-content-center align-items-center">
                <div className="col-md-4 text-center">
                  {/* {stats?.[0]} */}
                  {stats ? (
                    <h4>
                      {" "}
                      <CountUp end={stats?.[0]} />
                    </h4>
                  ) : (
                    <Skeleton width={50} height={30} />
                  )}
                  <p className="lead">Workers</p>
                </div>
                <div className="col-md-4 text-center">
                  <h4>
                    {" "}
                    {stats ? (
                      <CountUp end={stats[1]} />
                    ) : (
                      <Skeleton width={50} height={30} />
                    )}
                  </h4>
                  <p className="lead">Customers</p>
                </div>
                <div className="col-md-4 text-center">
                  {stats ? (
                    <h4>
                      {" "}
                      <CountUp end={1500} />
                    </h4>
                  ) : (
                    <Skeleton width={50} height={30} />
                  )}
                  <p className="lead">Daily Visits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-4-about pt-5">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-6">
              <div className="text-center">
                <div
                  style={{ backgroundImage: `url(${WorkerImg1})` }}
                  className="back_img m-auto mb-4 rounded-circle"
                  alt=""
                ></div>
                <h5 className="font-weight-bold text-center mt-3">
                  Saif ur Rehman{" "}
                </h5>
                <p>Software Engineer | Javascripts | Nodejs| ReactJS | MERN </p>
              </div>
            </div>
            {/* <div className='col-md-6'>
              <div className='text-center'>
                <div
                  style={{
                    backgroundImage: `url(${'https://imgur.com/KjisMDm.png'})`,
                  }}
                  className='back_img m-auto mb-4 rounded-circle'
                  alt=''
                ></div>
                <h5 className='font-weight-bold text-center mt-3'>
                  {' '}
                  Umad Ahmad{' '}
                </h5>
                <p>React Js | Node Js | Freelancer at Fiverr</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="sec-5-about pt-5">
        <div className="container-fluid px-0">
          <div
            className="back_img"
            style={{ backgroundImage: `url(${Banngerimg1})` }}
          >
            <div className="p-abs p-5 bg-white rounded">
              <h4 className="mb-3">Join Our Team</h4>
              <p className="lead mb-4">
                Want to work for the company that’s revolutionizing everyday
                work
              </p>
              <Tooltip title="We are currently not hiring.">
                <span className="btn header-btn rounded-0 rounded px-3">
                  Become one of us
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <JoinTeam />
    </div>
  );
}

export default About;
