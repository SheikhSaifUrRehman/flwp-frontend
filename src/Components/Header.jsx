import React from "react";

import logoImg from "./../assets/img/fypl.png";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "./Login";
import Signup from "./Signup";
import VerificationModal from "./VerificationModal";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/users";
import { setLoginModal, setSignupModal } from "../actions/modals";

import NotificationPopover from "./NotificationsPopover";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isWorker = useSelector((state) => state.user.user.isWorker);

  return (
    <div>
      <div className="position-fixed">
        <span className=" rounded-pill py-1 px-4 btn text-white  bg-pri ">
          <i class="ri-question-fill"></i>
        </span>
      </div>

      <div className="container px-md-0">
        <Navbar bg="light" expand="lg" className="px-0">
          <Navbar.Brand to="/">
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img src={logoImg} style={{ width: 70 }} alt="asfe" />
              <Typography
                variant="h3"
                style={{
                  color: "#0076C0",
                }}
              >
                FreeLancer Workplace
              </Typography>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" style={{ display: "flex", alignItems: "center" }}>
              {isLoggedIn ? (
                <>
                  <Nav.Link>
                    <Link to="/" className="text-secondary">
                      Home
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/workers" className="text-secondary">
                      Workers
                    </Link>
                  </Nav.Link>
                  {/* <Nav.Link>
                    <Link to='/add-bid' className='text-secondary'>
                      Add User Request
                    </Link>
                  </Nav.Link> */}
                  <Nav.Link>
                    <Link to="/services" className="text-secondary">
                      Services
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/user-requests" className="text-secondary">
                      User Requests
                    </Link>
                  </Nav.Link>

                  <Nav.Link className="text-secondary">
                    <Button
                      onClick={() => {
                        dispatch(logoutUser());
                        toast.success("Logout success");
                      }}
                    >
                      Logout
                    </Button>
                  </Nav.Link>
                  <NotificationPopover />
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Profile">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Profile"
                          src={user.imageUrl}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem style={{ backgroundColor: "lightblue"}} onClick={handleCloseUserMenu}>
                        <Typography  textAlign="center">{user.isWorker ? "Worker" : "Buyer"}</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{user.name}</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                  {!isWorker && (
                    <Nav.Link>
                      <Link
                        to="/create-worker"
                        className="btn header-btn rounded-0 px-3"
                      >
                        Become a Worker
                      </Link>
                    </Nav.Link>
                  )}
                </>
              ) : (
                <>
                  <Nav.Link>
                    <Link to="/" className="text-secondary">
                      Home
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/workers" className="text-secondary">
                      Workers
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/user-requests" className="text-secondary">
                      User Requests
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/services" className="text-secondary">
                      Services
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="" className="text-secondary">
                    <Button onClick={() => dispatch(setLoginModal(true))}>
                      Login
                    </Button>
                  </Nav.Link>
                  <Nav.Link href="" className="text-secondary">
                    <Button onClick={() => dispatch(setSignupModal(true))}>
                      SignUp
                    </Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <Login />

      <Signup />

      <VerificationModal />
    </div>
  );
};

export default Header;
