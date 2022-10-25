import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import axios from '../../API/axios';
import Pagination from '../../container/pagination/pagination';
import jwtDecode from "jwt-decode";
import { FreeMode, Navigation, Thumbs, Scrollbar, A11y } from "swiper";
import UserIcon from "../../img/filterIcon.svg";
const limit = 10;
function Transactions() {
  const [orderType, setOrderType] = useState()
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [TotalCount, setTotalCount] = useState(10);
  const [filtertranscation, setFilterTranscation] = useState([]);
  const [ApiData, setApiData] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const handleTransactions = (e) => {
    console.log("e", e);
    const { value, checked } = e.target;
    if (checked == true) {
      setFilterTranscation([...filtertranscation, value]);
    } else {
      setFilterTranscation(filtertranscation.filter((e) => e !== value));
    }
  }
  const handleStatus = (e) => {
    console.log("e", e);
    const { value, checked } = e.target;
    if (checked == true) {
      setFilterStatus([...filterStatus, value]);
    } else {
      setFilterStatus(filterStatus.filter((e) => e !== value));
    }
  }
  const getAllTransaction = async () => {
    try {
      if (userId == "") {
        return;
      }
      const res = await axios.get(`/order/getTransactionUser/action?Merchant=${userId}&OrderType=${orderType}&TransactionMethod=${filtertranscation}&page=${currentPage}&limit=${limit}&TransactionStatus=${filterStatus}`);
      console.log("res", res)
      const { data: { data, totalTransaction } = {} } = res || {};
      return setApiData(data), setTotalCount(totalTransaction);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getAllTransaction()
  }, [userId])
  useEffect(() => {
    getAllTransaction()
  }, [filtertranscation, filterStatus, orderType])
  useEffect(() => {
    let accessToken = window.localStorage.getItem("JWT");
    let n = jwtDecode(accessToken);
    const { user: { _id } = {} } = n || {};
    setUserId(_id);
  }, [])
  return (
    <section className="wrapper greyBg3 dashboardBlk ">
      <Header />
      <article className="categoryInrBlk hdrBrNone wrapper">
        <div className=" py-2 ">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-auto">
                <div className="breadcrumbsCol py-20">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item active">
                        <a href="/">Account Settings</a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 pb-4">
              <div className="sdbrWdgt ">
                <div className="filterSideBarWgt whtBg">
                  <div className="filtrAcordion drpDownAcountRow">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>
                          <span>
                            <img src={UserIcon} />
                          </span>{" "}
                          Filter Transactions
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="filtrList mb-2">
                            <form className="formStyle">
                              <ul>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      name="languages"
                                      value="CREDIT_CARD  "
                                      onClick={(e) => { handleTransactions(e) }}
                                      id="CREDIT_CARD "
                                    />
                                    <label className="form-check-label" htmlFor="CREDIT_CARD">
                                      Credit card
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      name="languages"
                                      value="DEBIT_CARD "
                                      onClick={(e) => { handleTransactions(e) }}
                                      id="DEBIT_CARD"
                                    />
                                    <label className="form-check-label" htmlFor="DEBIT_CARD">
                                      Debit card
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      name="languages"
                                      value="UPI "
                                      onClick={(e) => { handleTransactions(e) }}
                                      id="UPI"
                                    />
                                    <label className="form-check-label" htmlFor="UPI">
                                      UPI
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      name="languages"
                                      className="form-check-input"
                                      value="NET_BANKING "
                                      onClick={(e) => { handleTransactions(e) }}
                                      id="NET_BANKING"
                                    />
                                    <label className="form-check-label" htmlFor="banking">
                                      Net banking
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      name="languages"
                                      className="form-check-input"
                                      id="CASH_ON_DELIVERY "
                                      value="CASH_ON_DELIVERY "
                                      onClick={(e) => { handleTransactions(e) }}
                                    />
                                    <label className="form-check-label" htmlFor="cash">
                                      Cash
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </form>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Status</Accordion.Header>
                        <Accordion.Body>
                          <div className="filtrList mb-2">
                            <form className="formStyle">
                              <ul>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="successful"
                                      value="successful"
                                      onClick={(e) => { handleStatus(e) }}
                                    />
                                    <label className="form-check-label" htmlFor="successful">
                                      Successful
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="pending"
                                      value="pending"
                                      onClick={(e) => { handleStatus(e) }}
                                    />
                                    <label className="form-check-label" htmlFor="pending">
                                      Pending
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id=" unsuccessful"
                                      value="unsuccessful"
                                      onClick={(e) => { handleStatus(e) }}
                                    />
                                    <label className="form-check-label" htmlFor=" unsuccessful">
                                      Failed
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </form>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      {/* <Accordion.Item eventKey="2">
                        <Accordion.Header>Timeline</Accordion.Header>
                        <Accordion.Body>
                          <div className="filtrList mb-2">
                            <form className="formStyle">
                              <ul>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="timeline1"
                                    />
                                    <label className="form-check-label" htmlFor="timeline1">
                                      May 2022
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="timeline2"
                                    />
                                    <label className="form-check-label" htmlFor="timeline2">
                                      April 2022
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="timeline3"
                                    />
                                    <label className="form-check-label" htmlFor="timeline3">
                                      March 2022
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="form-check d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="timeline4"
                                    />
                                    <label className="form-check-label" htmlFor="timeline4">
                                      Older Transactions
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </form>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item> */}
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 pb-4">
              <div className="dashboard--main">
                <div className="dashboard--top pt-2 pb-1">
                  <h4>Transactions</h4>
                  <hr />
                </div>

                <div className="ordrHistyTabs">
                  <Tabs defaultActiveKey="All" className="mb-3">
                    <Tab eventKey="All" title="All Transactions " onChange={() => { setOrderType("Payment_Accepted") }}>
                      <div className="transctnListPage pt-4">
                        <div className="transctnListPrdct">
                          {
                            ApiData?.map((item, index) => {
                              console.log("item", item)
                              const {
                                transaction_Id, transaction_Method, status,
                                transaction_Date, amount_Of_Transaction,
                              } = item || {};
                              return (
                                <div key={index} className="row g-3 d-sm-flex align-items-center">
                                  <div className="col-auto">
                                    <div className="transctnListProMedia">
                                      <a href="/product-detail">
                                        <div className="transctnListProImg">
                                          <h3>
                                            <span>{status}</span>
                                          </h3>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="col mt-0">
                                    <div className="transctnListProInfo">
                                      <div className="transctnListTitle">
                                        <h4>
                                          <a href="/">{transaction_Id}</a>
                                        </h4>
                                      </div>
                                      <div className="transtnInfo">
                                        <p>{transaction_Method}</p>
                                        <p>
                                          <span>{moment(transaction_Date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto d-flex align-items-center">
                                    <div className="transtnPrice red">£{amount_Of_Transaction}</div>
                                  </div>
                                </div>
                              )
                            })
                          }

                        </div>
                        <div className="pgntnOuter d-flex flex-row-reverse pb-3">
                          <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={TotalCount}
                            pageSize={limit}
                            onPageChange={page => setCurrentPage(page)}
                          />
                        </div>
                        {/* <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice red">-£25</div>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice green">-£25</div>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice green">-£25</div>
                            </div>
                          </div>
                        </div>

                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice red">-£25</div>
                            </div>
                          </div>
                        </div>

                       */}
                      </div>
                    </Tab>
                    <Tab eventKey="Refunds" title="Refunds" onSelect={() => { setOrderType("Refund_Done") }}>
                      <div className="transctnListPage pt-4">
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice red">-£25</div>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice red">-£25</div>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice green">-£25</div>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice green">-£25</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    {/* <Tab eventKey="Cashbacks" title="Cashbacks">
                      <div className="transctnListPage pt-4">
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice red">-£25</div>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice red">-£25</div>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice green">-£25</div>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice green">-£25</div>
                            </div>
                          </div>
                        </div>

                        <hr className="mb-5" />
                        <div className="transctnListPrdct">
                          <div className="row g-3 d-sm-flex align-items-center">
                            <div className="col-auto">
                              <div className="transctnListProMedia">
                                <a href="/product-detail">
                                  <div className="transctnListProImg">
                                    <h3>
                                      DB<span>Houz</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col mt-0">
                              <div className="transctnListProInfo">
                                <div className="transctnListTitle">
                                  <h4>
                                    <a href="/">Paid on DBhouz</a>
                                  </h4>
                                </div>
                                <div className="transtnInfo">
                                  <p>DB houz Credit Card</p>
                                  <p>
                                    <span>02 May 2022, 05:25 PM</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                              <div className="transtnPrice red">-£25</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab> */}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="wrapper py-3 simiLarPrdctBlk prodctDtlSimilr">
        <div className="container">
          <div className="prdctDtlHdng">
            <h3>More Products To explore</h3>
          </div>
          <div className="newsSliderOuter">
            <div className="similarPrdctSlidr crslCntrls crslCntrls3">
              <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                navigation
                spaceBetween={2}
                slidesPerView={6}
                centeredSlides={false}
                loop={false}
              >
                <SwiperSlide>
                  <div className="similarItem ">
                    <div className="prdctListItem whiteBg">
                      <div className="prdctListMedia">
                        <div
                          className="prdctListImg"
                          style={{ backgroundImage: `url("img/productImg4.jpg")` }}
                        >
                          <div className="prdctListOverlay"></div>
                        </div>
                        <div className="prdctHovrCard">
                          <Link to="/">
                            <span className="prdctListWishListIcon">
                              <img src="img/wishListIconDark.svg" />
                            </span>
                          </Link>
                          <Link to="/">
                            <span className="prdctListIcon">
                              <img src="img/prdctListIcon.svg" />
                            </span>
                          </Link>
                        </div>
                        <div className="prdctHvrBtns">
                          <Link to="#" className="btnCommon">
                            Add To Cart
                          </Link>
                          <Link to="#" className="btnCommon btnWhite">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                      <div className="prodctListInfoCol text-center">
                        <div className="prdctListTitle">
                          <h4>
                            {" "}
                            <Link to="/">Scratch Resistant Prefab Kitchen...</Link>
                          </h4>
                        </div>
                        <div className="rvwRtngPrgrsStars">
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <span>(981)</span>
                        </div>
                        <div className="prdctListInfo">
                          <p>Eeiusmod tempor incididunt</p>
                        </div>
                        <div className="prodctDtlPrice d-flex justify-content-center">
                          <div className="price">$69.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="similarItem">
                    <div className="prdctListItem whiteBg">
                      <div className="prdctListMedia">
                        <div
                          className="prdctListImg"
                          style={{ backgroundImage: `url("img/productImg4.jpg")` }}
                        >
                          <div className="prdctListOverlay"></div>
                        </div>
                        <div className="prdctHovrCard">
                          <Link to="/">
                            <span className="prdctListWishListIcon">
                              <img src="img/wishListIconDark.svg" />
                            </span>
                          </Link>
                          <Link to="/">
                            <span className="prdctListIcon">
                              <img src="img/prdctListIcon.svg" />
                            </span>
                          </Link>
                        </div>
                        <div className="prdctHvrBtns">
                          <Link to="#" className="btnCommon">
                            Add To Cart
                          </Link>
                          <Link to="#" className="btnCommon btnWhite">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                      <div className="prodctListInfoCol text-center">
                        <div className="prdctListTitle">
                          <h4>
                            {" "}
                            <Link to="/">Scratch Resistant Prefab Kitchen...</Link>
                          </h4>
                        </div>
                        <div className="rvwRtngPrgrsStars">
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <span>(981)</span>
                        </div>
                        <div className="prdctListInfo">
                          <p>Eeiusmod tempor incididunt</p>
                        </div>
                        <div className="prodctDtlPrice d-flex justify-content-center">
                          <div className="price">$69.00</div>
                          <div className="oferPrice">$65.00</div>
                          <div className="discntPrice">(31% off)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="similarItem">
                    <div className="prdctListItem whiteBg">
                      <div className="prdctListMedia">
                        <div
                          className="prdctListImg"
                          style={{ backgroundImage: `url("img/productImg4.jpg")` }}
                        >
                          <div className="prdctListOverlay"></div>
                        </div>
                        <div className="prdctHovrCard">
                          <Link to="/">
                            <span className="prdctListWishListIcon">
                              <img src="img/wishListIconDark.svg" />
                            </span>
                          </Link>
                          <Link to="/">
                            <span className="prdctListIcon">
                              <img src="img/prdctListIcon.svg" />
                            </span>
                          </Link>
                        </div>
                        <div className="prdctHvrBtns">
                          <Link to="#" className="btnCommon">
                            Add To Cart
                          </Link>
                          <Link to="#" className="btnCommon btnWhite">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                      <div className="prodctListInfoCol text-center">
                        <div className="prdctListTitle">
                          <h4>
                            {" "}
                            <Link to="/">Scratch Resistant Prefab Kitchen...</Link>
                          </h4>
                        </div>
                        <div className="rvwRtngPrgrsStars">
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <span>(981)</span>
                        </div>
                        <div className="prdctListInfo">
                          <p>Eeiusmod tempor incididunt</p>
                        </div>
                        <div className="prodctDtlPrice d-flex justify-content-center">
                          <div className="price">$69.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="similarItem">
                    <div className="prdctListItem whiteBg">
                      <div className="prdctListMedia">
                        <div
                          className="prdctListImg"
                          style={{ backgroundImage: `url("img/productImg4.jpg")` }}
                        >
                          <div className="prdctListOverlay"></div>
                        </div>
                        <div className="prdctHovrCard">
                          <Link to="/">
                            <span className="prdctListWishListIcon">
                              <img src="img/wishListIconDark.svg" />
                            </span>
                          </Link>
                          <Link to="/">
                            <span className="prdctListIcon">
                              <img src="img/prdctListIcon.svg" />
                            </span>
                          </Link>
                        </div>
                        <div className="prdctHvrBtns">
                          <Link to="#" className="btnCommon">
                            Add To Cart
                          </Link>
                          <Link to="#" className="btnCommon btnWhite">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                      <div className="prodctListInfoCol text-center">
                        <div className="prdctListTitle">
                          <h4>
                            {" "}
                            <Link to="/">Scratch Resistant Prefab Kitchen...</Link>
                          </h4>
                        </div>
                        <div className="rvwRtngPrgrsStars">
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <span>(981)</span>
                        </div>
                        <div className="prdctListInfo">
                          <p>Eeiusmod tempor incididunt</p>
                        </div>
                        <div className="prodctDtlPrice d-flex justify-content-center">
                          <div className="price">$69.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="similarItem">
                    <div className="prdctListItem whiteBg">
                      <div className="prdctListMedia">
                        <div
                          className="prdctListImg"
                          style={{ backgroundImage: `url("img/productImg4.jpg")` }}
                        >
                          <div className="prdctListOverlay"></div>
                        </div>
                        <div className="prdctHovrCard">
                          <Link to="/">
                            <span className="prdctListWishListIcon">
                              <img src="img/wishListIconDark.svg" />
                            </span>
                          </Link>
                          <Link to="/">
                            <span className="prdctListIcon">
                              <img src="img/prdctListIcon.svg" />
                            </span>
                          </Link>
                        </div>
                        <div className="prdctHvrBtns">
                          <Link to="#" className="btnCommon">
                            Add To Cart
                          </Link>
                          <Link to="#" className="btnCommon btnWhite">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                      <div className="prodctListInfoCol text-center">
                        <div className="prdctListTitle">
                          <h4>
                            {" "}
                            <Link to="/">Scratch Resistant Prefab Kitchen...</Link>
                          </h4>
                        </div>
                        <div className="rvwRtngPrgrsStars">
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <span>(981)</span>
                        </div>
                        <div className="prdctListInfo">
                          <p>Eeiusmod tempor incididunt</p>
                        </div>
                        <div className="prodctDtlPrice d-flex justify-content-center">
                          <div className="price">$69.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="similarItem">
                    <div className="prdctListItem whiteBg">
                      <div className="prdctListMedia">
                        <div
                          className="prdctListImg"
                          style={{ backgroundImage: `url("img/productImg4.jpg")` }}
                        >
                          <div className="prdctListOverlay"></div>
                        </div>
                        <div className="prdctHovrCard">
                          <Link to="/">
                            <span className="prdctListWishListIcon">
                              <img src="img/wishListIconDark.svg" />
                            </span>
                          </Link>
                          <Link to="/">
                            <span className="prdctListIcon">
                              <img src="img/prdctListIcon.svg" />
                            </span>
                          </Link>
                        </div>
                        <div className="prdctHvrBtns">
                          <Link to="#" className="btnCommon">
                            Add To Cart
                          </Link>
                          <Link to="#" className="btnCommon btnWhite">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                      <div className="prodctListInfoCol text-center">
                        <div className="prdctListTitle">
                          <h4>
                            {" "}
                            <Link to="/">Scratch Resistant Prefab Kitchen...</Link>
                          </h4>
                        </div>
                        <div className="rvwRtngPrgrsStars">
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <span>(981)</span>
                        </div>
                        <div className="prdctListInfo">
                          <p>Eeiusmod tempor incididunt</p>
                        </div>
                        <div className="prodctDtlPrice d-flex justify-content-center">
                          <div className="price">$69.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="similarItem">
                    <div className="prdctListItem whiteBg">
                      <div className="prdctListMedia">
                        <div
                          className="prdctListImg"
                          style={{ backgroundImage: `url("img/productImg4.jpg")` }}
                        >
                          <div className="prdctListOverlay"></div>
                        </div>
                        <div className="prdctHovrCard">
                          <Link to="/">
                            <span className="prdctListWishListIcon">
                              <img src="img/wishListIconDark.svg" />
                            </span>
                          </Link>
                          <Link to="/">
                            <span className="prdctListIcon">
                              <img src="img/prdctListIcon.svg" />
                            </span>
                          </Link>
                        </div>
                        <div className="prdctHvrBtns">
                          <Link to="#" className="btnCommon">
                            Add To Cart
                          </Link>
                          <Link to="#" className="btnCommon btnWhite">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                      <div className="prodctListInfoCol text-center">
                        <div className="prdctListTitle">
                          <h4>
                            {" "}
                            <Link to="/">Scratch Resistant Prefab Kitchen...</Link>
                          </h4>
                        </div>
                        <div className="rvwRtngPrgrsStars">
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                          <span>(981)</span>
                        </div>
                        <div className="prdctListInfo">
                          <p>Eeiusmod tempor incididunt</p>
                        </div>
                        <div className="prodctDtlPrice d-flex justify-content-center">
                          <div className="price">$69.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </section>
  );
}
export default Transactions;
