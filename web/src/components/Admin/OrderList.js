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
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import $ from "jquery";
import Style from "./AdminStyle";
import axios from "../../API/axios";
import view from "../../assets/images/icons/view-icon.png";
import viewWhite from "../../assets/images/icons/view-white-icon.png";
import deleteIcon from "../../assets/images/icons/delete-icon.png";
import deleteWhite from "../../assets/images/icons/delete-white-icon.png";
import editIcon from "../../assets/images/icons/edit-icon.png";
import editWhite from "../../assets/images/icons/edit-white-icon.png";
import Pagination from '../../container/pagination/pagination';

const limit = 10;
window.jQuery = window.$ = $;
require("jquery-nice-select");
function AdminOrderList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [TotalCount, setTotalCount] = useState(10);
    const [selectOption, setSelectOption] = useState();
    const [selectOrderOption, setSelectOrderOption] = useState();
    useEffect(() => {
        getProducts();
    }, [currentPage, selectOption, selectOrderOption])
    const [getData, setGetData] = useState();

    const getProducts = async (SortByDate = (selectOption),OrderType=(selectOrderOption)) => {
        console.log("jagviewgf", currentPage, limit, selectOption)
        try {
            const res = await axios.get(`/order/getAllOrder/${currentPage}/${limit}/${SortByDate}/${OrderType}`);
            console.log("res jagvir", res);
            const { data: { order, totalOrders } = {} } = res || {};
            console.log("resjny jagvir", order);
            return setGetData(order), setTotalCount(totalOrders);
        } catch (error) {
            console.log("erroe", error);
        }
    }

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
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Order"
                                            />
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
                                    <div className="hrStyle pb-5">
                                        <hr />
                                    </div>
                                    <div className="prdctListTble common-table">
                                        <Table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                        />
                                                    </th>
                                                    <th>Order ID #</th>
                                                    <th>Order Date</th>
                                                    <th>Order Status</th>
                                                    <th>Payment</th>
                                                    <th>Shipping</th>
                                                    <th>Total</th>
                                                    <th align="center">Action</th>
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
                                                                <span >{_id}</span>
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
                                                                <span
                                                                    to="/"
                                                                    className="btnCommon btnDark"
                                                                >{`${mm}  ${d},${y}`}</span>
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
                                                                        </li> */}
                                                                        {/* <li className="delete-btn">
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
                                                                        </li> */}
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                 {/* <tr className="whitebgRow">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td className="ordeID"><Link to="/">4595454</Link></td>

                                                    <td>
                                                        <div className="SubCat">May 05,2022</div>
                                                    </td>
                                                    <td>
                                                        <div className="blue">
                                                            Processing
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            Paid
                                                        </div>
                                                    </td>
                                                    <td className="status">
                                                        <Link to="/" className="btnCommon btnDark">May 08, 2022</Link>
                                                    </td>
                                                    <td className="price">
                                                        $102.00
                                                    </td>

                                                    <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="view-btn">
                                                                    <div className="">
                                                                        <a href="/admin/vieworder">
                                                                            <img src={view} alt="" height="18" />
                                                                            <span><img src={viewWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="javascript:void(0);">
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
                                                    </td>
                                                </tr>
                                                <tr className="whitebgRow">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td className="ordeID"><Link to="/">48795455</Link></td>
                                                    <td>
                                                        <div className="SubCat">May 05,2022</div>
                                                    </td>
                                                    <td>
                                                        <div className="red">
                                                            Cancelled
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            Paid
                                                        </div>
                                                    </td>
                                                    <td className="status">
                                                        <Link to="/" className="btnCommon btnDark">May 08, 2022</Link>
                                                    </td>
                                                    <td className="price">
                                                        $102.00
                                                    </td>

                                                    <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="view-btn">
                                                                    <div className="">
                                                                        <a href="/admin/vieworder">
                                                                            <img src={view} alt="" height="18" />
                                                                            <span><img src={viewWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="javascript:void(0);">
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
                                                    </td>
                                                </tr>
                                                <tr className="whitebgRow">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td className="ordeID"><Link to="/">89578951</Link></td>
                                                    <td>
                                                        <div className="SubCat">May 05,2022</div>
                                                    </td>
                                                    <td>
                                                        <div className="green">
                                                            Delivered
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            Paid
                                                        </div>
                                                    </td>
                                                    <td className="status">
                                                        <Link to="/" className="btnCommon btnDark">May 08, 2022</Link>
                                                    </td>
                                                    <td className="price">
                                                        $102.00
                                                    </td>

                                                    <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="view-btn">
                                                                    <div className="">
                                                                        <a href="/admin/vieworder">
                                                                            <img src={view} alt="" height="18" />
                                                                            <span><img src={viewWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="javascript:void(0);">
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
                                                    </td>
                                                </tr>
                                                <tr className="whitebgRow">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td className="ordeID"><Link to="/">4595454</Link></td>
                                                    <td>
                                                        <div className="SubCat">May 05,2022</div>
                                                    </td>
                                                    <td>
                                                        <div className="green">
                                                            Delivered
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            Paid
                                                        </div>
                                                    </td>
                                                    <td className="status">
                                                        <Link to="/" className="btnCommon btnDark">May 08, 2022</Link>
                                                    </td>
                                                    <td className="price">
                                                        $102.00
                                                    </td>

                                                    <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="view-btn">
                                                                    <div className="">
                                                                        <a href="/admin/vieworder">
                                                                            <img src={view} alt="" height="18" />
                                                                            <span><img src={viewWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="javascript:void(0);">
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
                                                    </td>
                                                </tr>
                                                <tr className="whitebgRow">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td className="ordeID"><Link to="/">87798754984</Link></td>
                                                    <td>
                                                        <div className="SubCat">May 05,2022</div>
                                                    </td>
                                                    <td>
                                                        <div className="blue">
                                                            Processing
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            Paid
                                                        </div>
                                                    </td>
                                                    <td className="status">
                                                        <Link to="/" className="btnCommon btnDark">May 08, 2022</Link>
                                                    </td>
                                                    <td className="price">
                                                        $102.00
                                                    </td>

                                                    <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="view-btn">
                                                                    <div className="">
                                                                        <a href="/admin/vieworder">
                                                                            <img src={view} alt="" height="18" />
                                                                            <span><img src={viewWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="javascript:void(0);">
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
                                                    </td>
                                                </tr>
                                                <tr className="whitebgRow">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td className="ordeID"><Link to="/">79889554</Link></td>
                                                    <td>
                                                        <div className="SubCat">May 05,2022</div>
                                                    </td>
                                                    <td>
                                                        <div className="green">
                                                            Delivered
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            Paid
                                                        </div>
                                                    </td>
                                                    <td className="status">
                                                        <Link to="/" className="btnCommon btnDark">May 08, 2022</Link>
                                                    </td>
                                                    <td className="price">
                                                        $102.00
                                                    </td>

                                                    <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="view-btn">
                                                                    <div className="">
                                                                        <a href="/admin/vieworder">
                                                                            <img src={view} alt="" height="18" />
                                                                            <span><img src={viewWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="javascript:void(0);">
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
                                                    </td>
                                                </tr>
                                                <tr className="whitebgRow">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td className="ordeID"><Link to="/">02458995595</Link></td>
                                                    <td>
                                                        <div className="SubCat">May 05,2022</div>
                                                    </td>
                                                    <td>
                                                        <div className="green">
                                                            Delivered
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            Paid
                                                        </div>
                                                    </td>
                                                    <td className="status">
                                                        <Link to="/" className="btnCommon btnDark">May 08, 2022</Link>
                                                    </td>
                                                    <td className="price">
                                                        $102.00
                                                    </td>

                                                    <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="view-btn">
                                                                    <div className="">
                                                                        <a href="/admin/vieworder">
                                                                            <img src={view} alt="" height="18" />
                                                                            <span><img src={viewWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="javascript:void(0);">
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
                                                    </td>
                                                </tr>
                                                <tr className="whitebgRow">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td className="ordeID"><Link to="/">4990055785</Link></td>
                                                    <td>
                                                        <div className="SubCat">May 05,2022</div>
                                                    </td>
                                                    <td>
                                                        <div className="green">
                                                            Delivered
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="paid">
                                                            Paid
                                                        </div>
                                                    </td>
                                                    <td className="status">
                                                        <Link to="/" className="btnCommon btnDark">May 08, 2022</Link>
                                                    </td>
                                                    <td className="price">
                                                        $102.00
                                                    </td>

                                                    <td className="actions">
                                                        <div className="tbl-actn">
                                                            <ul>
                                                                <li className="view-btn">
                                                                    <div className="">
                                                                        <a href="/admin/vieworder">
                                                                            <img src={view} alt="" height="18" />
                                                                            <span><img src={viewWhite} alt="" height="18" /></span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li className="edit-btn">
                                                                    <div className="">
                                                                        <a href="javascript:void(0);">
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
                                                    </td>
                                                </tr> */}
                                                
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
export default AdminOrderList;


// exports.list = (req, res) => {
//     let {
//         limit = 0,
//         offset = 0,
//         page = 1,
//         sort = '_id',
//         order = 'desc',
//     } = req.query;
//     let skip = limit * (page - 1) + offset;
//     let lmt = +limit;
//     console.log('list req', req);
//     const sortOrder = {
//         [sort]: order == 'desc' ? -1 : 1,
//     };

//     let { id, name, father_name, uploaded_by, company, placement } = req.body;
//     console.log("name", name)

//     const defaultCondition = {};
//     if (!empty(name)) {
//         defaultCondition['name'] = new RegExp(name, 'i');
//         console.log("defaultCondition", defaultCondition)
//     }
//     if (!empty(father_name)) {
//         defaultCondition['father_name'] = new RegExp(father_name, 'i');
//     }

//     Inhabitant.aggregate()
//         .facet({
//             result: [
//                 { $match: defaultCondition },
//                 { $sort: sortOrder },
//                 { $skip: skip },
//                 { $limit: lmt },
//             ],
//             count: [
//                 { $match: defaultCondition },
//                 {
//                     $group: {
//                         _id: null,
//                         count: { $sum: 1 },
//                     },
//                 },
//                 { $project: { count: 1 } },
//             ],
//         })
//         .exec((err, result) => {
//             if (err) {
//                 res.status(500).send({ message: err });
//                 return;
//             }
//             if (!result) {
//                 return res.status(404).send({ message: 'User Not found.' });
//             }
//             let count = result[0]?.count[0]?.count || 0;
//             console.log('count', count);
//             let rows = result[0].result;
//             console.log('result', result);
//             return res
//                 .status(200)
//                 .send({ data: { count, rows }, message: 'result found' });
//         });
// };
