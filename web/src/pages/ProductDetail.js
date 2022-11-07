import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tabs, Tab, Table, Form } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { stateActions } from "../redux/stateActions";
import { Rest, RestClient, RestAdmin } from "../rest";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../css/productdetails.css";
import "./AddtoCart.css";

import {
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import $ from "jquery";
window.jQuery = window.$ = $;
require("jquery-nice-select");

function ProductDetail() {
  let [count, setCount] = useState(1);
  let [selectedVariant, setSelectedVariant] = useState(0);
  const [peopleAlsoSearcherFor, setPeopleAlsoSearcherFor] = useState();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [color, setColor] = useState([]);
 
  
 
  const [currentRatingValue, setcurrentRatingValue] = useState(0);
  const [hoverRatingValue, sethoverRatingValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const handleRatingClick = (value) => {
    setcurrentRatingValue(value);
  };
  const handleRatingMouseOver = (newhoverRatingValue) => {
    sethoverRatingValue(newhoverRatingValue);
  };

  const handleMouseLeave = () => {
    sethoverRatingValue(undefined);
  };

  const product = state.product;
  let AllUnits;
  let units = async () => {
    AllUnits = await RestAdmin.getAllUnits();
  };

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1 >= 1 ? count - 1 : 1;
    setCount(count);
  }
  const changeSelectedVariant = (index) => {
    setSelectedVariant(index);
  };
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const selectRef2 = useRef();
  useEffect(() => {
    $(selectRef2.current).niceSelect();
  }, []);

  const getColors = async () => {
    let color = await RestAdmin.getAllColors();
    setColor(color);
  };

  const [getCart, setGetCart] = useState(0);

  let cartVal;
  const getValueInCart = () => {
    cartVal = useSelector((s) => s.cart);
  };
  getValueInCart();
  console.log(cartVal);

  const getSingleColors = (id) => {
    if (color && color.colors) {
      const _color = color.colors.filter((item) => item._id === id);
      return _color[0]?.name;
    } else return "green";
  };

  // useEffect(() => {
  //   setGetCart(cartVal?.length)
  // }, [cartVal,getCart])

  $(".btnCommonm").on("click", function () {
    var button = $(this);
    var cart = $(".cartBtn");
    console.log(button, cart);
    button.addClass("sendtocart");
    setTimeout(function () {
      button.removeClass("sendtocart");
      console.log(getCart);
      cart.addClass("shake").attr("data-totalitems", cartVal?.length);
      setTimeout(function () {
        cart.removeClass("shake");
      }, 2000);
    }, 2000);
  });

  const getDimension = (obj) => {
    if (obj)
      return `${obj.dimensions.height} inches x ${obj.dimensions.width} inches x ${obj.dimensions.thickness} inches`; //^${unit}
    else return "0 x 0 x 0 inches";
  };

  async function filterPeopleAlsoSearcherFor() {
    let products = await RestClient.getProductsByCategoryId(product.categoryId);
    products = products.data.filter((s) => s._id !== product._id);
    setPeopleAlsoSearcherFor(products);
  }
  console.log(peopleAlsoSearcherFor);
  console.log(cartVal?.length);

  useEffect(async () => {
    filterPeopleAlsoSearcherFor();
    getColors();
    console.log(cartVal?.length);
    await setGetCart(cartVal?.length);
    console.log(getCart);
  }, [product, cartVal, getCart]);

  console.log(product);

  return (
    <section className="wrapper">
      <Header />
      <article className="categoryInrBlk hdrBrNone wrapper">
        <div className="greyBg2 py-4 mb-5">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col"></div>
              <div className="col-auto">
                <div className="breadcrumbsCol py-20">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="/">Products</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="/">Artificial Stone</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Artificial Stone Tiles
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="wrapper categoryRowBlk py-2">
        <div className="container">
          <div className="prdctDetalOute3001rDiv">
            <div className="sortBlkOutr">
              <div className="row">
                <div className="col-md-5">
                  <Swiper
                    loop={true}
                    spaceBetween={20}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="productDtlSlide crslCntrls2"
                  >
                    {product.images &&
                      product.images?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="prdctDtlSlideItem">
                            <div className="prdctDtlSlideMedia">
                              <div
                                className="prdctDtlImg"
                                style={{
                                  backgroundImage: product.images[index]
                                    ? `url("${Rest}/documents/get/${product.images[index].documentId}")`
                                    : `url("img/productDtilImg.jpg")`,
                                }}
                              ></div>
                              <div className="prdctDtlHovrCard">
                                <a href="/">
                                  <span className="prdctDtlWishListIcon">
                                    <img src="img/wishListWhiteIcon.svg" />
                                  </span>
                                </a>
                                <a href="/">
                                  <span className="prdctDtlListIcon">
                                    <img src="img/3dIcon.svg" />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="prdctDtlSlidThumb mt-3"
                  >
                    {product.images &&
                      product.images?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="prdctThumbSlideMedia">
                            <div
                              className="prdctDtlImgThumb"
                              style={{
                                backgroundImage: product.images[index]
                                  ? `url("${Rest}/documents/get/${product.images[index].documentId}")`
                                  : `url("img/productDtilImg.png")`,
                              }}
                            ></div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
                <div className="col-md-7">
                  <div className="prodctDtlBlkOutr">
                    <div className="prdctDtlHdng">
                      <h3>{product.name}</h3>
                    </div>
                    <div className="rvwRtngPrgrsStars">
                      <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                      <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                      <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                      <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                      <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                      <span>11 reviews</span>
                    </div>
                    <div className="prodctDtlPriceLrge d-flex align-items-center">
                      <div className="price">{`£ ${
                        product.variants[selectedVariant]
                          ? (
                              (product.variants[selectedVariant].price * 82) /
                              100
                            ).toFixed(2)
                          : 0
                      }`}</div>
                      +
                      {/* <div className="prcentOff px-3">
                        {(product.variants[selectedVariant].price / 100) * 8}£
                        VAT Included
                      </div> */}
                      <div className="gst">
                        £
                        {(
                          (product.variants[selectedVariant]?.price / 100) *
                          18
                        ).toFixed(2)}
                        vat
                      </div>
                    </div>
                    {console.log("product:", product)}
                    <div className="leftStock">
                      {product.variants[selectedVariant]?.availableQuantity}{" "}
                      item left in Stock
                    </div>
                    <div className="prdctDtlSize @d-flex align-items-center py-3">
                      <div className="btn-label">
                        <h5>Variant name:</h5>
                      </div>
                      <div>
                        <div className="btn-container@ container@ detailPage-variantBtns">
                          <div className="row">
                            <div className="col-md-12">
                              {product.variants &&
                                product.variants?.map((variant, index) => (
                                  <button
                                    key={index}
                                    className={
                                      index === selectedVariant
                                        ? "btn-active button"
                                        : "button"
                                    }
                                    onClick={(e) => {
                                      changeSelectedVariant(index);
                                    }}
                                  >
                                    {variant.size} Foot /{" "}
                                    {getSingleColors(variant.colorId)}
                                    <br />
                                    <span>£{variant?.price}</span>
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row align-items-center pt-2 label-padding">
                      <div className="col-auto">
                        <div className="sizeLableHdng">
                          <h5>Color :</h5>
                        </div>
                      </div>
                      {getSingleColors(
                        product.variants[selectedVariant]
                          ? product.variants[selectedVariant]?.colorId
                          : "green"
                      )}
                    </div>

                    <div className="row align-items-center pt-2 label-padding">
                      <div className="col-auto">
                        <div>
                          <h5>Dimension :</h5>
                        </div>
                      </div>
                      {getDimension(product.variants[selectedVariant])}
                    </div>

                    <div className="row align-items-center pt-2 label-padding">
                      <div className="col-auto">
                        <div>
                          <h5>Style :</h5>
                        </div>
                      </div>
                      {product.variants[selectedVariant]
                        ? product.variants[selectedVariant].style
                        : "T-shirt"}
                    </div>

                    <div className="row align-items-center pt-2">
                      <div className="col-auto">
                        <div className="sizeLableHdng">
                          <h5>Quantity:</h5>
                        </div>
                      </div>
                      <div className="col-auto pl-0">
                        <div className="countRow d-flex">
                          <button onClick={decrementCount} className="countBtn">
                            -
                          </button>
                          <div className="countTotal">{count}</div>
                          <button
                            onClick={incrementCount}
                            className="countBtn "
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row py-4">
                      <div className="col">
                        <div className="prdctDtlBuyBtns">
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(
                                stateActions.addCartItem(
                                  product,
                                  count,
                                  product.variants[selectedVariant]
                                )
                              );
                            }}
                            className="btnCommon btnCommonm"
                          >
                            Add To Cart
                            <span className="cartBtn-item">
                              <img src="img/cartWhite.png" />
                            </span>
                          </a>
                          <Link
                            to="/checkout"
                            className="btnCommon btnDark"
                            onClick={() => {
                              dispatch(
                                stateActions.addCartItem(
                                  product,
                                  count,
                                  product.variants[selectedVariant]
                                )
                              );
                            }}
                          >
                            Buy Now
                            <span>
                              <img src="img/buyLableIcon.svg" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="ViewBtn">
                      <button>
                        Take a 3d view
                        <span>
                          <img src="img/3dIcon.svg" />
                        </span>
                      </button>
                    </div>
                    <div className="prdctDtlInfo">
                      <h5>
                        <span>Save Extra</span> with 2 offers
                      </h5>
                      <p>
                        <span>Cashback (4)</span> variations of passages of
                        Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour,{" "}
                      </p>
                      <p>
                        <span>Cashback (4)</span> variations of passages of
                        Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour,{" "}
                      </p>
                    </div>
                    <div className="prdctDtlShare ">
                      <ul className="d-flex align-items-center">
                        <li>Share:</li>
                        <li>
                          <Link to="/">
                            <i className="fa fa-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="/">
                            <i className="fa fa-whatsapp"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="/">
                            <i className="fa fa-instagram"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="prdctDtlinfoTabs mt-5">
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Description">
                <div className="prdctDtlTabInfo">
                  {console.log(product.description)}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  ></p>
                  <br />
                  {/* <p>
                    <b>Benefits</b>
                  </p>
                  <ul>
                    <li>18x125mm pack covers 2.2m²</li>
                    <li>300-1500mm lengths</li>
                    <li>UV cured lacquer finish</li>
                    <li>Tongue & groove all 4 edges</li>
                    <li>Stick down or secret nail</li>
                  </ul> */}
                </div>
              </Tab>
              <Tab eventKey="profile" title="Specifications">
                <div className="prdctTabTable">
                  <Table bordered hover>
                    <tbody>
                      <tr>
                        <td className="tdBg w-25">Size</td>
                        <td>
                          {product.variants[selectedVariant]
                            ? product.variants[selectedVariant].size
                            : 15}
                        </td>
                      </tr>
                      <tr>
                        <td className="tdBg w-25">Dimension</td>
                        <td>
                          {console.log(AllUnits)}
                          {product.variants[selectedVariant]
                            ? `${
                                product.variants[selectedVariant].dimensions
                                  .height > 0
                                  ? `${product.variants[selectedVariant].dimensions.height} inches *`
                                  : ""
                              } ${
                                product.variants[selectedVariant].dimensions
                                  .width > 0
                                  ? `${product.variants[selectedVariant].dimensions.width} inches`
                                  : ""
                              } ${
                                product.variants[selectedVariant].dimensions
                                  .thickness > 0
                                  ? `* ${product.variants[selectedVariant].dimensions.thickness} inches`
                                  : ""
                              }` //${AllUnits}
                            : "0 inches x 0 inches x 0 inches"}
                        </td>
                      </tr>
                      <tr>
                        <td className="tdBg w-25">Color</td>
                        {console.log(
                          "product",
                          product.variants[selectedVariant]
                        )}
                        <td>
                          {product.variants[selectedVariant]
                            ? product.variants[selectedVariant].color
                            : "Invalid"}
                        </td>
                      </tr>
                      {product.variants[selectedVariant].dimensions.height >
                        0 && (
                        <tr>
                          <td className="tdBg w-25">Height</td>
                          <td>
                            {
                              product.variants[selectedVariant].dimensions
                                .height
                            }
                          </td>
                        </tr>
                      )}
                      {product.variants[selectedVariant].dimensions.height >
                        0 && (
                        <tr>
                          <td className="tdBg w-25">Width</td>
                          <td>
                            {product.variants[selectedVariant].dimensions.width}
                          </td>
                        </tr>
                      )}
                      {product.variants[selectedVariant].dimensions.thickness >
                        0 && (
                        <tr>
                          <td className="tdBg w-25">Thickness</td>
                          <td>
                            {
                              product.variants[selectedVariant].dimensions
                                .thickness
                            }
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="tdBg w-25">Material</td>
                        <td>
                          {product.variants[selectedVariant].material_type}
                        </td>
                      </tr>
                      <tr>
                        <td className="tdBg w-25 ">Finish</td>
                        <td>
                          {product.variants[selectedVariant].material_finish}
                        </td>
                      </tr>
                      <tr>
                        <td className="tdBg w-25">Warranty Period</td>
                        <td>
                          {product.variants[selectedVariant]
                            ? product.variants[selectedVariant].warranty_period
                            : "1"}{" "}
                          Years
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  {/* <p>
                    <b>Certifications</b>
                  </p>
                  <ul>
                    <li>FSC</li>
                  </ul> */}
                </div>
              </Tab>
            </Tabs>
          </div>
          <article className="prdctDtlRatingBlk mt-5 pt-4 pb-4 ">
            <div className="container">
              <div className="mainHeading headingCenter pb-30">
                <h2>RATINGS & REVIEWS</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's{" "}
                </p>
              </div>
              <div className="prdctRatingRow">
                <div className="row align-items-center d-flex text-center">
                  <div className="col">
                    <div className="reviewCol">
                      <div className="reviewContentBlk">
                        <div>
                          <h3>3.8/5</h3>
                        </div>
                        <div className="rvwRtngPrgrsStars">
                          <i
                            className="fa fa-star ylowStar"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star ylowStar"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star ylowStar"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star-half-o ylowStar"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star blkStar"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <h4>12 Ratings & 0 Review</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="reviewCol">
                      <div className="reviewContentBlk">
                        <p>No recommendations yet.</p>
                        <h5>Would you like to recommend this item?</h5>
                        <div className="yenoBtns">
                          <Link to="/" className="ysBtn">
                            Yes
                          </Link>
                          <Link to="/" className="noBtn">
                            No
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="reviewCol">
                      <div className="reviewContentBlk">
                        <div className="haveUsedHdng">
                          <h3>Have you used this product?</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </article>
      <article className="wrapper py-40 simiLarPrdctBlk ">
        <div className="container">
          <div className="prdctDtlHdng">
            <h3>Comments and Reviews</h3>
          </div>
        </div>
        <div className="container">
          <div className="whtBg">
            <div className="row pb-20">
              <div className="col-auto">
                <div className="reviewMedia">
                  <img src="img/userImg1.png" />
                </div>
              </div>
              <div className="col">
                <div className="reviewInfo">
                  <div className="reviewTitle">
                    <h4>Johan Doe</h4>
                  </div>
                  <div className="rvwRtngPrgrsStars">
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <span>April 13, 2022</span>
                  </div>
                  <div className="reviewTxt">
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable. If you are going to
                      use a passage of Lorem Ipsum, you need to be sure there
                      isn't anything embarrassing hidden in the middle of text.
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pb-20">
              <div className="col-auto">
                <div className="reviewMedia">
                  <img src="img/userImg1.png" />
                </div>
              </div>
              <div className="col">
                <div className="reviewInfo">
                  <div className="reviewTitle">
                    <h4>Johan Doe</h4>
                  </div>
                  <div className="rvwRtngPrgrsStars">
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                    <span>April 13, 2022</span>
                  </div>
                  <div className="reviewTxt">
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable. If you are going to
                      use a passage of Lorem Ipsum, you need to be sure there
                      isn't anything embarrassing hidden in the middle of text.
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reviewComentRow ">
              <div className="row">
                <div className="col-sm-12">
                  <div className="reviewComentBlk">
                    <h4>Rate this Product</h4>
                    <p>Tell others what you think</p>
                    <div className="rvwRtngGreyStars">
                      {stars?.map((_, index) => {
                        return (
                          <i
                            key={index}
                            onClick={() => handleRatingClick(index + 1)}
                            onMouseOver={() => handleRatingMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            className={
                              (hoverRatingValue || currentRatingValue) > index
                                ? "fa fa-star ylowStar"
                                : "fa fa-star greyStar"
                            }
                            aria-hidden="true"
                          ></i>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="comentFormBlk">
                    <Form className="comentFormInr">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Write a comment</Form.Label>
                        <Form.Control as="textarea" rows={6} />
                        <Button className="btnCommon mt-3 pull-right">
                          Submit
                        </Button>{" "}
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="wrapper py-3 simiLarPrdctBlk prodctDtlSimilr ">
        <div className="container">
          <div className="mainHeading headingCenter pb-4">
            <h2>People Also Searched For These Products</h2>
          </div>
          <div className="newsSliderOuter pb-3 ">
            <div className="similarPrdctSlidr crslCntrls2 crslCntrls3">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                spaceBetween={2}
                slidesPerView={4}
                centeredSlides={false}
                loop={true}
              >
                {peopleAlsoSearcherFor?.map((element, index) => {
                  return (
                    <SwiperSlide>
                      <div className="similarItem">
                        <div className="prdctListItem">
                          <div className="prdctListMedia">
                            <div
                              className="prdctListImg"
                              style={{
                                backgroundImage: element.images[0]
                                  ? `url("${Rest}/documents/get/${element.images[0].documentId}")`
                                  : `url("img/productDtilImg.jpg")`,
                              }}
                            >
                              <div className="prdctListOverlay"></div>
                            </div>
                            <div className="prdctHovrCard">
                              <Link to="/">
                                <span className="prdctListWishListIcon">
                                  <img src="img/wishListIconDark.svg" />
                                </span>
                              </Link>
                              <Link to="/">
                                <span className="prdctListIcon">
                                  <img src="img/prdctListIcon.svg" />
                                </span>
                              </Link>
                            </div>
                            <div className="prdctNwHvrBtns">
                              <Link
                                to="/cart"
                                className="btnCommon"
                                onClick={() => {
                                  dispatch(
                                    stateActions.addCartItem(
                                      product,
                                      count,
                                      product.variants[selectedVariant]
                                    )
                                  );
                                }}
                              >
                                Add To Cart
                              </Link>
                              <Link
                                to="/checkout"
                                className="btnCommon btnDark"
                                onClick={() => {
                                  dispatch(
                                    stateActions.addCartItem(
                                      element,
                                      count,
                                      element.variants[0]
                                    )
                                  );
                                }}
                              >
                                Buy Now
                              </Link>
                            </div>
                          </div>
                          <div className="prodctListInfoCol text-center">
                            <div className="prdctListTitle">
                              <h4>
                                {" "}
                                <Link to="/">{element.name}</Link>
                              </h4>
                            </div>
                            <div className="rvwRtngPrgrsStars">
                              <i
                                className="fa fa-star ylowStar"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-star ylowStar"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-star ylowStar"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-star ylowStar"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-star ylowStar"
                                aria-hidden="true"
                              ></i>
                              <span>(981)</span>
                            </div>
                            <div className="prdctListInfo">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: element.description,
                                }}
                              ></p>
                            </div>
                            <div className="prodctDtlPrice d-flex justify-content-center">
                              <div className="price">
                                Starts From £{element?.variants[0]?.price}
                              </div>
                              <div className="oferPrice">
                                £{(element?.variants[0]?.price * 109) / 100}
                              </div>
                              {/* {console.log(element.variants)} */}
                              <div className="discntPrice">(9% off)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </article>
      <section>
        <article className="homeAboutBlk wrapper">
          <div className="container">
            <div className="abtHomeInfo">
              <h3>Different Types of Marble </h3>
              <p>
                Quartzite Marble Collection | Onyx Marble Collection | Granite
                Marble Collection | White Marble | Beige Marble | Grey Marble |
                Green Marble | Pink Marble | Red Marble | Blue Marble | Brown
                Marble | Black Marble | Onyx Marble Collection | Granite Marble
                Collection | White Marble | Beige Marble | Grey Marble | Green
                Marble | Pink Marble | Red Marble | Blue Marble | Brown Marble |
                Black Marble
              </p>
              <h3>Other Categories</h3>
              <p>
                Bathroom Tiles | Kitchen Tiles | Living Room Tiles | Bedroom
                Tiles | Outdoor Tiles | Commercial Tiles | Ceramic Wall Tiles |
                Vitrified Double Charge Tiles | Made In Italy Tiles | Floor
                Tiles | Wall Tiles | Marble | Mosaico
              </p>
              <h3>Product</h3>
              <p>
                Quartzite Marble Collection | Onyx Marble Collection | Granite
                Marble Collection | White Marble | Beige Marble | Grey Marble |
                Green Marble | Pink Marble | Red Marble | Blue Marble | Brown
                Marble | Black Marble | Onyx Marble Collection | Granite Marble
                Collection | White Marble | Beige Marble | Grey Marble | Green
                Marble | Pink Marble | Red Marble | Blue Marble | Brown Marble |
                Black Marble
              </p>
            </div>
          </div>
        </article>
      </section>
      <Footer />
    </section>
  );
}
export default ProductDetail;
