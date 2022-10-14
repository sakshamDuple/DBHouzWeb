import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "../css/header.css";

const NestedDropdown = ({ title, children }) => {
    return (
        <Dropdown.Item>
            <Dropdown variant="primary" drop="end" autoClose="outside">
                <Dropdown.Toggle as={CustomToggle}> 
                    <div className='d-flex align-items-center justify-content-between'>
                        <span> {title}</span>
                        <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
                    </div>
                </Dropdown.Toggle> 
                <Dropdown.Menu>
                    {children}
                </Dropdown.Menu>
            </Dropdown>
        </Dropdown.Item>
    );
}

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

export const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        return (
            <>
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled">
                        {children}
                    </ul>
                </div>
            </>
        );
    },
)

export default NestedDropdown;