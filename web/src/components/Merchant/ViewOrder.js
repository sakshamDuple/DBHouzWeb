import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button, Table, Tab, Tabs, Row, Col, Alert, Container, Form, label } from "react-bootstrap";
import Sidebar from './SideBar';
import NavBar from './NavBar';
import $, { data } from "jquery";
import Style from '../Admin/AdminStyle';
import product1 from "../../assets/images/productImg1.jpg";
import product2 from "../../assets/images/productImg2.jpg";
import product3 from "../../assets/images/productImg3.jpg";
import product4 from "../../assets/images/productImg4.jpg";
import product5 from "../../assets/images/productImg5.jpg";
import callIcon from "../../assets/images/icons/callIcon.svg";
import axios from "../../API/axios";
import * as moment from 'moment';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/images/LogoLg.svg";
window.jQuery = window.$ = $;
require("jquery-nice-select");
function ViewOrder() {
    const [productData, setProductData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const location = useLocation();
    useEffect(() => {
        let order = location?.state?.order;
        setOrderData([order]);
        console.log("order", order)
        let products = location?.state?.order?.products;
        let Id;
        products.map(async (id) => {
            Id = id.productId;
            try {
                const res = await axios.get(`/product/getOne/${Id}`);
                const { data: { product } = {} } = res || {};
                return setProductData((prev) => {
                    return ([...prev, product])
                });
            } catch (error) {
                console.log("erroe", error);
            }
        })

    }, [])

    const handlePdf = (e,id) => {
        e.preventDefault();
        const input = document.getElementById("myDivjs");
        console.log(input);
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", 'a3');
            pdf.addImage(imgData, "JPEG", 20, 20);
            // pdf.output('dataurlnewwindow');
            pdf.save(`${id}.pdf`);
        });
    };
    return (
        <>
            <Style />
            <article >
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
                                    <div className="row align-items-center justify-content-center  hdngRowBlk">
                                        <div className="col">
                                            <div className="MainHdng">
                                                <h4>View Order</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hrStyle pb-5" ><hr /></div>
                                    {orderData.map((item, index) => {
                                        const {
                                            _id, order_status, createdAt, products, total_price,expectedDeliveryDate,
                                            customerDetail: { name, phone, email } = {},
                                            address: {
                                                city, country, main_address_text, postal_code, state } = {},
                                        } = item || {};
                                        return (
                                            <>
                                                <div id="myDivjs">
                                                    <div>
                                                        <img src={logo} alt="" height="35" />
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="invoice">
                                                            <div className="d-md-flex justify-content-between align-items-center mb-4">
                                                                <div>Invoice No : #{_id}</div>
                                                                <div> Order Date: 	{moment(createdAt).format('DD/MM/YYYY')}</div>
                                                                <div> Delivery Date: 	{moment(expectedDeliveryDate).format('DD/MM/YYYY')}</div>
                                                            </div>
                                                            <hr className="my-4" />
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <p>
                                                                        <strong>Billing Address</strong>
                                                                    </p>
                                                                    <p>{name}</p> 
                                                                    <p>{phone}<br />{email}</p> 
                                                                    <p>{main_address_text} ,{city} <br />{state} {country} {postal_code}</p>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <p className="text-start text-md-end">
                                                                        <strong>Delivery Address</strong>
                                                                    </p>
                                                                    <p className="text-start text-md-end">{name}</p> 
                                                                    <p className="text-start text-md-end">{phone}<br />{email}</p> 
                                                                    <p className="text-start text-md-end">{main_address_text} ,{city} <br />{state} {country} {postal_code}</p>
                                                                    {/* <p className="text-start text-md-end">{main_address_text} ,{city} <br />{state} {country} {postal_code}</p> */}
                                                                </div>
                                                            </div>
                                                            <div className="table-responsive" tabIndex="1">
                                                                <table className="table mb-4 mt-4">
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Description</th>
                                                                            <th className="text-end">Quantity</th>
                                                                            <th className="text-end">Price</th>
                                                                            <th className="text-end">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {/* <tr className="text-end">
                                                                            <td className="text-start">1</td>
                                                                            <td className="text-start">Digital clock</td>
                                                                            <td>1</td>
                                                                            <td>$1.190,90</td>
                                                                            <td>$1.190,90</td>
                                                                        </tr> */}
                                                                        {productData.map((item, index) => {
                                                                            const {
                                                                                name,_id,
                                                                            } = item || {};
                                                                            return (
                                                                                <tr className="text-end" key={index}>
                                                                                    <td className="text-start">{index+1}</td>
                                                                                    <td className="text-start">{name}</td>
                                                                                    {products.map((product, index) => {
                                                                                        const {
                                                                                            totalPriceOfThisProducts, productId, count
                                                                                        } = product || {};
                                                                                        let price = totalPriceOfThisProducts / count;
                                                                                        if (_id == productId) {
                                                                                            return (
                                                                                                <>
                                                                                                    <td>{count}</td>
                                                                                                    <td> ??{price}</td>
                                                                                                    <td> ??{totalPriceOfThisProducts}</td>
                                                                                                </>
                                                                                            )
                                                                                        }
                                                                                    })}
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                        {/* <tr className="text-end">
                                                                            <td className="text-start">1</td>
                                                                            <td className="text-start">Toy Car</td>
                                                                            <td>1</td>
                                                                            <td>$139.58</td>
                                                                            <td>$139.58</td>
                                                                        </tr>
                                                                        <tr className="text-end">
                                                                            <td className="text-start">2</td>
                                                                            <td className="text-start">Sunglasses</td>
                                                                            <td>1</td>
                                                                            <td>$50,90</td>
                                                                            <td>$101,80</td>
                                                                        </tr>
                                                                        <tr className="text-end">
                                                                            <td className="text-start">3</td>
                                                                            <td className="text-start">Cake</td>
                                                                            <td>1</td>
                                                                            <td>$10,50</td>
                                                                            <td>$10,50</td>
                                                                        </tr> */}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="text-end">
                                                                <p>Sub Total: ??{total_price}</p>
                                                                <p>Shipping: Free</p>
                                                                <p>Tax(18%) : ??{Math.round((18 / 100) * total_price)}</p>
                                                                <h4 className="fw-bold">Total: ??{total_price}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-8 col-md-12">
                                                        <div className="card mb-4">
                                                            <div className="Bgwhite Shadow radius20 p-4 mx-4">
                                                                <div className="mb-5 d-flex align-items-center justify-content-between">
                                                                    <span>Order No : <a >#{_id}</a></span>
                                                                    <span className="badge bg-success">{order_status}</span>
                                                                </div>
                                                                <div className="row mb-5 g-4">
                                                                    <div className="col-md-3 col-sm-6">
                                                                        <p className="fw-bold">Order Created at</p>
                                                                        {moment(createdAt).format('DD/MM/YYYY')} at {moment(createdAt).format('HH:mm A')}
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        <p className="fw-bold">Name</p>
                                                                        {name}
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        <p className="fw-bold">Email</p>
                                                                        {email}
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        <p className="fw-bold">Contact No</p>
                                                                        {phone}
                                                                    </div>
                                                                </div>
                                                                <div className="row g-4">
                                                                    <div className="col-md-6 col-sm-12">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex flex-column gap-3">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <h5 className="mb-0">Delivery Address</h5>
                                                                                    {/* <a href="#">Edit</a> */}
                                                                                </div>
                                                                                <div>Name: {name}</div>
                                                                                <div>{main_address_text} ,{city}</div>
                                                                                <div>{state}, {country} {postal_code}</div>
                                                                                <div>
                                                                                    <img src={callIcon} alt="" height="18" />
                                                                                    <span className="px-2">+91 {phone}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-sm-12">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex flex-column gap-3">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <h5 className="mb-0">Billing Address</h5>
                                                                                    {/* <a href="#">Edit</a> */}
                                                                                </div>
                                                                                <div>Name:  {name}</div>
                                                                                <div>{main_address_text} ,{city}</div>
                                                                                <div>{state}, {country} {postal_code}</div>
                                                                                <div>
                                                                                    <i className="bi bi-telephone me-2"></i>{phone}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="card widget orderListCard">
                                                            <h5 className="card-header ">Order Items</h5>
                                                            <div className="card-body">
                                                                <div className="table-responsive" tabIndex="1">
                                                                    <table className="table table-custom mb-0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Photo</th>
                                                                                <th>Name</th>
                                                                                <th>Quantity</th>
                                                                                <th>Price</th>
                                                                                <th>Total</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {productData.map((item, index) => {
                                                                                const {
                                                                                    name,
                                                                                    images: { 0: { documentId } = {} } = {},
                                                                                    _id,
                                                                                } = item || {};
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            <a href="#">
                                                                                                <img src={`http://139.59.36.222:12001/rest/documents/get/${documentId}`} alt="" className="rounded" height="60" />
                                                                                            </a>
                                                                                        </td>
                                                                                        <td>{name}</td>
                                                                                        {products.map((product, index) => {
                                                                                            const {
                                                                                                totalPriceOfThisProducts, productId, count
                                                                                            } = product || {};
                                                                                            let price = totalPriceOfThisProducts / count;
                                                                                            if (_id == productId) {
                                                                                                return (
                                                                                                    <>
                                                                                                        <td>{count}</td>
                                                                                                        <td> ??{price}</td>
                                                                                                        <td> ??{totalPriceOfThisProducts}</td>
                                                                                                    </>
                                                                                                )
                                                                                            }
                                                                                        })}
                                                                                    </tr>
                                                                                );
                                                                            })}

                                                                            {/* <tr>
                                                                                            <td>
                                                                                                <a href="#">
                                                                                                    <img src={product2} alt="" className="rounded" height="60" />
                                                                                                </a>
                                                                                            </td>
                                                                                            <td>Wall Stone</td>
                                                                                            <td>2</td>
                                                                                            <td>$139,58</td>
                                                                                            <td>$279,16</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <a href="#">
                                                                                                    <img src={product3} alt="" className="rounded" height="60" />
                                                                                                </a>
                                                                                            </td>
                                                                                            <td>Floor Shine Tiles</td>
                                                                                            <td>1</td>
                                                                                            <td>$50,90</td>
                                                                                            <td>$50,90</td>
                                                                                        </tr> */}


                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
                                                        <div className="card mb-4">
                                                            <div className="card-body">
                                                                <h6 className="card-title mb-4">Price</h6>
                                                                <div className="row justify-content-center mb-3">
                                                                    <div className="col-4 text-end">Sub Total :</div>
                                                                    <div className="col-4">??{total_price}</div>
                                                                </div>
                                                                <div className="row justify-content-center mb-3">
                                                                    <div className="col-4 text-end">Shipping :</div>
                                                                    <div className="col-4">Free</div>
                                                                </div>
                                                                <div className="row justify-content-center mb-3">
                                                                    <div className="col-4 text-end">Tax(18%) :</div>
                                                                    <div className="col-4">??{Math.round((18 / 100) * total_price)}</div>
                                                                </div>
                                                                <div className="row justify-content-center">
                                                                    <div className="col-4 text-end">
                                                                        <strong>Total :</strong>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <strong>??{total_price}</strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h6 className="card-title mb-4">Invoice</h6>
                                                                <div className="row justify-content-center mb-3">
                                                                    <div className="col-6 text-end">Invoice No :</div>
                                                                    <div className="col-6">
                                                                        <a href="#">#{_id}</a>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="row justify-content-center mb-3">
                                                                    <div className="col-6 text-end">Seller GST :</div>
                                                                    <div className="col-6">12HY87072641Z0</div>
                                                                </div>
                                                                <div className="row justify-content-center mb-3">
                                                                    <div className="col-6 text-end">Purchase GST :</div>
                                                                    <div className="col-6">22HG9838964Z1</div>
                                                                </div> */}
                                                            </div>
                                                            <div className="text-center mt-4">
                                                                <button className="btnCommon " onClick={(e)=>{handlePdf(e,_id)}}>Download PDF</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
export default ViewOrder;  
