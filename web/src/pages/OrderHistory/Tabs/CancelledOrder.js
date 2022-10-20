import React, { useEffect, useState, useRef } from 'react';
import { Table } from "react-bootstrap";
import axios from '../../../API/axios';
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import Pagination from '../../../container/pagination/pagination';

const limit = 10;
const CancelledOrder = () => {

    const [selectOption, setSelectOption] = useState('Asc');
    const [getData, setGetData] = useState([]);
    const [userId, setUserId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [TotalCount, setTotalCount] = useState(1);

    useEffect(() => {
        let accessToken = window.localStorage.getItem("JWT");
        let n = jwtDecode(accessToken);
        const { user: { _id } = {} } = n || {};
        setUserId(_id);
    }, [])

    const handleOrderHistoryApi = async () => {
        try {
            if (userId == "") {
                return;
            }
            const res = await axios.get(`/order/getCancelledOrder/${currentPage}/${limit}/${selectOption}/${userId}`);
            const { data: { order, totalOrders } = {} } = res || {};
            return setGetData(order),setTotalCount(totalOrders)
        } catch (error) {
            console.log("error", error)
        }
    }
    
    useEffect(() => {
        handleOrderHistoryApi()
    }, [userId])

    useEffect(() => {
        handleOrderHistoryApi();
    }, [currentPage, selectOption])
    
    const ans = Array.isArray(getData);
    console.log("getData", ans)
    return (
        <div className="tabDataBody">
            <div className="sortBlkOutr sortOrdrHistry">
                <div className="row align-items-center ">
                    <div className="col-auto">
                        <div className="row align-items-center py-3 pb-4">
                            <div className="col-auto">
                                <div className="ordrTitle">Orders Placed in</div>
                            </div>
                            <div className="col-auto">
                                <div className="sortByCol">
                                    <div className="form-group">
                                        <select selected name="option" className="wide"
                                            onChange={(e) => { setSelectOption(e.target.value) }} >
                                            <option value="none" selected disabled hidden>Sort By Date</option>
                                            <option value="Asc">Asc</option>
                                            <option value="Desc">Desc</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="orderHistryTable">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Order Id #</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>Payment</th>
                            <th>Shipping</th>
                            <th>Total</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {getData?.map((item, index) => {
                            console.log("item", item)
                            const { _id, createdAt, order_status, total_price, expectedDeliveryDate,
                                transactionDetail: { transactionMethod } = {},
                            } = item || {};
                            let ShippingDate = new Date(expectedDeliveryDate);
                            let y = ShippingDate.getFullYear();
                            let mm = ShippingDate.toLocaleString('default', { month: 'short' });
                            let d = ("0" + ShippingDate.getDate()).slice(-2);
                            let date = new Date(createdAt);
                            let year = date.getFullYear();
                            let month = date.toLocaleString('default', { month: 'short' });
                            let day = ("0" + date.getDate()).slice(-2);
                            return (
                                <tr key={index}>
                                    <td>#{_id}</td>
                                    <td>{`${month}  ${day},${year}`}</td>
                                    <td className="delvrd">{order_status}</td>
                                    <td>{transactionMethod}</td>
                                    <td>{`${mm}  ${d},${y}`}</td>
                                    <td>${total_price}.00</td>
                                    {/* <td><Link to="/">View Details</Link></td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
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
        </div>
    );
}


export default CancelledOrder;