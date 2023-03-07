import React, { useEffect } from "react";
import "./assets/style/bootstrap.min.css";
import "./assets/style/style.scss";

import Home from "./pages/Home";
import CreateWorker from "./pages/CreateWorker";
import Services from "./pages/Services";
import Worker from "./pages/Worker";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Help from "./pages/Help";
import AddBid from "./pages/AddBid";
import Workers from "./pages/Workers";
import Search from "./pages/Search";
import userRequests from "./pages/userRequests";
import userRequest from "./pages/userRequest";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { Roller } from "react-css-spinners";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/users";
import { setSearchInfo as setWorkerSearchInfo } from "./actions/workers";
import { setSearchInfo as setUserRequestsSearchInfo } from "./actions/userRequests";
import ThemeConfig from "./theme";
import VideoCall from "./Components/video-call/index";
import { VideoCallProvider } from "./contexts/videoCallContext";
import UseAlan from "./Components/useAlan";
import WorkerProfile from "./pages/WorkerProfile";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(setWorkerSearchInfo());
    dispatch(setUserRequestsSearchInfo());
  }, []);
  
  const loading = useSelector((state) => state.isLoading.loading);

  return (
    <ThemeConfig>
      <div>
        {loading && (
          <div className="overlay-loading">
            <Roller color="#3366FF" className="loading-spinner" size={80} />
          </div>
        )}
        <BrowserRouter basename={"/FreeLancerMarketplace"}>
          <UseAlan />

          <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/create-worker" component={CreateWorker} />
              <Route path="/services" component={Services} />
              <Route path="/worker/:id" component={Worker} />
              <Route path="/worker/profile/:id" component={WorkerProfile} />
              <Route path="/user-request/:id" component={userRequest} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/help" component={Help} />
              <Route path="/add-bid" component={AddBid} />
              <Route path="/workers" component={Workers} />
              <Route path="/search" component={Search} />
              <Route path="/user-requests" component={userRequests} />
              <Redirect to="/" />
            </Switch>

          <Footer />
          <div className="position-fixed">
            <Link
              to="/help"
              className=" rounded-circle p-2 btn text-white  bg-pri"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.501 3.501 0 0 0-3.433 2.813l1.962.393A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2v-.645z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </Link>
          </div>
        </BrowserRouter>
      </div>
    </ThemeConfig>
  );
};

export default App;
