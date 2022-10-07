import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import $ from "jquery";
import "rc-slider/assets/index.css";
import HomeAbout from "../components/Home/HomeAbout";
import { useDispatch, useSelector } from "react-redux";
import { Rest, RestClient } from "../rest";
import { PuffLoader } from "react-spinners";
import { stateActions } from "../redux/stateActions";
import axios from "../API/axios";
window.jQuery = window.$ = $;
require("jquery-nice-select");

function ProductList() {
  const index = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("loc:", location)
  let selectedCategory = location?.state?.category;
  console.log("selectedCategory", selectedCategory)
  let selectedSubCategory = location?.state?.subcategory;
  let item =  selectedSubCategory ? selectedSubCategory : categories[0]?.category?._id
  let flag = 1;
  const categories = useSelector((s) => s.categories);
  console.log("categories", categories)
  let currentCategory = [{}];
  let mon = selectedCategory ? selectedCategory : categories[0]?.category?._id
  console.log("selectedCategory._id", selectedCategory)
  console.log("mon", mon)
  currentCategory = categories.filter((i) => i.category._id == mon );
  console.log("currentCategory", currentCategory)
  const cart = useSelector((s) => s.cart);
  const [loading, setLoading] = useState();
  const [category, setCategory] = useState(currentCategory[0]);
  const [products, setProducts] = useState();

  console.log(products);
  console.log(category);
  window.scrollTo(0, 0);
  

  useEffect(() => {
    if (category) {
      setLoading(true);
      RestClient.getProductsByCategoryId(category.category._id)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [category]);

  const productDetails = (product) => {
    navigate("/productdetail", { state: { product } });
  };
  
  const handleSubcategory = async (e,subcategory)=>{
     const {_id} = subcategory || {};
    const data = {
      subCategoryId : _id,
    } ;
    try{
      const res = await axios.post(`/product/getProductsBySubCategory`,data)
      console.log("res js",res.data.data)
      setProducts(res.data.data)
    }catch(error){
      console.log("error",error)
    }
  }

  const selectRef2 = useRef();
  useEffect(() => {
    $(selectRef2.current).niceSelect();
  }, []);
  const selectRef3 = useRef();
  useEffect(() => {
    $(selectRef3.current).niceSelect();
  }, []);

  console.log(index);
  return (
    <section className="wrapper">
      <Header />
      <article className="categoryInrBlk hdrBrNone wrapper">
        {/* <div className="greyBg2 py-4 mb-5"> */}
        <div className="container">
          {/* <div className="row d-flex align-items-center justify-content-between">
              <div className="col">
                <div className="bredCrumbHdng">
                  <h3>Shop DBHouz</h3>
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
                    <a href="/productlist">Products</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/category">Category</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* </div> */}
      </article>
      <article className="NavCatInrBlck wrapper">
        <div className="container">
          <div className="NavCatInr">
            <ul>
              {categories.map((cat, index) => (
                <li key={index}>
                  <div
                    style={{
                      color: "#FFFFFF",
                      cursor: "pointer",
                      background: cat.category === category?.category ? "#F2672A" : "#232F3E",
                    }}
                    onClick={() => {
                      console.log(cat)
                      setCategory(cat);
                    }}
                  >
                    {cat.category.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
      <article className="wrapper categoryRowBlk py-20">
        <div className="container">
          <div className="prdctListOuterDiv">
            <div className="sortBlkOutr">
              <div className="row align-items-center justify-content-end ">
                <div className="col-auto">
                  <div className="row align-items-center justify-content-end pb-20">
                    <div className="col-auto">Show Per Page</div>
                    <div className="col-auto">
                      <div className="sortByCol">
                        <div className="form-group">
                          <select ref={selectRef3} className="wide">
                            <option value="Featured">20</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="row align-items-center justify-content-end pb-20">
                    <div className="col-auto">Sort By</div>
                    <div className="col-auto">
                      <div className="sortByCol">
                        <div className="form-group">
                          <select ref={selectRef2} className="wide">
                            <option value="Featured">Featured</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="sdbrWdgt">
                  <div className="filterSideBarWgt sideBarBg ">
                    <div className="sdbrHdng mb-4">
                      <h4>Filter</h4>
                    </div>
                    <div className="filtrAcordion">
                      <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="3">
                          {/* <Accordion.Header>Price</Accordion.Header>
                          <Accordion.Body> */}
                            {/* <div className="filtrList mb-2">
                              <ul>
                                <li>
                                  Under $500
                                </li>
                                <li>
                                  $500 - $750
                                </li>
                                <li>
                                  $1,000 - $1,500
                                </li>
                                <li>
                                  $1,500 - $2,000
                                </li>
                                <li>
                                  $2,000 - $5,000
                                </li>
                                <li>
                                  $5,000 - $10,000
                                </li>
                                <li>
                                  $15,000 - $20,000
                                </li>
                                <li>
                                  Over $20,000
                                </li>
                              </ul>
                            </div> */}
                          {/* </Accordion.Body> */}
                        </Accordion.Item> 
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Sub Categories</Accordion.Header>
                          <Accordion.Body>
                            <div className="filtrList mb-2">
                              <ul>
                                {category?.subCategories?.map((subcategory, key) => {
                                  return (
                                    <li index={key}>
                                      <a style={{ cursor: "pointer" }} onClick={(e)=>handleSubcategory(e,subcategory)}>{subcategory.name}</a>
                                    </li>
                                  );
                                })}
                                {/* {categories.category?.subcategories?.map((subcategory, key) => {
                                  return (
                                  <li index={key}>
                                    <a style={{ cursor: "pointer" }}>{subcategory.name}</a>
                                  </li>
                                );
                                })} */}
                              </ul>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="0">
                          {/* <Accordion.Header>Color</Accordion.Header>
                          <Accordion.Body>
                            <div className="filtrList mb-2">
                              <form className="formStyle">
                                <ul>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="acceptCheck"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="acceptCheck"
                                      >
                                        White
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="yellow"
                                      />
                                      <label className="form-check-label" htmlFor="yellow">
                                        Yellow
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="white"
                                      />
                                      <label className="form-check-label" htmlFor="white">
                                        Beige
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="brown"
                                      />
                                      <label className="form-check-label" htmlFor="brown">
                                        Brown
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="grey"
                                      />
                                      <label className="form-check-label" htmlFor="grey">
                                        Grey
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="multicolor"
                                      />
                                      <label className="form-check-label" htmlFor="multicolor">
                                        Multicolor
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </form>
                            </div>
                          </Accordion.Body> */}
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          {/* <Accordion.Header>Size</Accordion.Header>
                          <Accordion.Body>
                            <div className="filtrList mb-2">
                              <form className="formStyle">
                                <ul>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="check"
                                      />
                                      <label className="form-check-label" htmlFor="check">
                                        20x17x20 Inch
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="check1"
                                      />
                                      <label className="form-check-label" htmlFor="check1">
                                        20x17x20 mm
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="check2"
                                      />
                                      <label className="form-check-label" htmlFor="check2">
                                        40x18x90 cm
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="check3"
                                      />
                                      <label className="form-check-label" htmlFor="check3">
                                        20x17x20 Inch
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="check4"
                                      />
                                      <label className="form-check-label" htmlFor="check4">
                                        20x17x20 mm
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="check5"
                                      />
                                      <label className="form-check-label" htmlFor="check5">
                                        20x17x20 cm
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </form>
                            </div>
                          </Accordion.Body>*/}
                        </Accordion.Item>
                        
                      </Accordion>
                    </div>
                  </div>
                  <div className="sideBarBnrCol">
                    <div className="sideBrAddBnr py-4">
                      <Link to="/">
                        <img src="/img/addBnr1.png" />
                      </Link>
                    </div>
                    <div className="sideBrAddBnr">
                      <Link to="/">
                        <img src="/img/addBnr2.png" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="prdctListRow">
                  <div className="row mb-4">
                    {loading && (
                      <div
                        className=""
                        style={{
                          height: 300,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <PuffLoader color="#2e1e7c" />
                      </div>
                    )}

                    {!loading && !category && (
                      <div
                        className=""
                        style={{
                          height: 300,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>(Select a Category)</p>
                      </div>
                    )}

                    {!loading && products && !products.length && (
                      <div
                        className=""
                        style={{
                          height: 300,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>(No Products)</p>
                      </div>
                    )}

                    {!loading &&
                      products?.map((product, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                          <div className="prdctListItem">
                            <div className="prdctListMedia">
                              <div
                                className="prdctListImg"
                                style={{
                                  backgroundImage: product.images[0]
                                    ? `url("${Rest}/documents/get/${product.images[0].documentId}")`
                                    : `url("img/productImg1.jpg")`,
                                }}
                              >
                                <div className="prdctListOverlay"></div>
                              </div>
                              <div className="prdctHovrCard">
                                <Link to="/wishlist">
                                  <span className="prdctListWishListIcon">
                                    <img src="/img/wishListIconDark.svg" />
                                  </span>
                                </Link>
                                <Link to="/">
                                  <span className="prdctListIcon">
                                    <img src="/img/prdctListIcon.svg" />
                                  </span>
                                </Link>
                              </div>
                              <div className="prdctHvrBtns">
                                <a
                                  style={{ cursor: "pointer" }}
                                  className="btnCommon"
                                  onClick={() => {
                                    productDetails(product);
                                  }}
                                >
                                  View Detail
                                </a>
                              </div>
                            </div>
                            <div className="prodctListInfoCol text-center">
                              <div className="prdctListTitle">
                                <h4>
                                  <a
                                    onClick={() => {
                                      productDetails(product);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {product.name}
                                  </a>
                                </h4>
                              </div>
                              <div className="rvwRtngPrgrsStars">
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <span>({Math.ceil(Math.random() * 100)})</span>
                              </div>
                              <div className="prdctListInfo">
                                <p
                                  dangerouslySetInnerHTML={{ __html: product.description.slice(0, 100) + "..." }}
                                ></p>
                              </div>
                              <div className="prodctListPrice d-flex justify-content-center">
                                {/* <div className="price">£{product.variants[1].price}</div> */}
                                {/* <div className="oferPrice">$65.00</div> 
                                                            <div className="discntPrice">(£100.43 Inc VAT)</div>*/}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="pgntnOuter text-center pt-3 pb-3">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" role="button" tabIndex="0" href="#">
                          <span aria-hidden="true">‹</span>
                          <span className="visually-hidden">Previous</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" role="button" tabIndex="0" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" role="button" tabIndex="0" href="#">
                          <span aria-hidden="true">2</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" role="button" tabIndex="0" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item active">
                        <span className="page-link">
                          4<span className="visually-hidden">(current)</span>
                        </span>
                      </li>

                      <li className="page-item">
                        <a className="page-link" role="button" tabIndex="0" href="#">
                          <span aria-hidden="true">…</span>
                          <span className="visually-hidden">More</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" role="button" tabIndex="0" href="#">
                          22
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" role="button" tabIndex="0" href="#">
                          <span aria-hidden="true">›</span>
                          <span className="visually-hidden">Next</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <HomeAbout />
      <Footer />
    </section>
  );
}
export default ProductList;
