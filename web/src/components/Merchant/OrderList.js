import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, } from "react-router-dom";
import { Button, Table, Tab, Tabs, Row, Col, Alert, Container, Form, label } from "react-bootstrap";
import Sidebar from './SideBar';
import Style from './DashboardStyle';
import NavBar from './NavBar';
import $ from "jquery";
import axios from "../../API/axios";
import plus from "../../assets/images/plus.svg";
import view from "../../assets/images/icons/view-icon.png";
import viewWhite from "../../assets/images/icons/view-white-icon.png";
import deleteIcon from "../../assets/images/icons/delete-icon.png";
import deleteWhite from "../../assets/images/icons/delete-white-icon.png";
import editIcon from "../../assets/images/icons/edit-icon.png";
import editWhite from "../../assets/images/icons/edit-white-icon.png";
import product1 from "../../assets/images/productImg1.jpg";
import product2 from "../../assets/images/productImg2.jpg";
import product3 from "../../assets/images/productImg3.jpg";
import product4 from "../../assets/images/productImg4.jpg";
import product5 from "../../assets/images/productImg5.jpg";
import Pagination from '../../container/pagination/pagination';
import jwtDecode from "jwt-decode";
const limit = 10;
function OrderList() {

    const [currentPage, setCurrentPage] = useState(1);
    const [TotalCount, setTotalCount] = useState(10);
    const [selectOption, setSelectOption] = useState();
    const [selectOrderOption, setSelectOrderOption] = useState();
    const [sellerId, setSellerId] = useState("");

    useEffect(() => {
        let accessToken = window.localStorage.getItem("JWT");
        let n = jwtDecode(accessToken);
        const { user: { _id } = {} } = n || {};
        setSellerId(_id);
    }, [])

    const [getData, setGetData] = useState();

    const getProducts = async () => {
        try {
            if (sellerId == "") {
                return;
            }
            const res = await axios.get(`/order/getOrderForSeller/${sellerId}/${currentPage}/${limit}/${selectOption}/${selectOrderOption}`);
            const { data: { order, totalOrders } = {} } = res || {};
            return setGetData(order), setTotalCount(totalOrders);
        } catch (error) {
            console.log("erroe", error);
        }
    }
    
    useEffect(() => {
        getProducts();
    }, [sellerId])

    useEffect(() => {
        getProducts();
    }, [currentPage, selectOption, selectOrderOption])

    const ans = Array.isArray(getData);
    console.log("getData", ans);

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
                                                <h4>Order List</h4>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" className="form-control" placeholder="Search Order" />
                                        </div>
                                        <div className="col-auto">
                                            <div className="prdctsortCol">
                                                <div className="form-group">
                                                    <select selected name="option" className="wide"
                                                        onChange={(e) => { setSelectOrderOption(e.target.value) }}
                                                    >
                                                        <option selected disabled hidden value="None" >Orders</option>
                                                        <option value="All"> All Orders</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                        <option value="Refund_Done"> Refund</option>
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
                                                        <option selected disabled hidden value="None">Sort ByDate</option>
                                                        <option value="Asc">Asc</option>
                                                        <option value="Desc">Desc</option>
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
                                                    <th >Order ID #</th>
                                                    <th >Order Date</th>
                                                    <th>Order Status</th>
                                                    <th>Payment</th>
                                                    <th>Shipping</th>
                                                    <th>Total</th>
                                                    <th align="center" >Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getData?.map((item, index) => {
                                                    console.log("item", item);
                                                    const {
                                                        _id,
                                                        createdAt,
                                                        order_status,
                                                        total_price,
                                                        expectedDeliveryDate,
                                                        transactionDetail: { transactionMethod } = {},
                                                    } = item || {};
                                                    let ShippingDate = new Date(expectedDeliveryDate);
                                                    let y = ShippingDate.getFullYear();
                                                    let mm = ShippingDate.toLocaleString("default", {
                                                        month: "short",
                                                    });
                                                    let d = ("0" + ShippingDate.getDate()).slice(-2);
                                                    let date = new Date(createdAt);
                                                    let year = date.getFullYear();
                                                    let month = date.toLocaleString("default", {
                                                        month: "short",
                                                    });
                                                    let day = ("0" + date.getDate()).slice(-2);
                                                    return (
                                                        <tr className="whitebgRow" key={index}>
                                                            <td>
                                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                                            </td>
                                                            <td className="ordeID">
                                                                <Link to="/">{_id}</Link>
                                                            </td>
                                                            <td>
                                                                <div className="SubCat">{`${month}  ${day},${year}`}</div>
                                                            </td>
                                                            <td>
                                                                <div className="green">{order_status}</div>
                                                            </td>
                                                            <td>
                                                                <div className="paid">{transactionMethod}</div>
                                                            </td>
                                                            <td className="status">
                                                                <Link
                                                                    to="/"
                                                                    className="btnCommon btnDark"
                                                                >{`${mm}  ${d},${y}`}</Link>
                                                            </td>
                                                            <td className="price">£{total_price}.00</td>

                                                            <td className="actions">
                                                                <div className="tbl-actn">
                                                                    <ul>
                                                                        <li className="view-btn">
                                                                            <div className="">
                                                                                <a href="/admin/vieworder">
                                                                                    <img src={view} alt="" height="18" />
                                                                                    <span>
                                                                                        <img
                                                                                            src={viewWhite}
                                                                                            alt=""
                                                                                            height="18"
                                                                                        />
                                                                                    </span>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                         {/* <li className="edit-btn">
                                                                            <div className="">
                                                                                <a href="javascript:void(0);">
                                                                                    <img
                                                                                        src={editIcon}
                                                                                        alt=""
                                                                                        height="18"
                                                                                    />
                                                                                    <span>
                                                                                        <img
                                                                                            src={editWhite}
                                                                                            alt=""
                                                                                            height="18"
                                                                                        />
                                                                                    </span>
                                                                                </a>
                                                                            </div>
                                                                        </li> 
                                                                         <li className="delete-btn">
                                                                            <div className="">
                                                                                <a href="/">
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
                                                                        </li>  */}
                                                                    </ul>
                                                                </div>
                                                            </td>
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
export default OrderList;  
