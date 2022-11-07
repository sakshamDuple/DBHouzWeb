import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { stateActions } from "../redux/stateActions";
import { Rest, RestClient, RestAdmin, RestUser } from "../rest";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../css/productdetails.css";
import "./AddtoCart.css";
import "../css/OrderItems.css";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import $ from "jquery";
import axios from "../API/axios";

window.jQuery = window.$ = $;
require("jquery-nice-select");

function OrderDetail() {
  const categories = useSelector((s) => s.categories);
  const baseUrl = process.env.REACT_APP_API_HOST;
  let [count, setCount] = useState(1);
  let [selectedVariant, setSelectedVariant] = useState(0);
  const [peopleAlsoSearcherFor, setPeopleAlsoSearcherFor] = useState();
  const [orderProduct, setOrderProduct] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [reviewProId, setReviewProId] = useState("");
  const user = useSelector((s) => s.user);
  console.log(user.jwt);

  //   const getProduct=async()=>{
  //    const {data}= await axios.get(`${baseUrl}/product/getOne/${products?.products[0]?.sellerId}`)
  //    setOrderProduct(data)
  //   }
  //  useEffect(()=>{
  //     getProduct()
  //  },[products])

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    if (!user) {
      return alert("please login");
    }
    if (description == "" || description == undefined) {
      return setError("This field is required");
    }
    setError("");
    const reviewData = {
      review: {
        userId: user.user._id,
        orderId: orderId,
        description: description,
        rating: currentRatingValue,
        productId: reviewProId,
      },
      token: user.jwt,
    };
    RestUser.postReview(reviewData).then((res) => {
      console.log(res);
    });

    console.log(reviewData);
  };
  const getOrderProducts = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/order/getProductByOrderId/${orderId}/${1}/${1}`
      );
      setOrderProduct(data.result);
      setReviewProId(data.result[0]._id);
    } catch (error) {
      console.log(error);
      alert("somthing wrong")
    }
  };
  useEffect(() => {
    getOrderProducts();
  }, []);

  let state = {
    product: {
      brandId: "635a14514f01e2e169678929",
      categoryId: "634d01824dd5edd2bd53fbd9",
      createdAt: 1666848863602,
      description: "<p>Martena Duncan</p>",
      images: [
        {
          documentId: "635a185f220c431230e8fd1c",
          priority: 1,
        },
      ],
      merchantId: "634f7b3be313439955d61348",
      name: "Martena Duncan",
      rating: 4,
      seo: {
        metaTagDescription: "",
        metaTagKeywords: "",
        metaTagTitle: "",
      },
      status: "INACTIVE",
      subCategoryId: "634d096c4dd5edd2bd53fbf5",
      variantParameters: {
        colorEnabled: true,
        dimensionHeightEnabled: true,
        dimensionThicknessEnabled: false,
        dimensionUnitId: "635a14514f01e2e16967892f",
        dimensionWidthEnabled: true,
        sizeEnabled: true,
        sizeList: ["15"],
        styleEnabled: true,
      },
      variants: [
        {
          availableQuantity: 200,
          color: "",
          colorId: "635a14514f01e2e169678963",
          dimensions: { height: 15, width: 15, thickness: 0 },
          discountPercentage: 0,
          material_finish: "Martena Duncan fg",
          material_type: "Martena Duncan opu",
          minPurchaseQuantity: 1,
          name: "Martena Duncan 15",
          price: 170,
          priority: 1,
          size: "15",
          style: "Martena Duncan 15",
          warranty_period: 2,
        },
      ],
      _id: "635a185f220c431230e8fd1b",
    },
  };
  const [color, setColor] = useState([]);

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const [currentRatingValue, setcurrentRatingValue] = useState(0);
  const [hoverRatingValue, sethoverRatingValue] = useState(undefined);
  const [description, setDiscription] = useState("");
  const [error, setError] = useState("");
  const stars = Array(5).fill(0);
  const getCategory = (id, subId) => {
    const cat = categories?.filter((category) => category.category._id === id);
    const subCat = cat[0].subCategories.filter(
      (subCategory) => subCategory._id === subId
    );
     return { cat: cat[0].category.name, subCat: subCat[0].name };
  };

  const handleRatingClick = (value) => {
    setcurrentRatingValue(value);
  };
  const handleRatingMouseOver = (newhoverRatingValue) => {
    sethoverRatingValue(newhoverRatingValue);
  };

  const handleMouseLeave = () => {
    sethoverRatingValue(undefined);
  };
  console.log(state);

  //   const product = products.products.product;
  // const product = state.product;

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

  //   useEffect(() => {
  //     setGetCart(cartVal?.length)
  //   }, [cartVal,getCart])

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

  // useEffect(async () => {
  //   filterPeopleAlsoSearcherFor();
  //   getColors();
  //   console.log(cartVal?.length);
  //   await setGetCart(cartVal?.length);
  //   console.log(getCart);
  // }, [product, cartVal, getCart]);

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
                {/* {orderProduct?.map((obj) => {
                  return <OrderItems product={obj} />;
                })} */}

                {orderProduct?.map((product, index) => {
                  console.log(product);

                  return (
                    <div className="searchItem">
                      <div
                        style={{
                          backgroundImage: product?.images[0]
                            ? `url("${Rest}/documents/get/${product.images[0].documentId}")`
                            : `url("img/productDtilImg.jpg")`,
                        }}
                        className="siImg"
                      ></div>

                      <div className="siDesc">
                        <h1 className="siTitle">{product?.name}</h1>
                        <span className="siDistance">
                          <span className="text-secondary">
                            {
                              getCategory(
                                product.categoryId,
                                product.subCategoryId
                              ).cat
                            }
                          </span>{" "}
                          {">"}
                          <span className="text-secondary bg-light">
                            {
                              getCategory(
                                product.categoryId,
                                product.subCategoryId
                              ).subCat
                            }
                          </span>
                        </span>
                        <span className="siDistance">
                          {product?.description}
                        </span>

                        <div>
                          <span className="siSubtitle">Dimension : </span>
                          <span className="siFeatures">
                            {" "} 
                            {getDimension(product.variants[selectedVariant])}
                          </span>
                        </div>
                        <div>
                          <span className="siSubtitle">Color : </span>
                          <span className="siFeatures">
                            {" "}
                            {getSingleColors(
                              product.variants[selectedVariant]
                                ? product.variants[selectedVariant]?.colorId
                                : "green"
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="siSubtitle">Style : </span>
                          <span className="siFeatures">
                            {" "}
                            {product.variants[selectedVariant]
                              ? product.variants[selectedVariant].style
                              : "T-shirt"}
                          </span>
                        </div>
                      </div>
                      <div className="siDetails">
                        <div className="siRating">
                          <span></span>
                          <button>
                            {product.rating || 0}{" "}
                            {stars?.map((_, index) => {
                              return (
                                <i
                                  key={index}
                                  className={
                                    product.rating > index
                                      ? "fa fa-star ylowStar"
                                      : "fa fa-star greyStar"
                                  }
                                  aria-hidden="true"
                                ></i>
                              );
                            })}{" "}
                          </button>
                        </div>

                        <div className="siDetailTexts">
                          <span className="siPrice">
                            {`£ ${
                              product.variants[selectedVariant]
                                ? (
                                    (product.variants[selectedVariant].price *
                                      82) /
                                    100
                                  ).toFixed(2)
                                : 0
                            }`}{" "}
                            <sub>
                              + £
                              {(
                                (product.variants[selectedVariant]?.price /
                                  100) *
                                18
                              ).toFixed(2)}
                              vat
                            </sub>{" "}
                          </span>

                          <button
                            className="siCheckButton"
                            onClick={() => setReviewProId(product._id)}
                          >
                            <a style={{ color: "white" }} href="#Comments">
                              Rate This Product
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

               
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="wrapper py-40 simiLarPrdctBlk " id="Comments">
        <div className="container">
          <div className="prdctDtlHdng">
            <h3>Comments and Reviews</h3>
          </div>
        </div>
        <div className="container">
          <div className="whtBg">
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
                        <Form.Control
                          as="textarea"
                          onChange={(e) => setDiscription(e.target.value)}
                          rows={6}
                        />
                        {error && <p className="text-danger">{error}</p>}
                        <Button
                          className="btnCommon mt-3 pull-right"
                          onClick={reviewSubmitHandler}
                        >
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
export default OrderDetail;

