import React, { createRef, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImportCollection2 from "../components/Home/ImportCollection2";
import MaterialCat from "../components/Home/MaterialCat";
import HomeAbout from "../components/Home/HomeAbout";
import { Rest, RestAdmin } from "../rest";
import { useSelector } from "react-redux";
import { Prev } from "react-bootstrap/esm/PageItem";

function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  let category = location.state?.category;
  const categories = useSelector((s) => s.categories);
  let lenCat = categories.length
  const inputRefs = useMemo(() => Array(lenCat).fill(0).map(i => React.createRef()), []);

  const linkProductList = (category) => {
    // console.log("category", category)
    // navigate(`/productlist`, { state: { category } });
     navigate(`/productlist?categoryId=${category}`);
  };
  const linkSubProductList = (category,subcategory) => {
    //  navigate(`/productlist`, { state: { subcategory } });
    navigate(`/productlist?categoryId=${category}&subCategoryId=${subcategory}`, { state: { category, subcategory } });
  };
  window.scrollTo(0, 0);

  return (
    <section className="wrapper ">
      <Header />
      <article className="categoryInrBlk hdrBrNone  wrapper ">
        {/* <div className="greyBg2 py-4 mb-5"> */}
        <div className="container">
          {/* <div className="row d-flex align-items-center justify-content-between">
              <div className="col">
                <div className="bredCrumbHdng">
                  <h3>{category ? category.name : "Category List"}</h3>
                </div>
              </div> */}
          <div className="col-auto">
            <div className="breadcrumbsCol py-20">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a>Categories</a>
                  </li>
                  {category && (
                    <li className="breadcrumb-item active">{category?.name}</li>
                  )}
                </ol>
              </nav>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* </div> */}
        <div className="container">
          <div className="NavCatInr category-NavCatInr categoryNavBox bg-none">
            <ul className="row no-gutters justify-content-center">
              {categories?.map((cat, index) => {
                const handleChange = (e) => {
                  e.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }
                return (
                  <li className="col-md-2 mb-1">
                    <div
                      onClick={() => handleChange(inputRefs[index])}
                      style={{
                        color: "#FFFFFF",
                        cursor: "pointer",
                        background:
                          category?.name === cat.category.name
                            ? "#F2672A"
                            : "#232F3E",
                      }}
                    >
                      {cat.category.name}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </article>
      <article className="wrapper categoryRowBlk py-20 DBcategoryList">
        <div className="container">
          <div className="catgySideBarOuterDiv bg-none mt-4">
            <div className="row ">
              <div className="col-sm-12">
                <div className="catgryListRow DBcategoryList">
                  <div className="row mb-4 DBcategoryList-row">
                    {categories.map((category, index) => {
                      console.log("category", category)
                      let subcategories = category.subCategories
                      return (
                        <>
                          <div ref={inputRefs[index]} id={`${category.category._id}`} className={`col-sm-4 DBcategoryList-main `}>
                            <div className="categoryListItem ">
                              <a
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  linkProductList(category.category._id);
                                }}
                              >
                                <div className="categoryListMedia">
                                  <div
                                    className="categoryListImg"
                                    style={{
                                      backgroundImage: `url(${Rest}/documents/get/${category.category.imageDocumentId})`,
                                    }}
                                  >
                                    <div className="categoryListOverlay"></div>
                                  </div>
                                  <span className="categoryListBtn">
                                    <a
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        linkProductList(category._id);
                                      }}
                                      className="btnCommon"
                                    >
                                      View Product
                                    </a>
                                  </span>
                                </div>
                                <div className="categoryListTitle">
                                  <h4>{category?.category.name}</h4>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col-sm-8 DBcategoryList-sub">
                            <div className="row">
                              {subcategories.map((subcategory) => (
                                <div className="col-sm-4 DBcategoryList-subCard">
                                  <div className="categoryListItem">
                                    <a
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        linkSubProductList( category.category._id,subcategory._id);
                                      }}
                                    >
                                      <div className="categoryListMedia">
                                        <div
                                          className="categoryListImg"
                                          style={{
                                            backgroundImage: `url(${Rest}/documents/get/${subcategory.imageDocumentId})`,
                                          }}
                                        >
                                          <div className="categoryListOverlay"></div>
                                        </div>
                                        <span className="categoryListBtn">
                                          <a
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              linkSubProductList(category.category._id, subcategory._id);
                                            }}
                                            className="btnCommon"
                                          >
                                            View Product
                                          </a>
                                        </span>
                                      </div>
                                      <div className="categoryListTitle">
                                        <h4>{subcategory.name}</h4>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* <CategoryComponent /> */}
      <ImportCollection2 />
      <MaterialCat />
      <HomeAbout />
      <Footer />
    </section>
  );
}
export default Category;
