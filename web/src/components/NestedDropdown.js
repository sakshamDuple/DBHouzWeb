import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../css/header.css";
const NestedDropdown = ({ category }) => {
    return (
        <Dropdown variant="primary" drop="end" autoClose="outside">
            <Dropdown.Toggle>{category?.category?.name}</Dropdown.Toggle> <Dropdown.Menu>
                 {category?.subCategories.map((subcategory) => {
                    { console.log("image.png ", subcategory)}
                    <Dropdown.Item>
                        {subcategory.name}
                    </Dropdown.Item>
                })} 
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NestedDropdown;