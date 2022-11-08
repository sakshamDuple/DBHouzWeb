import React, { useEffect, useState, useRef } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import Pagination from "../container/pagination/pagination";
import {
  strictValidArray,
  strictValidArrayWithLength,
} from "../utils/commonutils";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";
import { filter } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
const initialFilter = {
  catagoery: "",
  sub_catagoery: [],
  color: [],
};

const useStyles = makeStyles({
  root: {
    alignSelf: "center",
  },
});

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector((s) => s.categories);
  const [loading, setLoading] = useState();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState();
  const [filters, setFilters] = useState(initialFilter);
  const [selectOption, setSelectOption] = useState();
  const [limitOption, setLimitOption] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [TotalCount, setTotalCount] = useState(10);
  const [priceValue, setPriceValue] = useState([0, 100000]);
  const [color, setColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState();
  const [token, setToken] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentCat = location?.state?.category;

  useEffect(() => {
    if (currentCat) {
      setSearchParams({
        categoryId: currentCat.category._id,
      });
      console.log(currentCat.category._id);
      setCategory(currentCat);
      setFilters((prev) => {
        return { ...prev, catagoery: currentCat.category._id };
      });
    }
  }, []);
  const callback = (cat) => {
    setSearchParams({
      categoryId: cat.category._id,
    });

    setCategory(cat);
    setFilters((prev) => {
      return { ...prev, catagoery: cat.category._id };
    });
  };
  const onClickCategeory = (cat) => {
    setSearchParams({
      categoryId: cat.category._id,
    });
    setCategory(cat);
    setFilters((prev) => {
      return { ...prev, catagoery: cat.category._id };
    });
  };

  const onClickRestFilter = (e) => {
    e.preventDefault();
    const { sub_catagoery, color } = filters || {};
    for (let x of sub_catagoery) {
      handleSubCategory(x);
    }
    for (let x of color) {
      handleColors(x);
    }
    return setPriceValue([0, 1000]);
    // setFilters((prev) => {
    //   return { ...prev, sub_catagoery: [], color: [] }
    // });
  };

  useEffect(() => {
    if (!strictValidArrayWithLength(categories)) return;
    const selectedCategory = searchParams.get("categoryId");
    let currentCategory;
    if (currentCat) {
      currentCategory = currentCat;
      return currentCategory && setCategory(currentCategory);
    }
    if (selectedCategory) {
      currentCategory = categories.find((i) => {
        return i.category._id == selectedCategory;
      });
      return currentCategory && setCategory(currentCategory);
    } else {
      currentCategory = categories[0];
      currentCategory && onClickCategeory(currentCategory);
    }
  }, [categories]);

  useEffect(() => {
    if (filters.catagoery) {
      handleGetProduct();
    }
  }, [filters, currentPage, priceValue, limitOption, selectOption]);

  useEffect(() => {
    const selectedCategory = searchParams.get("categoryId");
    const sub_cat = searchParams.get("subCategoryId");
    setLoading(true);
    if (sub_cat) {
      return setFilters((prev) => {
        return {
          ...prev,
          catagoery: selectedCategory,
          sub_catagoery: [sub_cat],
        };
      });
    } else {
      return setFilters((prev) => {
        return { ...prev, catagoery: selectedCategory };
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (window.localStorage.JWT) {
      let accessToken = window.localStorage.getItem("JWT");
      let n = jwtDecode(accessToken);
      const { user: { _id } = {} } = n || {};
      setToken(_id);
    }
  }, []);

  const OnClickWhislist = async (product) => {
    console.log("jagvir singh product ", product);
    if (token !== null) {
      let data = {
        userId: token,
        cart: [],
        wishList: [product],
      };
      try {
        const res = await axios.put(`/user/updateCartAndWishlist`, data);
        console.log("res", res);
        return toast.success("Added To Your Whislist", { autoClose: 1000 });
      } catch (error) {
        console.log("error", error);
        return toast.error("Please Try Again", { autoClose: 1000 });
      }
    } else {
      return toast("Please Login/Register", { autoClose: 1000 });
    }
  };

  const handleGetProduct = async () => {
    try {
      if (filters.catagoery !== undefined) {
        const res = await axios.get(
          `/product/getEveryProductBySpecificaion/filter?categoryId=${filters.catagoery}&subCategoryId=${filters.sub_catagoery}&pricefrom=${priceValue[0]}&priceto=${priceValue[1]}&colorId=${filters.color}&page=${currentPage}&limit=${limitOption}&sortByName=${selectOption}`
        );
        const {
          data: {
            data,
            Total,
            get_Colors_MaxPrice: { colors = [], maxPrice = [] } = {},
          } = {},
        } = res || {};
        setProducts(strictValidArray(data) ? data : []);
        setTotalCount(Total);
        if (strictValidArrayWithLength(colors)) {
          setColors(strictValidArray(colors) ? colors : []);
        }
        if (strictValidArrayWithLength(maxPrice)) {
          setMaxPrice(
            strictValidArrayWithLength(maxPrice) ? maxPrice[0] : 1000
          );
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const productDetails = (product) => {
    navigate("/productdetail", { state: { product } });
  };

  const handleSubCategory = (id) => {
    setFilters((prev) => {
      const { sub_catagoery } = prev;
      const selected = sub_catagoery.some((_id) => _id === id)
        ? sub_catagoery.filter((_id) => _id !== id)
        : [...sub_catagoery, id];
      return {
        ...prev,
        sub_catagoery: selected,
      };
    });
  };

  const handleColors = (id) => {
    setFilters((prev) => {
      const { color } = prev;
      const selected = color.some((_id) => _id === id)
        ? color.filter((_id) => _id !== id)
        : [...color, id];
      return {
        ...prev,
        color: selected,
      };
    });
  };
  const rangeSelector = (event, newValue) => {
    setPriceValue(newValue);
  };

  const classes = useStyles();
  return (
    <section className="wrapper">
      <Header callback={callback} />
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
                <ToastContainer />
              </nav>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* </div> */}
      </article>
      <article className="NavCatInrBlck wrapper">
        <div className="container">
          <div className="NavCatInr category-NavCatInr categoryNavBox bg-none">
            <ul className="row no-gutters justify-content-center">
              {strictValidArrayWithLength(categories) &&
                categories.map((cat, index) => (
                  <li key={index} className="col-md-2 mb-1">
                    <div
                      style={{
                        color: "#FFFFFF",
                        cursor: "pointer",
                        background:
                          cat?.category?._id === category?.category?._id
                            ? "#F2672A"
                            : "#232F3E",
                      }}
                      onClick={() => onClickCategeory(cat)}
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
                          <select
                            selected
                            name="option"
                            className="wide"
                            onChange={(e) => {
                              setLimitOption(e.target.value);
                            }}
                          >
                            <option value="none" selected disabled hidden>
                              Limit
                            </option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
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
                          <select
                            selected
                            name="option"
                            className="wide"
                            onChange={(e) => {
                              setSelectOption(e.target.value);
                            }}
                          >
                            <option value="none" selected disabled hidden>
                              Featured
                            </option>
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
            <div className="row">
              <div className="col-sm-3">
                <div className="sdbrWdgt">
                  <div className="filterSideBarWgt sideBarBg ">
                    <div className="sdbrHdng mb-4">
                      <h4>Filter</h4>
                    </div>
                    <div className="filtrAcordion">
                      <Accordion>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>Price</Accordion.Header>
                          <Accordion.Body>
                            <div className="filtrList mb-2">
                              <Typography id="range-slider" gutterBottom>
                                Select Price Range:
                              </Typography>
                              <Slider
                                value={priceValue}
                                onChange={rangeSelector}
                                valueLabelDisplay="auto"
                                step={1}
                                // marks
                                max={maxPrice}
                                min={0}
                              />
                              {/* <ul>
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
                              </ul> */}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Sub Categories</Accordion.Header>
                          <Accordion.Body>
                            <div className="filtrList mb-2">
                              <form className="formStyle">
                                <ul>
                                  {category &&
                                    category.subCategories &&
                                    category?.subCategories.map(
                                      (subcategory, key) => {
                                        return (
                                          <li index={key}>
                                            <div className="form-check d-flex align-items-center">
                                              <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={
                                                  strictValidArray(
                                                    filters &&
                                                      filters.sub_catagoery
                                                  ) &&
                                                  filters.sub_catagoery.some(
                                                    (e) => e === subcategory._id
                                                  )
                                                }
                                                onChange={() =>
                                                  handleSubCategory(
                                                    subcategory._id
                                                  )
                                                }
                                              />
                                              <label
                                                className="form-check-label"
                                                onClick={() =>
                                                  handleSubCategory(
                                                    subcategory._id
                                                  )
                                                }
                                              >
                                                {subcategory.name}
                                              </label>
                                            </div>
                                          </li>
                                        );
                                      }
                                    )}
                                </ul>
                              </form>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Color</Accordion.Header>
                          <Accordion.Body>
                            <div className="filtrList mb-2">
                              <form className="formStyle">
                                <ul>
                                  {color.map((item, index) => {
                                    return (
                                      <li key={index}>
                                        <div className="form-check d-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={item._id}
                                            checked={
                                              strictValidArray(
                                                filters && filters.color
                                              ) &&
                                              filters.color.some(
                                                (e) => e === item._id
                                              )
                                            }
                                            onChange={() => {
                                              handleColors(item._id);
                                            }}
                                          />
                                          <label
                                            className="form-check-label"
                                            onChange={() => {
                                              handleColors(item._id);
                                            }}
                                          >
                                            {item.name}
                                          </label>
                                        </div>
                                      </li>
                                    );
                                  })}
                                  {/* <li key={index}>
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
                                            {item._id}
                                          </label>
                                        </div>
                                      </li> */}
                                  {/* <li>
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
                                  </li> */}
                                </ul>
                              </form>
                            </div>
                          </Accordion.Body>
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
                  <div>
                    <button
                      style={{
                        color: "#FFFFFF",
                        cursor: "pointer",
                        background: "#232F3E",
                      }}
                      onClick={(e) => {
                        onClickRestFilter(e);
                      }}
                    >
                      Reset Filter
                    </button>
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
                                <div className="heartWhislist">
                                  <span
                                    className="prdctListWishListIcon"
                                    onClick={() => {
                                      OnClickWhislist(product);
                                    }}
                                  >
                                    <img src="/img/wishListIconDark.svg" />
                                  </span>
                                </div>
                                <div className="heartWhislist">
                                  <span className="prdctListIcon">
                                    <img src="/img/prdctListIcon.svg" />
                                  </span>
                                </div>
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
                              <div>
                                <Stack spacing={1}>
                                  {/* <Rating className={classes.root} name="read-only" value={3.5} readOnly /> */}
                                  <Rating
                                    className={classes.root}
                                    name="half-rating-read"
                                    defaultValue={product.rating}
                                    precision={0.5}
                                    readOnly
                                  />
                                </Stack>
                                {category &&
                                  category.subCategories &&
                                  category?.subCategories.map((subcategory) => {
                                    const changeToFirstLetter = (
                                      mySentence
                                    ) => {
                                      const words = mySentence.split(" ");
                                      for (let i = 0; i < words.length; i++) {
                                        if (words[i] != "") {
                                          words[i] =
                                            words[i][0].toUpperCase() +
                                            words[i].substr(1);
                                        }
                                      }
                                      let newsentence = words.join(" ");
                                      return newsentence;
                                    };
                                    if (
                                      subcategory._id == product.subCategoryId
                                    )
                                      return (
                                        <h6>
                                          Sub-Category:{" "}
                                          {changeToFirstLetter(
                                            subcategory.name
                                          )}
                                        </h6>
                                      );
                                  })}
                                {/* <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i>
                                <i className="fa fa-star ylowStar" aria-hidden="true"></i> */}
                                <span>{product.review?.length} reviews</span>
                              </div>
                              <div className="prdctListInfo">
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      product.description.slice(0, 100) + "...",
                                  }}
                                ></p>
                              </div>
                              <div className="prodctListPrice d-flex justify-content-center">
                                <div className="price">
                                  £{product.variants[0].price}
                                </div>
                                <div className="oferPrice">
                                  ${product.variants[0].price + 20}
                                </div>
                                {/* <div className="discntPrice">(£100.43 Inc VAT)</div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="pgntnOuter text-center pt-3 pb-3">
                    <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={TotalCount}
                      pageSize={limitOption}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                    {/* <ul className="pagination">
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
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* <HomeAbout /> */}
      <Footer />
    </section>
  );
}

export default ProductList;
