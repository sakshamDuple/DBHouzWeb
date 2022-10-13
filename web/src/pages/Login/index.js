import React from 'react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { RestUser } from "../../rest";
import { useDispatch } from "react-redux";
import { stateActions } from "../../redux/stateActions";
import { Modal, Offcanvas, Dropdown, Container, Row, Col } from "react-bootstrap";

const Login = ({setModelshowLogin,afterLogin}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [logins, loginModel] = useState(true);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const handlelogin = (e) => {
        e.preventDefault();
        if (loginEmail === " " || undefined) {
            return setError(`Please enter a Email`);
        }
        if (loginPassword === " " || undefined) {
            return setError(`Please enter a Password`);
        }
        RestUser.userLogin(loginEmail, loginPassword)
            .then(({ user, token }) => {
                console.log(`Got 2`);
                dispatch(stateActions.setUser("user", user, token));
                setModelshowLogin(false);
                afterLogin(token)
                loginModel(false);
            })
            .catch((e) => setError(e.message));
    }
    return (
        <Modal
            size="lg"
            show={logins}
            onHide={() => {
               setModelshowLogin(false);
                loginModel(false)
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="offcanvasHeader offcanvas-header">
                <Modal.Title
                    id="example-modal-sizes-title-lg"
                    className="signUpLoginTitle"
                >
                    <h3>Login</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="offcanvasBody">
                    <div className="signUpBlk">
                        <div className="signupHdng">
                            <h5>Welcome back</h5>
                            <h4>Login to your account</h4>
                        </div>
                        <div className="sigUpLgnForm">
                            <form className="formStyle">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="fullNameFld" className="form-label pt-3">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                            placeholder="info@Dbhouz.com"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="fullNameFld" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            placeholder="Password"
                                        />
                                    </div>

                                    <div className="col">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="rememberCheck"
                                            />
                                            <label className="form-check-label" htmlFor="rememberCheck">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    {/* <div className="col-auto forgotPaswdInfo">
                                        <Link
                                            to="/"
                                            onClick={() => {
                                                forgotModel(true);
                                                loginModel(false);
                                                return;
                                            }}
                                        >
                                            Forgot password?
                                        </Link>
                                    </div> */}
                                </div>
                                <div className="row">
                                    {error && <p className="text-danger">* {error}</p>}
                                    <div className="col-3 mt-3">
                                        <button
                                            type="submit"
                                            className="btn btnCommon btnRadiusNone w-100"
                                            onClick={handlelogin}
                                        >
                                            Login{" "}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />
                    <div className="registrSocial">
                        <div className="row d-flex align-items-center mt-4">
                            <div className="col-auto signupHdng">
                                <h4>Login with social</h4>
                            </div>
                            <div className="col">
                                <Link
                                    to="https://www.facebook.com/"
                                    target="_blank"
                                    className="faceBook"
                                >
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                </Link>
                                <Link
                                    to="https://www.gmail.com/"
                                    target="_blank"
                                    className="gmail"
                                >
                                    <i className="fa fa-google-plus" aria-hidden="true"></i>
                                </Link>
                                <Link
                                    to="https://www.gmail.com/"
                                    target="_blank"
                                    className="otherEmail"
                                >
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="register-question mt-4">
                        <span className="create-account-text pt-3">
                            you don't have an account
                            <Link
                                to="/"
                                onClick={() => {
                                    registerShow(true);
                                    loginModel(false);
                                    return;
                                }}
                            >
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
export default Login;