import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Table,
  Tab,
  Tabs,
  Row,
  Col,
  Alert,
  Container,
  Form,
  label,
} from "react-bootstrap";
import AdSidebar from "./Sidebar";
import AdNavBar from "./NavBar";
import $ from "jquery";
import Style from "./AdminStyle";
import plus from "../../assets/images/plus.svg";
import view from "../../assets/images/icons/view-icon.png";
import viewWhite from "../../assets/images/icons/view-white-icon.png";
import deleteIcon from "../../assets/images/icons/delete-icon.png";
import deleteWhite from "../../assets/images/icons/delete-white-icon.png";
import editIcon from "../../assets/images/icons/edit-icon.png";
import editWhite from "../../assets/images/icons/edit-white-icon.png";
import userImg from "../../assets/images/user1.jpg";
import { RestAdmin } from "../../rest";
import ReactPaginate from "react-paginate";
window.jQuery = window.$ = $;
require("jquery-nice-select");
function ContactFeedbacks() {
  const selectRef1 = useRef();
  const [contactList, setContactList] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % contactList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const getContactList = async () => {
    RestAdmin.getAllContacts()
      .then((contacts) => {
        setContactList(contacts);
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  const deleteContact = async (e, id) => {
    e.preventDefault();
    console.log(id);
    RestAdmin.deleteContact(id).then((res) => {
      if (res) {
        setContactList(contactList?.filter((contact) => contact._id !== id));
      }
    });
  };
  const getDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString();
  };
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(contactList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(contactList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, contactList]);
  useEffect(() => {
    $(selectRef1.current).niceSelect();
  }, []);
  const selectRef2 = useRef();
  useEffect(() => {
    $(selectRef2.current).niceSelect();
  }, []);
  const selectRef3 = useRef();
  useEffect(() => {
    $(selectRef3.current).niceSelect();
  }, []);
  useEffect(() => {
    getContactList();
  }, []);

  return (
    <>
      <Style />
      <article id="root">
        <div className="wrapper">
          <div className="sidebar">
            <AdSidebar />
          </div>
          <div className="content-page">
            <div className="content">
              <div className="MainNavRow">
                <AdNavBar />
              </div>
              <div className="container-fluid ">
                <div className="cardFull p-4">
                  <div className="row align-items-center justify-content-center pb-20 hdngRowBlk">
                    <div className="col">
                      <div className="MainHdng">
                        <h4>Contact Feedbacks</h4>
                      </div>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Search.."
                      />
                    </div>
                    <div className="col-auto">
                      <div className="prdctsortCol">
                        <div className="form-group">
                          <select ref={selectRef3} className="wide">
                            <option value="Featured">Search By</option>
                            <option value="10">Name</option>
                            <option value="25">Email</option>
                            <option value="50">Status</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="prdctsortCol">
                        <div className="form-group">
                          <select ref={selectRef2} className="wide">
                            <option value="Featured">Select</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hrStyle pb-5">
                    <hr />
                  </div>
                  <div className="prdctListTble common-table">
                    <Table className="table">
                      <thead>
                        <tr>
                          <th className="text-center">S No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th align="center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems?.map((contact, index) => {
                          return (
                            <>
                              <tr className="whitebgRow">
                                <td className="text-center">{index + 1}</td>
                                <td>
                                  <div className="prodctTitle">
                                    <div className="d-flex">
                                      <div>
                                        <Link to="/admin/merchantprofile">
                                          {contact?.name}
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="">{contact?.email}</div>
                                </td>
                                <td className="price">
                                  <div className="">{contact?.phone}</div>
                                </td>
                                <td>
                                  <div className="">{contact?.message}</div>
                                </td>
                                <td>
                                  <div className="SubCat">
                                    {getDate(contact?.createdAt)}
                                  </div>
                                </td>

                                <td className="status">
                                  <Link to="/" className="btnCommon">
                                    Active
                                  </Link>
                                </td>
                                <td className="actions">
                                  <div className="tbl-actn">
                                    <ul>
                                      <li className="delete-btn">
                                        <div className="">
                                          <a
                                            href="#"
                                            onClick={(e) =>
                                              deleteContact(e, contact?._id)
                                            }
                                          >
                                            <img
                                              src={deleteIcon}
                                              alt=""
                                              height="18"
                                            />
                                            <span>
                                              <img
                                                src={deleteWhite}
                                                alt=""
                                                height="18"
                                              />
                                            </span>
                                          </a>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                  <div className="pgntnOuter text-center pt-3 ">
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      breakLabel={". . ."}
                      containerClassName="pagination"
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName="active"
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      renderOnZeroPageCount={null}
                    />

                    {/* <ul className="pagination">
                      <li className="page-item">
                        <a
                          className="page-link"
                          role="button"
                          tabIndex="0"
                          href="#"
                        >
                          <span aria-hidden="true">‹</span>
                          <span className="visually-hidden">Previous</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          role="button"
                          tabIndex="0"
                          href="#"
                        >
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          role="button"
                          tabIndex="0"
                          href="#"
                        >
                          <span aria-hidden="true">2</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          role="button"
                          tabIndex="0"
                          href="#"
                        >
                          3
                        </a>
                      </li>
                      <li className="page-item active">
                        <span className="page-link">
                          4<span className="visually-hidden">(current)</span>
                        </span>
                      </li>

                      <li className="page-item">
                        <a
                          className="page-link"
                          role="button"
                          tabIndex="0"
                          href="#"
                        >
                          <span aria-hidden="true">…</span>
                          <span className="visually-hidden">More</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          role="button"
                          tabIndex="0"
                          href="#"
                        >
                          22
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          role="button"
                          tabIndex="0"
                          href="#"
                        >
                          <span aria-hidden="true">›</span>
                          <span className="visually-hidden">Next</span>
                        </a>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
export default ContactFeedbacks;
