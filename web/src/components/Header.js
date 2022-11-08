import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Modal,
  Dropdown,
  Container,
  Row,
  Col,
  Offcanvas,
} from "react-bootstrap";
import RightArrow from "../img/rightArrowIcon.svg";
import { Rest, RestAdmin, RestUser, RestClient } from "../rest";
import { useDispatch, useSelector } from "react-redux";
import { stateActions } from "../redux/stateActions";
import deleteCart from "../assets/images/icons/deleteShoppingCart.svg";
import SetingUser from "../assets/images/settingIcons/userIcon.svg";
import Edit from "../assets/images/settingIcons/editIcon.svg";
import ChangePassword from "../assets/images/settingIcons/changePaswrd.svg";
import SetingLogout from "../assets/images/settingIcons/logout.svg";
import "../css/header.css";
import "./Header.css";
import axios from "../API/axios";
import NestedDropdown, {
  CustomMenu,
  CustomToggle,
  CustomToggle2,
} from "./NestedDropdown";
import NestedDropdown2 from "./NestedDropdown2";
function Header({ callback }) {
  const [path, setPath] = useState({
    home: "no",
    about: "no",
    cate: "no",
    shop: "no",
    blog: "no",
    cont: "no",
  });

  function handleHover() {
    switch (window.location.pathname) {
      case "/":
        setPath((prevState) => ({
          ...prevState,
          home: "",
        }));
        break;
      case "/about":
        setPath((prevState) => ({
          ...prevState,
          about: "",
        }));
        break;
      case "/category":
        setPath((prevState) => ({
          ...prevState,
          cate: "",
        }));
        break;
      case "/productlist":
        setPath((prevState) => ({
          ...prevState,
          shop: "",
        }));
        break;
      case "/bloglist":
        setPath((prevState) => ({
          ...prevState,
          blog: "",
        }));
        break;
      case "/contact":
        setPath((prevState) => ({
          ...prevState,
          cont: "",
        }));
        break;
    }
  }
  const categories = useSelector((s) => s.categories);
  const cart = useSelector((s) => s.cart);
  let cartTotalAmount = 0;
  cart?.forEach((i) => {
    let price = i.variant?.price;
    cartTotalAmount += price * i.quantity;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUp, registerShow] = useState(false);
  const [logins, loginModel] = useState(false);
  const [forgot, forgotModel] = useState(false);
  const [reset, resetModal] = useState(false);
  const [error, setError] = useState();
  const [checked, setChecked] = useState(true);

  const [getShowMenu, setShowMenu] = useState([]);
  const [searchEngine, setSearchEngine] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useSelector((s) => s.user);
  const [categoryM, setCategoryM] = useState(categories[0]);
  const location = useLocation();
  useEffect(() => {
    if (location?.state?.showSignup) {
      setShowSignUpModal(location?.state?.showSignup);
    }
  }, [location]);
  useEffect(() => {
    if (location?.state?.showLogin) {
      setShowSignUpModal(location?.state?.showLogin);
    }
  }, [location]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return String(password).match(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    );
  };

  // const CustomDropDown = ({ category }) => {
  //   console.log("category manvir", category)
  //   return 'manvir'
  //   return (<Dropdown>
  //     <Dropdown.Toggle variant="default" id="dropdown-basic">
  //       {category.category.name}
  //     </Dropdown.Toggle>
  //     <Dropdown.Menu>
  //       {category.subcategories.map((category1) => {
  //         console.log("category1", category1)
  //         return (
  //           <Dropdown.Item>
  //             'manvir'

  //           </Dropdown.Item>
  //         )
  //       })}
  //     </Dropdown.Menu>
  //   </Dropdown>)
  // }

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
        loginModel(false);
        navigate(`/`);
        // registerShow(false);
      })
      .catch((e) => setError(e.message));
  };

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
        console.log(`Got 1`);
        console.log(res);
        if (res == undefined) return setError(`This Email Already Exists`);
        RestUser.userLogin(email, password)
          .then(({ user, token }) => {
            console.log(`Got 2`);
            user.email = email;
            RestUser.updateUser(user, token)
              .then((res) => {
                console.log(`Got 3`);
                console.log(res);
                dispatch(stateActions.setUser("user", user, token));
                navigate(`/`);
              })
              .catch((e) => setError(e.message));
          })
          .catch((e) => setError(e.message));
        registerShow(false);
      })
      .catch((e) => {
        console.error(e);
        setError(`Registration Failed`);
      });
  };
  useEffect(() => {
    handleSelectOption();
  }, [searchEngine, selectOption]);

  // const handleSelectOption = async (e) => {
  //   // e.preventDefault();
  //   console.log("selectOption", selectOption);
  //   console.log("searchEngine", searchEngine);
  //   if (selectOption !== "") {
  //     let data = {
  //       categoryId: selectOption,
  //       searchVal: searchEngine,
  //     };
  //     try {
  //       let res = await axios.post(`/product/category/search`, data);
  //       console.log("res", res.data.fetches);
  //       setSearchData(res.data.fetches);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  // };

  const handleSelectOption = async (e) => {
    e.preventDefault();

    console.log("selectOption", selectOption);
    console.log("searchEngine", searchEngine);
    if (selectOption !== "") {
      let data = {
        categoryId: selectOption,
        searchVal: searchEngine,
      };
      try {
        let res = await axios.post(`/product/category/search`, data);

        console.log("res", res.data.fetches);
        setSearchData(res.data.fetches);
        const cat = categories?.find(
          (cata) => cata.category._id == selectOption
        );
        console.log(cat);
        if (callback) {
          callback(cat);
        }

        navigate(`/productlist`, {
          state: {
            category: cat,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    } else {
      navigate(`/productlist`);
    }
  };
  const searchChange=async(e)=>{
    setSearchEngine(e.target.value)

    if (selectOption !== "") {
      let data = {
        categoryId: selectOption,
        searchVal: searchEngine,
      };
      try {
        let res = await axios.post(`/product/category/search`, data);
        setSearchData(res.data.fetches);
      } catch (error) {
        
      }

    }else{
      alert("choose any category")
    }
   
  
  }

  function handledropdown(categoryId) {
    console.log("categoryId", categoryId);
    RestClient.getCategoryDropdown(categoryId)
      .then((res) => {
        // setShowMenu(res.fetches)
        console.log("resjasfjdjj", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function showMenu(category) {
    // handledropdown(category.category._id)
    console.log("toShow", getShowMenu);
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="blueBg p-4 h-100">
            {console.log("jug", getShowMenu?.products?.name)}
            <h3 className="m-0">{category?.category?.name}</h3>
            <hr />
            <ul className="">
              <li>Tyrone Burt</li>
              <li>
                <Link to="">Regina Moreno</Link>
              </li>
              <li>
                <Link to="">Tyrone Burt</Link>
              </li>
              <li>
                <Link to="">Regina Moreno</Link>
              </li>
              <li>
                <Link to="">Tyrone Burt</Link>
              </li>
              <li>
                <Link to="">Regina Moreno</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="px-4 py-3">
            <h3 className="m-0">Popular Product</h3>
            <hr />
            <ul className="">
              <li>
                <Link to="">Carla Meyers</Link>
              </li>
              <li>
                <Link to="">Martin Barron</Link>
              </li>
              <li>
                <Link to="">Pankaj Tiles</Link>
              </li>
              <li>
                <Link to="">Martin Barron</Link>
              </li>
              <li>
                <Link to="">Carla Meyers</Link>
              </li>
              <li>
                <Link to="">Martin Barron</Link>
              </li>
              <li>
                <Link to="">Pankaj Tiles</Link>
              </li>
              <li>
                <Link to="">Martin Barron</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  const handleNavtigate = async (e, productId) => {
    e.preventDefault();
    try {
      let res = await axios.get(`/product/getOne/${productId}`);
      console.log("res", res.data.product);
      navigate("/productdetail", { state: { product: res.data.product } });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleProductApi = (e, id) => {
    setProductList([]);
    e.preventDefault();
    console.log("button");
    RestClient.getCategoryDropdown(id)
      .then((res) => {
        setProductList(res.data);
        console.log("resjasfjdjj", res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleProductApp = (id) => {
    setProductList([]);
    e.preventDefault();
    RestClient.getCategoryDropdown(id)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  console.log(categories[0]?.subCategories[0]?._id);
  // handleProductApp(categories[0].subCategories[0]._id)

  return (
    <header className="mainHeader wrapper">
      <article className="topBar blueBg">
        <Container>
          <Row className="row d-flex align-items-center justify-content-between">
            <Col className="d-none d-sm-block">
              <div className="topHdrWelcomeMsg">
                <p className="textWhite">
                  Welcome To DBHouz |{" "}
                  <span>
                    <Link to="/productlist">
                      Shop Now <img src={RightArrow} alt="Arrow" />{" "}
                    </Link>
                  </span>
                </p>
              </div>
            </Col>
            <Col className="col-md-auto">
              <div className="tpBarRightCol d-flex">
              {user.jwt ? (
                  <div className="userContnt-name" style={{ width: "200px" }}>
                    <Dropdown className="header-fix">
                      <Dropdown.Toggle className="notificatnCol w-100 p-0 border-0" id="dropdown-basic">
                        <div className="userContnt ">
                          <div className="">
                            <span className="m-0">Welcome</span>{" "}
                            {Boolean(user?.user?.firstName) && (
                              <span className="m-0">{user?.user?.firstName}</span>
                            )}
                            {!Boolean(user?.user?.firstName) && <span className="m-0">User</span>}
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item >
                          <Link to="/myaccount" className="viewProfile">
                            <span>
                              <img src={SetingUser} alt="" height="13" />
                            </span>{" "}
                            View Profile
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item >
                          <Link to="/orderhistory" className="viewProfile">
                            <span>
                              {/* <img src={Edit} alt="" height="13" /> */}
                              <i className="fa fa-shopping-cart"></i>
                            </span>{" "}
                            Order History
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item >
                          <Link to="/transactions" className="viewProfile">
                            <span>
                              {/* <img src={ChangePassword} alt="" height="13" /> */}
                              <i className="fa fa-money"></i>
                            </span>{" "}
                            Transactions
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item >
                          <Link to="/accountsetting" className="viewProfile">
                            <span>
                              {/* <img src={ChangePassword} alt="" height="13" /> */}
                              <i className="fa fa-key"></i>
                            </span>{" "}
                            Account Setting
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div className="viewProfile"
                            onClick={() => {
                              dispatch(stateActions.logout());
                              navigate("/");
                            }}
                          >
                            <span>
                              <img src={SetingLogout} alt="" height="13" />
                            </span>{" "}
                            Logout
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <div className="loginSignUpRow textWhite">
                    <Link to="/" onClick={() => loginModel(true)}>
                      Login
                    </Link>
                    /
                    <Link to="/" onClick={() => registerShow(true)}>
                      Register
                    </Link>
                  </div>
                )}
                {/* Register-Modal */}
                <Modal
                  size="lg"
                  show={showSignUpModal ? showSignUpModal : signUp}
                  onHide={() => {
                    registerShow(false);
                    setShowSignUpModal(false);
                    navigate("/", { state: { showSignup: false } });
                  }}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header
                    closeButton
                    className="offcanvasHeader offcanvas-header"
                  >
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
                                <label
                                  htmlFor="fullNameFld"
                                  className="form-label pt-3"
                                >
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
                                <label
                                  htmlFor="fullNameFld"
                                  className="form-label"
                                >
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
                                <label
                                  htmlFor="fullNameFld"
                                  className="form-label"
                                >
                                  Confirm Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
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
                                  <label
                                    className="form-check-label"
                                    htmlFor="acceptCheck"
                                  >
                                    I accept our
                                    <Link to="/termconditions">
                                      Terms of use
                                    </Link>{" "}
                                    and our
                                    <Link to="/privacypolicy">
                                      Privacy policy
                                    </Link>
                                  </label>
                                </div>
                              </div>
                              {error && (
                                <p className="text-danger">* {error}</p>
                              )}
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
                                  <div className="col-auto pull-right">
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
                                  </div>
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
                              <i
                                className="fa fa-facebook"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <Link
                              to="https://www.gmail.com/"
                              target="_blank"
                              className="gmail"
                            >
                              <i
                                className="fa fa-google-plus"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <Link
                              to="https://www.gmail.com/"
                              target="_blank"
                              className="otherEmail"
                            >
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              ></i>
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
                {/* Login-Modal */}
                <Modal
                  size="lg"
                  show={showLoginModal ? showLoginModal : logins}
                  onHide={() => {
                    loginModel(false);
                    setShowLoginModal(false);
                    navigate("/", { state: { showLogin: false } });
                  }}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header
                    closeButton
                    className="offcanvasHeader offcanvas-header"
                  >
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
                                <label
                                  htmlFor="fullNameFld"
                                  className="form-label pt-3"
                                >
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  value={loginEmail}
                                  onChange={(e) =>
                                    setLoginEmail(e.target.value)
                                  }
                                  placeholder="info@Dbhouz.com"
                                />
                              </div>
                              <div className="col-12">
                                <label
                                  htmlFor="fullNameFld"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  value={loginPassword}
                                  onChange={(e) =>
                                    setLoginPassword(e.target.value)
                                  }
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
                                  <label
                                    className="form-check-label"
                                    htmlFor="rememberCheck"
                                  >
                                    Remember me
                                  </label>
                                </div>
                              </div>
                              <div className="col-auto forgotPaswdInfo">
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
                              </div>
                            </div>
                            <div className="row">
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
                              <i
                                className="fa fa-facebook"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <Link
                              to="https://www.gmail.com/"
                              target="_blank"
                              className="gmail"
                            >
                              <i
                                className="fa fa-google-plus"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <Link
                              to="https://www.gmail.com/"
                              target="_blank"
                              className="otherEmail"
                            >
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              ></i>
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
                {/* Forgot Password */}
                <Modal
                  size="lg"
                  show={forgot}
                  onHide={() => forgotModel(false)}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header
                    closeButton
                    className="offcanvasHeader offcanvas-header"
                  >
                    <Modal.Title
                      id="example-modal-sizes-title-lg"
                      className="signUpLoginTitle"
                    >
                      <h3>Forgot Password</h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="offcanvasBody">
                      <div className="signUpBlk">
                        <div className="signupHdng">
                          <h5>Forgot Password</h5>
                          <h4>Request new password</h4>
                        </div>
                        <div className="sigUpLgnForm">
                          <form className="formStyle">
                            <div className="row g-3">
                              <div className="col-12">
                                <label
                                  htmlFor="fullNameFld"
                                  className="form-label pt-3"
                                >
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id=""
                                  placeholder="info@Dbhouz.com"
                                />
                              </div>
                              <div className="col-auto">
                                <Link
                                  to="/"
                                  className="btn btnCommon btnRadiusNone"
                                  onClick={() => {
                                    resetModal(true);
                                    forgotModel(false);
                                    return;
                                  }}
                                >
                                  Reset Password
                                </Link>
                              </div>
                              <div className="col-auto">
                                <button
                                  type="submit"
                                  className="btn btnCommon btnDark  "
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </form>
                          <p className="pt-3">
                            Lost your password? Please enter your email address.
                            You will receive a link to create a new password via
                            email.
                          </p>
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
                {/* Reset Password */}
                <Modal
                  size="lg"
                  show={reset}
                  onHide={() => resetModal(false)}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header
                    closeButton
                    className="offcanvasHeader offcanvas-header"
                  >
                    <Modal.Title
                      id="example-modal-sizes-title-lg"
                      className="signUpLoginTitle"
                    >
                      <h3>Reset Password</h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="offcanvasBody">
                      <div className="signUpBlk">
                        <div className="signupHdng">
                          <h5>Reset Password</h5>
                          <h4>Confirm New Password</h4>
                        </div>
                        <div className="sigUpLgnForm">
                          <form className="formStyle">
                            <div className="row g-3">
                              <div className="col-12">
                                <label
                                  htmlFor="fullNameFld"
                                  className="form-label pt-3"
                                >
                                  New Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id=""
                                  placeholder="******"
                                />
                              </div>
                              <div className="col-12">
                                <label
                                  htmlFor="fullNameFld"
                                  className="form-label"
                                >
                                  Confirm New Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id=""
                                  placeholder="******"
                                />
                              </div>
                              <div className="col-12">
                                <button
                                  type="submit"
                                  className="btn btnCommon btnRadiusNone "
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="register-question mt-4">
                        <span className="create-account-text pt-3">
                          you don't have an account
                          <Link
                            to="/"
                            onClick={() => {
                              registerShow(true);
                              resetModal(false);
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
                <div className="navBarIcons">
                  <Link to="/wishlist">
                    <img src="/img/wishListIcon.svg" alt="WishList" />
                  </Link>
                  {/* <Link to="/" onClick={() =>
                     loginModel(true)}>
                     <img src="img/loginIcon.svg"  alt="Login" /></Link> */}
                </div>
                <div className="hdrScl">
                  <Link to="https://www.facebook.com/" target="_blank">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </Link>
                  <Link to="https://www.instagram.com/" target="_blank">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </Link>
                  <Link to="https://www.linkedin.com/" target="_blank">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </article>
      <article className="hdrLogoRow">
        <Container>
          <Row className="row align-items-center justify-content-between">
            <div className="col-md-3">
              <div className="logo">
                <Link to="/">
                  <img src="/img/logo.png" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-md">
              <div className="hdrSeachBlk">
                <form className="advncSearchForm">
                  <div className="row">
                    <div className="col-sm-auto">
                      <div className="form-group">
                        <select
                          name="option"
                          onChange={(e) => setSelectOption(e.target.value)}
                          className="form-select dp-headerFormSelect"
                        >
                          <option value="none" selected disabled hidden>
                            Select an Option
                          </option>
                          {categories.map((option) => {
                            return (
                              <option value={option.category._id}>
                                {option.category.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="form-group ">
                        <input
                          type="text"
                          value={searchEngine}
                          className="form-control"
                          // onChange={(e) => setSearchEngine(e.target.value)}
                          onChange={searchChange}
                        />
                        <div className="db-searchList-main">
                          {searchData[0]?.products?.map((product) => {
                            console.log("product", product);

                            return (
                              <div
                                onClick={(e) => handleNavtigate(e, product._id)}
                                className="db-searchList"
                              >
                                {product.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div className="form-group">
                        <button
                          className="btnCommon btnDark"
                          onClick={(e) => handleSelectOption(e)}
                        >
                          Search <img src="/img/searchIcon.svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-auto d-flex align-items-center">
              <div className="InstantBtn">
                <NavLink to="/instantquote" className="btnCommon btnDark ">
                  Instant Quote
                </NavLink>
              </div>
              <div className="cartProductBlk" style={{ zIndex: 100000 }}>
                <Dropdown>
                  <Dropdown.Toggle variant="btn" id="dropdown-basic">
                    <div className="cartBtn">
                      <img src="/img/cartIcon.svg" />{" "}
                      {cart?.length > 0 && <span>{cart?.length}</span>}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {cart?.map((cartItem) => (
                      <Dropdown.Item>
                        <div className="row d-flex justify-content-between">
                          <div className="col-sm-3">
                            <div className="shopping-cart-img">
                              <Link to="/productdetail">
                                <img
                                  alt="product"
                                  src={
                                    cartItem.product?.images[0]
                                      ? `${Rest}/documents/get/${cartItem.product?.images[0].documentId}`
                                      : `/img/productImg1.jpg`
                                  }
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="col-sm-9">
                            <div className="shopping-cart-title pr-0">
                              <h4>
                                <Link to="/productdetail">
                                  {cartItem.product?.name}
                                  <br /> LacqueredFloor
                                  <br /> 18 x 125mm 2.2m²{" "}
                                </Link>
                              </h4>
                              <h5
                                onClick={(e) => {
                                  dispatch(
                                    stateActions.removeCartItem(
                                      cartItem.product?._id
                                    )
                                  );
                                }}
                              >
                                <span>{cartItem.quantity} × </span>$
                                {cartItem.variant?.price*82/100}
                              </h5>
                            </div>
                          </div>
                          {/* <div className="col-auto"> */}
                          <div className="shopping-cart-delete">
                            {/* <Link to="/"> */}
                            <img
                              src={deleteCart}
                              alt=""
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(
                                  stateActions.removeCartItem(
                                    cartItem.product._id
                                  )
                                );
                              }}
                            />
                            {/* </Link> */}
                          </div>
                          {/* </div> */}
                        </div>
                      </Dropdown.Item>
                    ))}

                    <div className="shopping-cart-footer">
                      <div className="shopping-cart-total">
                        <h4>
                          Total <span>£{cartTotalAmount*82/100}</span>
                        </h4>
                      </div>
                      <div className="shopping-cart-button">
                        <Link to="/cart" className="btnCommon btnDark ">
                          View cart
                        </Link>
                        <Link to="/checkout" className="btnCommon">
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Row>
        </Container>
      </article>
      <article className="hdrNavRow">
        <Container>
          <Row className="row align-items-center justify-content-between">
            {/* <div className="col-md-auto">
              <div className="hdrLeft">
                <div className="categoryBlk">
                  <div className="categorydropDown categoryDropdownNew">
                    <Dropdown autoClose={false}>
                      <Dropdown.Toggle variant="default" id="dropdown-basic">
                        <img src="/img/catIcon.svg" /> Categories
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {categories.map((category) => {
                          return (
                            <Dropdown.Item href="#/action-1">
                              <Dropdown autoClose={false}>
                                <Dropdown.Toggle variant="default" id="dropdown-basic">
                                  <div className='d-flex align-items-center justify-content-between'  >
                                    <span> {category?.category?.name}</span>
                                    <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
                                  </div>
                                </Dropdown.Toggle>
                                <Dropdown autoClose={false}>
                                  <div className='dp-dropdown'>
                                    <div className="dp-dropdown-box box-shadow ">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="blueBg p-4 h-100">
                                            <h3 className="m-0">{category?.category?.name}</h3>
                                            <hr />
                                            <ul className=''>
                                              <li>Tyrone Burt</li>
                                              <li><Link to="" >Regina Moreno</Link></li>
                                              <li><Link to="" >Tyrone Burt</Link></li>
                                              <li><Link to="" >Regina Moreno</Link></li>
                                              <li><Link to="" >Tyrone Burt</Link></li>
                                              <li><Link to="" >Regina Moreno</Link></li>
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="px-4 py-3">
                                            <h3 className="m-0">Popular Product</h3>
                                            <hr />
                                            <ul className=''>
                                              <li><Link to="" >Carla Meyers</Link></li>
                                              <li><Link to="" >Martin Barron</Link></li>
                                              <li><Link to="" >Pankaj Tiles</Link></li>
                                              <li><Link to="" >Martin Barron</Link></li>
                                              <li><Link to="" >Carla Meyers</Link></li>
                                              <li><Link to="" >Martin Barron</Link></li>
                                              <li><Link to="" >Pankaj Tiles</Link></li>
                                              <li><Link to="" >Martin Barron</Link></li>
                                            </ul>
                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </Dropdown>
                              </Dropdown>
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-md-auto">
              <div className="hdrLeft">
                <div className="categoryBlk">
                  <div className="categorydropDown categoryDropdownNew">
                    <Dropdown autoClose="outside" alignRight>
                      <Dropdown.Toggle variant="default" id="dropdown-basic">
                        <img src="/img/catIcon.svg" /> Categories
                      </Dropdown.Toggle>
                      {/* <Dropdown.Menu className="dp-dropdown-main"> */}
                      {/* {categories.map((category) => {
                          return (
                            <Dropdown.Item className="dp-dropdown-main-a">
                              <Dropdown variant="primary" drop="end" autoClose="outside" >
                                <Dropdown.Toggle as={CustomToggle}>
                                  <div className='d-flex align-items-center justify-content-between'>
                                    <span> {category.category.name}{"  "}</span>
                                    <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
                                  </div>
                                </Dropdown.Toggle> */}
                      {/* {!click1 && <Dropdown.Menu align="end" as={CustomMenu} className="dp-dropdown-box box-shadow blueBg p-4" alignRight>
                                  {category.subCategories.map((subCat) => {
                                    return (
                                      <Dropdown.Item >
                                        {category.subCategories.map((subCategory) => {
                                          return (<Dropdown variant="primary" drop="end" className="h-100">
                                            <Dropdown.Toggle as={CustomToggle2} >
                                              {!click2 ? <div onClick={(e) => handleProductApi(e, subCategory._id)} className='row h-100'>
                                                <div className="col-md-6">
                                                  <div className="blueBg p-4 h-100">
                                                    <h3 className="m-0 text-white">{category.category.name}</h3>
                                                    <ul >
                                                      <li >
                                                        <span > {subCategory.name}{"  "}</span>
                                                        <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="py-4">
                                                    <h3 className="m-0">Popular Product</h3>
                                                    {console.log('dddd', productList)}
                                                    <Dropdown.Menu align="end" as={CustomMenu} className="@dp-dropdown-box show dropdown-menuProduct dropdown-menu @box-shadow p-4 border-0">
                                                      {productList.map(prod => {
                                                        return (<Dropdown.Item onClick={() => navigate("/productdetail", { state: { product: prod } })}>{prod.name}
                                                        </Dropdown.Item>)
                                                      })}
                                                    </Dropdown.Menu>
                                                  </div>
                                                </div>
                                              </div> :
                                                <div onClick={(e) => handleProductApi(e, subCategory._id)} className='row h-100'>
                                                  <div className="col-md-6">
                                                    <div className="blueBg p-4 h-100">
                                                      <h3 className="m-0 text-white">{category.category.name}</h3>
                                                      <ul >
                                                        <li >
                                                          <span > {subCategory.name}{"  "}</span>
                                                          <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="py-4">
                                                      <h3 className="m-0">Popular Product</h3>
                                                      {console.log('dddd', productList)}
                                                      <Dropdown.Menu align="end" as={CustomMenu} className="@dp-dropdown-box show dropdown-menuProduct dropdown-menu @box-shadow p-4 border-0">
                                                        {productList.map(prod => {
                                                          return (<Dropdown.Item onClick={() => navigate("/productdetail", { state: { product: prod } })}>{prod.name}
                                                          </Dropdown.Item>)
                                                        })}
                                                      </Dropdown.Menu>
                                                    </div>
                                                  </div>
                                                </div>}
                                            </Dropdown.Toggle>
                                          </Dropdown>
                                          )
                                        })}
                                      </Dropdown.Item>
                                    );
                                  })}
                                </Dropdown.Menu>} */}
                      {/* {!click1 && <Dropdown.Menu align="end" as={CustomMenu} className="dp-dropdown-box box-shadow blueBg p-4" alignRight>
                                  <div className='row h-100'>
                                    <div className="col-md-4">
                                      <div className="redBg py-4">
                                        <Dropdown.Menu align="end" as={CustomMenu} className="@dp-dropdown-box show dropdown-menuProduct dropdown-menu @box-shadow p-4 border-0">
                                          <span> {category.category.name}{"  "}</span>
                                          <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
                                        </Dropdown.Menu>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="blueBg p-4 h-100">
                                        <h3 className="m-0 text-white">{category.category.name}</h3>
                                        <ul>
                                          {category.subCategories.map((SubCategory) => {
                                            return (<div onClick={(e) => handleProductApi(e, SubCategory._id)} className='row h-100'>
                                              <li>
                                                <span > {SubCategory.name} </span>
                                                <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
                                              </li>
                                            </div>)
                                          })}
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="py-4">
                                        <h3 className="m-0">Popular Product</h3>
                                        <Dropdown.Menu align="end" as={CustomMenu} className="@dp-dropdown-box show dropdown-menuProduct dropdown-menu @box-shadow p-4 border-0">
                                          {productList.map(prod => {
                                            return (
                                              <Dropdown.Item onClick={() => navigate("/productdetail", { state: { product: prod } })}>
                                                {prod.name}
                                              </Dropdown.Item>
                                            )
                                          })}
                                        </Dropdown.Menu>
                                      </div>
                                    </div>
                                  </div>
                                </Dropdown.Menu>}
                              </Dropdown>
                            </Dropdown.Item>
                          );
                        })} */}
                      {!click1 && (
                        <Dropdown.Menu
                          align="end"
                          as={CustomMenu}
                          className="dp-dropdown-box box-shadow dp-dropdown-box-first blueBg p-4"
                          alignRight
                        >
                          <div className="row h-100">
                            <div className="col-md-4 position-relative pr-0">
                              <div className="redBg py-4@">
                                <Dropdown.Menu
                                  align="end"
                                  as={CustomMenu}
                                  className="@dp-dropdown-box show dropdown-menuProduct dropdown-menu @box-shadow p-4 border-0 w-100"
                                >
                                  <ul>
                                    {categories.map((category) => {
                                      return (
                                        <li
                                          key={category?._id}
                                          className={
                                            categoryM.category._id ==
                                            category.category._id
                                              ? "catItemsactive"
                                              : "catItems"
                                          }
                                          onClick={() => {
                                            setCategoryM(category);
                                          }}
                                        >
                                          <span>
                                            {category.category.name}
                                            {"  "}
                                          </span>
                                          <i
                                            className="fa fa-caret-right ml-10"
                                            aria-hidden="true"
                                          ></i>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </Dropdown.Menu>
                              </div>
                            </div>
                            {categoryM && (
                              <div className="col-md-4 pl-0">
                                <div className="blueBg p-4 h-100">
                                  <h3 className="m-0 text-white">
                                    {categoryM?.category?.name}
                                  </h3>
                                  <ul>
                                    {categoryM?.subCategories?.map(
                                      (SubCategory) => {
                                        return (
                                          <div
                                            onClick={(e) =>
                                              SubCategory
                                                ? handleProductApi(
                                                    e,
                                                    SubCategory?._id
                                                  )
                                                : handleProductApi(
                                                    e,
                                                    categories[0]
                                                      .subCategories[0]._id
                                                  )
                                            }
                                            className="row h-100"
                                          >
                                            <li className="subCat">
                                              <span> {SubCategory?.name} </span>
                                              <i
                                                className="fa fa-caret-right ml-10"
                                                aria-hidden="true"
                                              ></i>
                                            </li>
                                          </div>
                                        );
                                      }
                                    )}
                                  </ul>
                                </div>
                              </div>
                            )}
                            {productList && (
                              <div className="col-md-4">
                                <div className="py-4">
                                  <h3 className="m-0">Popular Product</h3>
                                  <Dropdown.Menu
                                    align="end"
                                    as={CustomMenu}
                                    className="@dp-dropdown-box show dropdown-menuProduct dropdown-menu @box-shadow p-4 border-0"
                                  >
                                    {productList.map((prod) => {
                                      return (
                                        <Dropdown.Item
                                          onClick={() =>
                                            navigate("/productdetail", {
                                              state: { product: prod },
                                            })
                                          }
                                        >
                                          <span className="catItems">
                                            {prod.name}
                                          </span>
                                        </Dropdown.Item>
                                      );
                                    })}
                                  </Dropdown.Menu>
                                </div>
                              </div>
                            )}
                          </div>
                        </Dropdown.Menu>
                      )}
                      {/* </Dropdown.Menu> */}
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="hdrMenu">
                <ul>
                  <li className={`\active${path.home}`}>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className={`\active${path.about}`}>
                    <NavLink to="/about">About</NavLink>
                  </li>
                  <li className={`\active${path.cate}`}>
                    <NavLink to="/category">Category</NavLink>
                  </li>
                  <li className={`\active${path.shop}`}>
                    <NavLink to="/productlist">Shop</NavLink>
                  </li>
                  <li className={`\active${path.blog}`}>
                    <NavLink to="/bloglist">Blog</NavLink>
                  </li>
                  {/* <li>
                        <NavLink to="/">Portfolio</NavLink>
                     </li>
                     <li>
                        <NavLink to="/">LookBook</NavLink>
                     </li> */}
                  <li className={`\active${path.cont}`}>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-auto">
              <div className="specialOfer">
                <Link to="/">Special Offer</Link>
              </div>
            </div>
          </Row>
        </Container>
      </article>
    </header>
  );
}
export default Header;
