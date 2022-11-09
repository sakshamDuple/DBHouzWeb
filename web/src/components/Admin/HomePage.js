import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Table,
  Tab,
  Tabs,
  Row,
  Col,
  Alert,
  Container,
  Form,
  label,
  Accordion,
} from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Style from "./AdminStyle";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import $ from "jquery";
import upload from "../../assets/images/uploadIcon.svg";
import noimage from "../../assets/images/noImage.jpg";
import plus from "../../assets/images/plus.svg";
import axios from "../../API/axios";
import { useSelector } from "react-redux";
import { RestAdmin } from "../../rest";
window.jQuery = window.$ = $;

require("jquery-nice-select");

function HomePage() {
  const categories = useSelector((s) => s.categories);
  const user=useSelector((s)=>s.user)
  const admin=user.type=="admin"?user:""
  const [imgFile, uploading] = useState("");
  const [bannerTitel, setBannerTitle] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [mainBannError, setMainBannError] = useState("");
  const [smallBanner1Title, setSmallBanner1Title] = useState("");
  const [smallBanner1BtnTitle, setSmallBanner1BtnTitle] = useState("");
  const [smallBanner1Img, setSmallBanner1Img] = useState("");
  const [smallBanner1Err, setSmallBtn1err] = useState("");
  const [smallBanner2Title, setSmallBanner2Title] = useState("");
  const [smallBanner2BtnTitle, setSmallBanner2BtnTitle] = useState("");
  const [smallBanner2Err, setSmallBtn2err] = useState("");
  const [smallBanner2Img, setSmallBanner2Img] = useState("");
  const [mtCategories, setMtCategories] = useState([]);
  const [mtCategories2, setMtCategories2] = useState([]);
  const [shopByCategories, setShopByCategories] = useState([]);
  const [allProduct, setAllProdct] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [aboutUs, setAboutUs] = useState("");
  const [benefits_of_having_Marble, setBenefits_of_having_Marble] =
    useState("");
    const [mainBannerId,setMainBannerId]=useState("")
  const [mainErr, setMainErr] = useState("");
  const [smallBanner1Id,setSmallBanner1Id]=useState("")
  const [smallBanner2Id,setSmallBannerId]=useState("")

  const cate = categories?.map((cat) => cat.category);

  const MaterialCategories = (selectedList) => {
    const newList = selectedList?.map((cat, index) => {
      const mtCat = {
        categoryId: cat._id,
        priority: 1,
        nameOfCategory: cat.name,
        images: cat.imageDocumentId,
      };
      return mtCat;
    });
    setMtCategories(newList);
  };
  const getShopByCategory = (selectedList) => {
    const newList = selectedList?.map((cat, index) => {
      const mtCat = {
        categoryId: cat._id,
        priority: 1,
        nameOfCategory: cat.name,
        images: cat.imageDocumentId,
      };
      return mtCat;
    });
    setShopByCategories(newList);
  };
  const getAllProducts = () => {
    RestAdmin.getAllProducts().then((res) => {
      setAllProdct(res);
    });
  };
  console.log(allProduct);
  const getMtCategory2 = (selectedList) => {
    const newList = selectedList?.map((cat, index) => {
      const mtCat = {
        categoryId: cat._id,
        priority: 1,
        nameOfCategory: cat.name,
       
        images: cat.imageDocumentId,
      };
      return mtCat;
    });
    setMtCategories2(newList);
  };
  const getFeaturedProducts = (selectedList) => {
    const newList = selectedList?.map((cat, index) => {
      const mtCat = {
        productId: cat._id,
        priority: 1,
        nameOfProduct: cat.name,
        images: cat.images[0].documentId,
      };
      return mtCat;
    });
    setFeaturedProducts(newList);
  };
  const imgFileHandler = (e) => {
    uploading(URL.createObjectURL(e.target.files[0]));
  };
  const mainBannerSubmitHandler = async (e) => {
    e.preventDefault();

    if (bannerTitel == "" || bannerTitel == undefined) {
      return setMainBannError("Please Text banner Title");
    }
    if (buttonTitle == "" || buttonTitle == undefined) {
      return setMainBannError("Please Text botton Title");
    }
    if (buttonLink == "" || buttonLink == undefined) {
      return setMainBannError("Please Provide Botton link");
    }
    if (imgFile == "" || imgFile == undefined) {
      return setMainBannError("Please Upload image");
    }
    setMainBannError("");

    const mainBannerData = {
      Banner_Title: bannerTitel,
      Button_Title: buttonTitle,
      Button_Link: buttonLink,
      Banner_Type: "Main",
      images: "63627bf0f6e1b70a44aa58b3",
      priority: 1,
    };
    try {
      const { data } = await axios.post(
        `http://139.59.36.222:12001/rest/misc/mainBannerCreation`,
        mainBannerData
      );
      console.log(data);
      setMainBannerId(data.banner._id)
      setSmallBanner1Id(data.banner._id)
      alert("Form Submited");
    } catch (error) {
      alert("Somthing Wrong ");
    }
  };
  const handleSmallBanner1Submit = async (e) => {
    e.preventDefault();
    if (smallBanner1Title == "" || smallBanner1Title == undefined) {
      return setSmallBtn1err("Banner title field required");
    }
    if (smallBanner1BtnTitle == "" || smallBanner1BtnTitle == undefined) {
      return setSmallBtn1err("Button title field required");
    }
    if (smallBanner1Img == "" || smallBanner1Img == undefined) {
      return setSmallBtn1err("Please upload a image");
    }
    setSmallBtn1err("");

    const smallBaner1Data = {
      Banner_Title: smallBanner1Title,
      Button_Title: smallBanner1BtnTitle,
      Button_Link: "string",
      images: "ObjectId",
      Banner_Type: "Small1",
      priority: 1,
    };
    try {
      const {data} = await axios.post(
        `http://139.59.36.222:12001/rest/misc/smallBanner1Creation`,
         smallBaner1Data 
      );
      console.log(data.banner._id );
      alert("form submited");
    } catch (error) {
      alert("somthing wrong");
    }
  };
  const handleSmallBanner2Submit = async (e) => {
    e.preventDefault();
    if (smallBanner2Title == "" || smallBanner2Title == undefined) {
      return setSmallBtn2err("Banner title field required");
    }
    if (smallBanner2BtnTitle == "" || smallBanner2BtnTitle == undefined) {
      return setSmallBtn2err("Button title field required");
    }
    if (smallBanner2Img == "" || smallBanner2Img == undefined) {
      return setSmallBtn2err("Please upload a image");
    }
    setSmallBtn2err("");
    const smallBaner2Data = {
      Banner_Title: smallBanner2Title,
      Button_Title: smallBanner2BtnTitle,
      Button_Link: "string",
      images: "ObjectId",
      Banner_Type: "Small2",
      priority: 1,
    };
    try {
      const {data} = await axios.post(
        `http://139.59.36.222:12001/rest/misc/smallBanner2Creation`,
        smallBaner2Data 
      );
      console.log(data);
      setSmallBannerId(data.banner._id)
      alert("form submited");
    } catch (error) {
      alert("somthing wrong");
    }
  };
  const homePageCreationHandler = async (e) => {
    e.preventDefault();
    if (
      benefits_of_having_Marble == "" ||
      benefits_of_having_Marble == undefined
    ) {
      return setMainErr("please Fill the Benefits of having Marble field");
    }
    if (aboutUs == "" || aboutUs == undefined) {
      return setMainErr("please Fill the about field");
    }
   
    if(mtCategories.length<3){
      return setMainErr("please Choose atleast 3 Material Selection Categories");
    }if(mtCategories2.length<3){
      return setMainErr("please Choose atleast 3 Material Selection 2 Categories");
    }if(shopByCategories<8){
      return setMainErr("please Choose atleast 8 Shop By Categories");
    }
    if(featuredProducts.length<4){
      return setMainErr("please Choose atleast 4 Featured Products");
    }if(mainBannerId==""||mainBannerId==undefined){
      return setMainErr("please Submit the main form");
    }if(smallBanner1Id==""||smallBanner1Id==undefined){
      return setMainErr("please Submit first small banner form");
    }if(smallBanner2Id==""||smallBanner2Id==undefined){
      return setMainErr("please Submit Secound small banner form");
    }
    setMainErr("");

    const HomeData = {
      About_Us: aboutUs,
      Benefits_of_having_Marble: benefits_of_having_Marble,
      Material_Selection_1: mtCategories,
      Material_Selection_2:mtCategories2,
      Shop_By_Category: shopByCategories,
      Featured_Products: featuredProducts,
      MainBanner: [mainBannerId],
      SmallBanner1: smallBanner1Id,
      SmallBanner2: smallBanner2Id,
    };
    try {
      let config = {
        headers: {
          Authorization: 'Bearer ' + admin.jwt
        }
      }
      const {data}=await axios.post("http://139.59.36.222:12001/rest/misc/HomePageCreation",HomeData,config)
      console.log(data);
      alert("Form Submited")     
    } catch (error) {
      alert("Something Wrong")
      
    }
  };

  const selectRef1 = useRef();
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    $(selectRef1.current).niceSelect();
  }, []);
  const selectRef2 = useRef();
  useEffect(() => {
    $(selectRef2.current).niceSelect();
  }, []);
  const selectRef3 = useRef();
  useEffect(() => {
    $(selectRef3.current).niceSelect();
  }, []);
  const [noOfRows, setNoOfRows] = useState(1);
  return (
    <>
      <Style />

      <article id="root" className="mainRoot">
        <div className="wrapper">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content-page">
            <div className="content">
              <div className="MainNavRow">
                <NavBar />
              </div>
              <div className="container-fluid  mt-4">
                <div className="bnrBlk">
                  <div className="Bgwhite Shadow radius20 p-4 mx-4">
                    <div className="addPrdctRow">
                      <div className="MainHdng mb-3">
                        <h3>Add Main Banner</h3>
                      </div>

                      <div className="addBnrRow">
                        <form className="formStyle addFormStyle" action="#">
                          {[...Array(noOfRows)].map((elementInArray, index) => {
                            return (
                              <div className="bnrCol">
                                <div className="row">
                                  <div className="col">
                                    <div className="float-end">
                                      <button
                                        type="button"
                                        className="btnCommon me-3"
                                        onClick={() =>
                                          setNoOfRows(noOfRows + 1)
                                        }
                                      >
                                        <span>
                                          <img src={plus} alt="" height="12" />
                                        </span>{" "}
                                        Add More
                                      </button>
                                      <button
                                        type="button"
                                        className="btnCommon btnDark deletBtn"
                                        onClick={() =>
                                          setNoOfRows(noOfRows - 1)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className=" mb-3">
                                      <div className="row">
                                        <div className="col">
                                          <Form.Label>Banner Title</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Title"
                                            onChange={(e) =>
                                              setBannerTitle(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="col">
                                          <Form.Label>Button Title</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Button Title"
                                            onChange={(e) =>
                                              setButtonTitle(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="col">
                                          <Form.Label>Button Link</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Link"
                                            onChange={(e) =>
                                              setButtonLink(e.target.value)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col">
                                    <div className="mb3">
                                      <div className="form-group">
                                        <Form.Label>Add Images</Form.Label>
                                        <div className="uplogInrDiv">
                                          <input
                                            type="file"
                                            multiple
                                            onChange={imgFileHandler}
                                            className="form-control fileUpload  form-control-lg"
                                          />
                                          <div className="uploadBlkInr">
                                            <div className="uplogImg">
                                              <img
                                                src={imgFile || upload}
                                                alt=""
                                                height="50"
                                              />
                                            </div>
                                            <div className="uploadFileCnt">
                                              {!imgFile && (
                                                <>
                                                  <p>
                                                    Drag an image here or browse
                                                  </p>
                                                  <p>for an image to upload</p>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="">
                            {mainBannError && (
                              <p className="text-danger">*{mainBannError}</p>
                            )}
                            <button
                              className="btnCommon"
                              onClick={mainBannerSubmitHandler}
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Bgwhite Shadow radius20 p-4 mx-4 mt-4">
                  <div className="addPrdctRow">
                    <div className="MainHdng mb-3">
                      <h3>Add Small Banner</h3>
                    </div>
                    <div className="addAcordion">
                      <form className="formStyle addFormStyle" action="#">
                        <div className="lghtBg">
                          <div className="row">
                            <div className="col">
                              <div className="greyCol">
                                <div className="row">
                                  <div className="col">
                                    <div className=" mb-3">
                                      <div className="row">
                                        <div className="col">
                                          <Form.Label>Banner Title</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Title"
                                            onChange={(e) =>
                                              setSmallBanner1Title(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="col">
                                          <Form.Label>Button Title</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Button Title"
                                            onChange={(e) =>
                                              setSmallBanner1BtnTitle(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mb3">
                                  <div className="form-group">
                                    <Form.Label>Add Images</Form.Label>
                                    <div className="uplogInrDiv">
                                      <input
                                        type="file"
                                        multiple
                                        className="form-control fileUpload  form-control-lg"
                                        onChange={(e) =>
                                          setSmallBanner1Img(e.target.files[0])
                                        }
                                      />
                                      <div className="uploadBlkInr">
                                        <div className="uplogImg">
                                          <img
                                            src={upload}
                                            alt=""
                                            height="50"
                                          />
                                        </div>
                                        <div className="uploadFileCnt">
                                          <p>Drag an image here or browse</p>
                                          <p>for an image to upload</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {smallBanner1Err && (
                                <p className="text-danger">
                                  *{smallBanner1Err}
                                </p>
                              )}

                              <div className="">
                                <button
                                  className="btnCommon"
                                  onClick={handleSmallBanner1Submit}
                                  type="submit"
                                >
                                  Continue
                                </button>
                              </div>
                            </div>

                            <div className="col">
                              <div className="greyCol">
                                <div className="row">
                                  <div className="col">
                                    <div className=" mb-3">
                                      <div className="row">
                                        <div className="col">
                                          <Form.Label>Banner Title</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Title"
                                            onChange={(e) =>
                                              setSmallBanner2Title(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="col">
                                          <Form.Label>Button Title</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Button Title"
                                            onChange={(e) =>
                                              setSmallBanner2BtnTitle(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mb3">
                                  <div className="form-group">
                                    <Form.Label>Add Images</Form.Label>
                                    <div className="uplogInrDiv">
                                      <input
                                        type="file"
                                        multiple
                                        className="form-control fileUpload  form-control-lg"
                                        onChange={(e) =>
                                          setSmallBanner2Img(e.target.files[0])
                                        }
                                      />
                                      <div className="uploadBlkInr">
                                        <div className="uplogImg">
                                          <img
                                            src={upload}
                                            alt=""
                                            height="50"
                                          />
                                        </div>
                                        {
                                          <div className="uploadFileCnt">
                                            <p>Drag an image here or browse</p>
                                            <p>for an image to upload</p>
                                          </div>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                {smallBanner2Err && (
                                  <p className="text-danger">
                                    *{smallBanner2Err}
                                  </p>
                                )}
                                <button
                                  className="btnCommon"
                                  onClick={handleSmallBanner2Submit}
                                  type="submit"
                                >
                                  Continue
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="Bgwhite Shadow radius20 p-4 mx-4 mt-4">
                  <div className="row">
                    <div className="col">
                      <div className="addPrdctRow">
                        <div className="MainHdng mb-3">
                          <h3>Material Selection</h3>
                        </div>
                        <div className="addAcordion">
                          <form className="formStyle addFormStyle" action="#">
                            <div className="lghtBg">
                              <div className="row">
                                <div className="col">
                                  <div className="mb3">
                                    <div className="form-group">
                                      <div className="mb3">
                                        <div className="form-group">
                                          <Form.Label>
                                            Choose Three Categories{" "}
                                          </Form.Label>
                                          <div className="multiSelctCustom">
                                            <Multiselect
                                              displayValue="name"
                                              onKeyPressFn={function noRefCheck() {}}
                                              onRemove={function noRefCheck() {}}
                                              onSearch={function noRefCheck() {}}
                                              onSelect={MaterialCategories}
                                              options={cate}
                                              selectionLimit={3}
                                              placeholder="Select Category"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="addPrdctRow">
                        <div className="MainHdng mb-3">
                          <h3>Shop By Category</h3>
                        </div>
                        <div className="addAcordion">
                          <form className="formStyle addFormStyle" action="#">
                            <div className="lghtBg">
                              <div className="row">
                                <div className="col">
                                  <div className="mb3">
                                    <div className="form-group">
                                      <div className="mb3">
                                        <div className="form-group">
                                          <Form.Label>
                                            Choose Any Eight{" "}
                                          </Form.Label>
                                          <div className="multiSelctCustom">
                                            <Multiselect
                                              displayValue="name"
                                              onKeyPressFn={function noRefCheck() {}}
                                              onRemove={function noRefCheck() {}}
                                              onSearch={function noRefCheck() {}}
                                              onSelect={getShopByCategory}
                                              options={cate}
                                              selectionLimit={8}
                                              placeholder="Select Category"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Bgwhite Shadow radius20 p-4 mx-4 mt-4">
                  <div className="row">
                    <div className="col">
                      <div className="addPrdctRow">
                        <div className="MainHdng mb-3">
                          <h3>Material Selection 2</h3>
                        </div>
                        <div className="addAcordion">
                          <form className="formStyle addFormStyle" action="#">
                            <div className="lghtBg">
                              <div className="row">
                                <div className="col">
                                  <div className="mb3">
                                    <div className="form-group">
                                      <div className="mb3">
                                        <div className="form-group">
                                          <Form.Label>
                                            Choose Material Selection Three
                                            Categories{" "}
                                          </Form.Label>
                                          <div className="multiSelctCustom">
                                            <Multiselect
                                              displayValue="name"
                                              onKeyPressFn={function noRefCheck() {}}
                                              onRemove={function noRefCheck() {}}
                                              onSearch={function noRefCheck() {}}
                                              onSelect={getMtCategory2}
                                              options={cate}
                                              selectionLimit={3}
                                              placeholder="Select Category"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="addPrdctRow">
                        <div className="MainHdng mb-3">
                          <h3>Featured Products</h3>
                        </div>
                        <div className="addAcordion">
                          <form className="formStyle addFormStyle" action="#">
                            <div className="lghtBg">
                              <div className="row">
                                <div className="col">
                                  <div className="mb3">
                                    <div className="form-group">
                                      <div className="mb3">
                                        <div className="form-group">
                                          <Form.Label>
                                            Choose Any Four Latest Product{" "}
                                          </Form.Label>
                                          <div className="multiSelctCustom">
                                            <Multiselect
                                              displayValue="name"
                                              onKeyPressFn={function noRefCheck() {}}
                                              onRemove={function noRefCheck() {}}
                                              onSearch={function noRefCheck() {}}
                                              onSelect={getFeaturedProducts}
                                              options={allProduct}
                                              selectionLimit={4}
                                              placeholder="Select Product"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Bgwhite Shadow radius20 p-4 mx-4 mt-4">
                  <div className="row">
                    <div className="col">
                      <div className="addPrdctRow">
                        <div className="MainHdng mb-3">
                          <h3>Benefits of having Marble</h3>
                        </div>
                        <div className="ckEditor">
                          <CKEditor
                            editor={ClassicEditor}
                            data="<p>Specification</p>"
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              console.log({ event, editor, data });
                              
                              setBenefits_of_having_Marble(data);
                            }}
                            onBlur={(event, editor) => {
                              console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                              console.log("Focus.", editor);
                            }}
                          />
                        </div>
                        <div className="addFormStyle mt-3">
                          {/* <button className="btnCommon" type="submit">
                            Submit
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="addPrdctRow">
                        <div className="MainHdng mb-3">
                          <h3>About Us</h3>
                        </div>
                        <div className="ckEditor">
                          <CKEditor
                            editor={ClassicEditor}
                            data="<p>Specification</p>"
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                             
                              setAboutUs(data);

                              console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                              console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                              console.log("Focus.", editor);
                            }}
                          />
                        </div>
                        <div className="addFormStyle mt-3">
                          {/* <button className="btnCommon" type="submit">
                            Submit
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {mainErr && <p className="text-danger">{mainErr}</p>}
                  <button
                    className="btnCommon "
                    onClick={homePageCreationHandler}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
export default HomePage;
