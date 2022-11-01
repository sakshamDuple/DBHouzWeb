import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, } from "react-router-dom";
import { Button, Table, Tab, Tabs, Row, Col, Alert, Container, Form, label } from "react-bootstrap";
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import $ from "jquery";
import Style from './AdminStyle';
import plus from "../../assets/images/plus.svg";
import view from "../../assets/images/icons/view-icon.png";
import viewWhite from "../../assets/images/icons/view-white-icon.png";
import deleteIcon from "../../assets/images/icons/delete-icon.png";
import deleteWhite from "../../assets/images/icons/delete-white-icon.png";
import editIcon from "../../assets/images/icons/edit-icon.png";
import editWhite from "../../assets/images/icons/edit-white-icon.png";
import Pagination from '../../container/pagination/pagination';
import axios from "../../API/axios";
import * as moment from 'moment'
const limit = 10;
function AdminTransactionList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [TotalCount, setTotalCount] = useState(10);
    const [selectOption, setSelectOption] = useState('DEBIT_CARD');
    const [selectOrderOption, setSelectOrderOption] = useState('successful');
    const [getData, setGetData] = useState();

    const getProducts = async () => {
        try {
            const res = await axios.get(`/order/getAllTransaction/action?TransactionMethod=${selectOption}&page=${currentPage}&limit=${limit}&TransactionStatus=${selectOrderOption}`);
            const { data: { data, totalTransaction } = {} } = res || {};
            return setGetData(data), setTotalCount(totalTransaction);
        } catch (error) {
            console.log("erroe", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [currentPage, selectOption, selectOrderOption])

    return (
        <>
            <Style />
            <article id="root">
                <div className="wrapper">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="content-page">
                        <div className="content">
                            <div className="MainNavRow">
                                <NavBar />
                            </div>
                            <div className="container-fluid">
                                <div className="cardFull p-4">
                                    <div className="row align-items-center justify-content-center pb-20 hdngRowBlk">
                                        <div className="col">
                                            <div className="MainHdng">
                                                <h4>Transactions List</h4>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" className="form-control" placeholder="Search Transactions" />
                                        </div>
                                        <div className="col-auto">
                                            <div className="prdctsortCol">
                                                <div className="form-group">
                                                    <select selected name="option" className="wide"
                                                        onChange={(e) => { setSelectOrderOption(e.target.value) }}
                                                    >
                                                        <option selected disabled hidden value="None" > Status</option>
                                                        <option value="successful">Completed</option>
                                                        <option value="unsuccessful">Cancelled</option>
                                                        <option value="Refund_Done"> Refund</option>
                                                        <option value="Refund_Inprogress ">Refund Inprogress</option>
                                                        <option value="pending"> Pending</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="prdctsortCol">
                                                <div className="form-group">
                                                    <select className="wide" selected name="option"
                                                        onChange={(e) => { setSelectOption(e.target.value) }}
                                                    >
                                                        <option selected disabled hidden value="None">Method</option>
                                                        <option value="DEBIT_CARD">DEBIT CARD</option>
                                                        <option value= "CREDIT_CARD">CREDIT CARD</option>
                                                        <option value= "UPI">UPI</option>
                                                        <option value= "PAYTM">PAYTM</option>
                                                        <option value= "GPAY">GPAY </option>
                                                        <option value="CASH_ON_DELIVERY">CASH ON DELIVERY</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hrStyle pb-5" ><hr /></div>
                                    <div className="prdctListTble common-table">
                                        <Table className="table">
                                            <thead>
                                                <tr>
                                                    {/* <th><input className="form-check-input" type="checkbox" /></th> */}
                                                    <th >Transactions ID </th>
                                                    <th >Transactions Date</th>
                                                    <th>Transactions Status</th>
                                                    <th>Payment</th>
                                                    <th>Total</th>
                                                    {/* <th>Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {getData?.map((item, index) => {
                                                    const {
                                                        amount_Of_Transaction,
                                                        transaction_Method,
                                                        transaction_Id,
                                                        status,
                                                        transaction_Date,
                                                    } = item || {};
                                                    return (
                                                <tr className="whitebgRow">
                                                    {/* <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td> */}
                                                    <td className="ordeID"><span>{transaction_Id}</span></td>
                                                    <td>
                                                        <div className="SubCat">{moment(transaction_Date).format('MMMM Do,YYYY')}</div>
                                                    </td>
                                                    <td>
                                                        <div className="green">
                                                            {status}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            {transaction_Method}
                                                        </div>
                                                    </td>
                                                    <td className="price">
                                                        £{amount_Of_Transaction}.00
                                                    </td>
                                                    {/* <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="/admin/editmerchant">
                                                                            <img src={editIcon} alt="" height="18" />
                                                                            <span><img src={editWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li> 
                                                                <li className="delete-btn">
                                                                    <div className="">
                                                                        <a href="/">
                                                                            <img src={deleteIcon} alt="" height="18" />
                                                                            <span>
                                                                                <img src={deleteWhite} alt="" height="18" />
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                                );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="pgntnOuter text-center pt-3 ">
                                        <Pagination
                                            className="pagination-bar"
                                            currentPage={currentPage}
                                            totalCount={TotalCount}
                                            pageSize={limit}
                                            onPageChange={page => setCurrentPage(page)}
                                        />
                                        {/* <ul className="pagination">
                                            <li className="page-item">
                                                <a className="page-link" role="button" tabIndex="0" href="#">
                                                    <span aria-hidden="true">‹</span>
                                                    <span className="visually-hidden">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" role="button" tabIndex="0" href="#">1</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" role="button" tabIndex="0" href="#">
                                                    <span aria-hidden="true">2</span>
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" role="button" tabIndex="0" href="#">3</a>
                                            </li>
                                            <li className="page-item active">
                                                <span className="page-link">4<span className="visually-hidden">(current)</span></span>
                                            </li>

                                            <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">
                                                <span aria-hidden="true">…</span>
                                                <span className="visually-hidden">More</span></a>
                                            </li>
                                            <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">22</a></li>
                                            <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">
                                                <span aria-hidden="true">›</span><span className="visually-hidden">Next</span></a>
                                            </li>
                                        </ul>  */}
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
export default AdminTransactionList;