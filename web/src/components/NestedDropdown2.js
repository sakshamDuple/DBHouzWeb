import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "../css/header.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { RestClient } from "../rest";
const NestedDropdown2 = ({ title, id }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    console.log("jagvirsinghev", title)
    console.log("jagvir", id)
    const handleProductApi = (e, id) => {
        e.preventDefault()
        console.log("button")
        RestClient.getCategoryDropdown(id)
            .then((res) => {
                setData(res.data)
                console.log("resjasfjdjj", res.data)
            }).catch((error) => {
                console.log("error", error)
            })
    }
    const handleproduct = (e, product) => {
        e.preventDefault();
        navigate("/productdetail", { state: { product: product } });
    }
    return (
        <Dropdown.Item >
            <div className='dp-dropdown'>
                <div className='d-flex align-items-center justify-content-between'  >
                    <span> {category?.category?.name}</span>
                    <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
                </div>
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
            <DropdownButton onClick={(e) => { handleProductApi(e, id) }} drop='end' variant="secondary" title={title}>
                {data.map((product) => {
                    return (
                        <Dropdown.Item onClick={(e) => { handleproduct(e, product) }} as="button">{product.name}</Dropdown.Item>
                    )
                })}
            </DropdownButton>
        </Dropdown.Item>
    );
}


export default NestedDropdown2;