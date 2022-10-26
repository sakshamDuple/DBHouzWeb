import React from 'react';
import { usePagination, DOTS } from './usePagination';
const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (

        <ul className="pagination">
            {/* Left navigation arrow */}
            <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={onPrevious}
            >
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
            {paginationRange.map(pageNumber => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li className="page-item"> <a
                        className="page-link"
                        role="button"
                        tabIndex="0"
                        href="#"
                    >
                        <span aria-hidden="true">…</span>
                    </a></li>;
                }

                // Render our Page Pills
                return (
                    <li
                        className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        <span className="page-link">
                            {pageNumber}
                        </span>
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li
                className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}
                onClick={onNext}
            >
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

        </ul>
    );
};

export default Pagination;


const mm = () => {
    return (<div className="pgntnOuter text-center pt-3 ">
        <ul className="pagination">
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
        </ul>
    </div>)
}