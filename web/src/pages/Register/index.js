import React from 'react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { RestUser } from "../../rest";
import { useDispatch } from "react-redux";
import { stateActions } from "../../redux/stateActions";
import { Modal, Offcanvas, Dropdown, Container, Row, Col } from "react-bootstrap";
const Register = ({props}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUp, registerShow] = useState(true);
    const [checked, setChecked] = useState(true);
    const [error, setError] = useState();
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        return String(password)
            .match(
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
            );
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!email || !validateEmail(email)) {
            return setError(`Please enter a valid Email`);
        }
        if (!password || !validatePassword(password)) {
            return setError(`Please enter a valid Password`);
        }
        if (password !== confirmPassword) {
            return setError(`Passwords do not match`);
        }
        if (checked !== true) {
            return setError(`Please accept ourTerms of use and ourPrivacy policy `);
        }
        RestUser.userSignup(email, password)
            .then((res) => {
                console.log(`Got 1bhrtgnyntym`);
                console.log(res);
                RestUser.userLogin(email, password)
                    .then(({ user, token }) => {
                        RestUser.updateUser(user, token)
                            .then((res) => {
                                console.log(`Got 3`);
                                console.log(res);
                                return (
                                    dispatch(stateActions.setUser("user", user, token))
                                );
                            })
                            .catch((e) => setError(e.message));
                    })
                    .catch((e) => setError(e.message));
                // navigate(`/checkout`);
                props.setModelshow(false);
                registerShow(false);

            })
            .catch((e) => {
                console.error(e);
                setError(`Registration Failed`);
            });
    };

    return (
        <Modal
            size="lg"
            show={signUp}
            onHide={() => {
                props.setModelshow(false);
                registerShow(false)               
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="offcanvasHeader offcanvas-header">
                <Modal.Title
                    id="example-modal-sizes-title-lg"
                    className="signUpLoginTitle"
                >
                    <h3>Sign Up</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="offcanvasBody">
                    <div className="signUpBlk">
                        <div className="signupHdng">
                            <h5>Hello!</h5>
                            <h4>Sign Up to Get Started</h4>
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="fullNameFld" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                defaultChecked={checked}
                                                onChange={() => setChecked(!checked)}
                                                className="form-check-input"
                                                id="acceptCheck"
                                            />
                                            <label className="form-check-label" htmlFor="acceptCheck">
                                                I accept our
                                                <Link to="/termconditions">Terms of use</Link> and our
                                                <Link to="/privacypolicy">Privacy policy</Link>
                                            </label>
                                        </div>
                                    </div>
                                    {error && <p className="text-danger">* {error}</p>}
                                    <div className="col-12">
                                        <div className="row d-flex align-items-center">
                                            <div className="col">
                                                <button
                                                    type="submit"
                                                    onClick={handleSignUp}
                                                    className="btn btnCommon btnRadiusNone "
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            {/* <div className="col-auto pull-right">
                                                <Link
                                                    to="/"
                                                    onClick={() => {
                                                        registerShow(false);
                                                        loginModel(true);
                                                        return;
                                                    }}
                                                >
                                                    Back To Login
                                                </Link>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />
                    <div className="registrSocial pb-3">
                        <Row className="row d-flex align-items-center mt-4">
                            <div className="col-auto signupHdng">
                                <h4>Sign Up with social</h4>
                            </div>
                            <Col>
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
                            </Col>
                        </Row>
                    </div>
                    {/* 
                           <div className="register-question mt-4">
                              <span className="create-account-text pt-3">you don't have an account <a href="/">Login</a></span>
                           </div>
                           */}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Register;