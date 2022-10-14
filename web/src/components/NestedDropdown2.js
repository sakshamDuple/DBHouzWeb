import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "../css/header.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import {  RestClient } from "../rest";
const NestedDropdown2 = ({ title, id }) => {
    const navigate = useNavigate();
    const [data ,setData] = useState([]);
    console.log("jagvirsinghev", title)
    console.log("jagvir", id)
    const handleProductApi = (e,id) => {
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
    const handleproduct = (e,product) =>{
        e.preventDefault();
        navigate("/productdetail", { state: {product : product} });
    }
    return (
        <Dropdown.Item >
            <DropdownButton  onClick={(e)=>{handleProductApi(e,id)}} drop='end' variant="secondary" title={title}>
                {data.map((product)=>{
                    return(
                        <Dropdown.Item  onClick={(e)=>{handleproduct(e,product)}} as="button">{product.name}</Dropdown.Item> 
                    )
                })}                
            </DropdownButton>
        </Dropdown.Item>
    );
}


export default NestedDropdown2;