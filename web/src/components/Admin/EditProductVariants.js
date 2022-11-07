import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  label,
  Accordion,
  FormCheck,
  InputGroup,
  Button,
  Modal,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import Style from "./AdminStyle";
import AdSidebar from "./Sidebar";
import AdNavBar from "./NavBar";
import $ from "jquery";
import upload from "../../assets/images/uploadIcon.svg";
import { RestAdmin, RestMerchant } from "../../rest";
import { PuffLoader } from "react-spinners";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const NewVariantObject = {
  name: "",
  priority: 1,
  style: "",
  size: "",
  colorId: "",
  color: "",
  dimensions: {
    height: 0,
    width: 0,
    thickness: 0,
  },
  minPurchaseQuantity: 1,
  availableQuantity: 0,
  discountPercentage: 0,
  material_type: '',
  material_finish: '',
  warranty_period: 0,
  price: 0,
  images: [],
};

function AdminEditProductVariants() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state.product;
  const [formErrors, setFormErrors] = useState({
    productVariants: false,
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [allColors, setAllColors] = useState();
  const [allUnits, setAllUnits] = useState();

  const [editParams, setEditParams] = useState(false);
  const [params, setParams] = useState({ ...product.variantParameters });
  const [colorsList, setColorsList] = useState([])
  const [variants, setVariants] = useState([...product.variants]);
  const [newStyleText, setNewStyleText] = useState("");
  const [newSizeText, setNewSizeText] = useState("");
  const [newColorText, setNewColorText] = useState("")

  const [newVariantModal, setNewVariantModal] = useState({
    visible: false,
    editIndex: -1,
  });
  const [newVariant, setNewVariant] = useState(NewVariantObject);

  const [imagesToUpload, setImagesToUpload] = useState([]);
  const uploadImages = (e) => {
    let arr = [];
    for (let file of e.target.files) {
      arr.push({
        imageUrl: URL.createObjectURL(file),
        image: file,
      });
    }
    setImagesToUpload(arr);
  };

  const imagesToUploadFunc = async (variant) => {
    let newvariant = { ...variant }
    console.log(newvariant)
    let img;
    console.log(imagesToUpload.length)
    const formData = new FormData();
    formData.append("productId", product._id.toString());
    formData.append("name", newvariant.name);
    for (let image of imagesToUpload) {
      formData.append("image", image.image);
    }
    const thisUpdateProduct = await RestAdmin.newVariantImages(formData);
    thisUpdateProduct.product.variants.forEach(element => {
      if (element.name == newvariant.name) {
        img = element.images
      }
    });
    setNewVariant({ ...newVariant, images: img });
  }

  const handleSubmit = async (e) => {
    let newProduct = { ...product };
    newProduct.variants = [...variants];
    newProduct.variantParameters = { ...params };
    await RestAdmin.updateProduct(newProduct);
    navigate("/admin/productlist");
  };

  let getUnit = (unitId) => {
    return allUnits?.find((u) => u._id === unitId);
  };
  let getColor = (colorId) => {
    return allColors?.find((u) => u._id === colorId);
  };

  let loadData = async () => {
    let { colors } = await RestAdmin.getAllColors();
    let { units } = await RestAdmin.getAllUnits();
    setAllColors(colors);
    setAllUnits(units);
    setDataLoading(false);
  };

  useEffect(() => loadData(), []);
  useEffect(() => { }, [colorsList])

  return (
    <>
      <Style />
      <article id="root" className="mainRoot">
        <div className="wrapper">
          <div className="sidebar">
            <AdSidebar />
          </div>
          <div className="content-page">
            <div className="content">
              <div className="MainNavRow">
                <AdNavBar />
              </div>
              <div className="container-fluid  mt-4">
                <div className="cardFull  Bgwhite Shadow radius20 p-4 mx-4">
                  {dataLoading && (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: 100 }}
                    >
                      <PuffLoader />
                    </div>
                  )}
                  {!dataLoading && (
                    <div className="addPrdctRow">
                      <div className="MainHdng">
                        <h3>Variants for {product.name}</h3>
                      </div>

                      <h5 className="text-muted mt-4">
                        Variation Configurations
                      </h5>
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="card card-body">
                            <div className="row">
                              <div className="col-12">
                                <FormCheck
                                  checked={params.styleEnabled}
                                  type="switch"
                                  onChange={(e) => {
                                    setParams({
                                      ...params,
                                      styleEnabled: e.target.checked,
                                    });
                                  }}
                                  label={`Enable Styles`}
                                />
                                {params.styleEnabled && (
                                  <div className="row">
                                    <div className="col-12">
                                      <div className="row mt-3">
                                        <div className="col-12">
                                          <p className="ms-1">List of Styles</p>
                                        </div>
                                      </div>
                                      <div className="row">
                                        {params.styleList.map((style) => (
                                          <div className="col-sm-2">
                                            <InputGroup className="mb-3">
                                              <Form.Control
                                                disabled
                                                type="text"
                                                onChange={(e) => {
                                                  handleVariantsChange(
                                                    e,
                                                    index
                                                  );
                                                }}
                                                value={style}
                                                placeholder="Style"
                                              />
                                              <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                  let index =
                                                    params.styleList.findIndex(
                                                      (s) => s === style
                                                    );
                                                  if (index !== -1) {
                                                    let newParams = {
                                                      ...params,
                                                    };
                                                    newParams.styleList.splice(
                                                      index,
                                                      1
                                                    );
                                                    setParams(newParams);
                                                  }
                                                }}
                                              >
                                                X
                                              </Button>
                                            </InputGroup>
                                          </div>
                                        ))}
                                        <div className="col-sm-2">
                                          <InputGroup className="mb-3">
                                            <Form.Control
                                              value={newStyleText}
                                              onChange={(e) => {
                                                setNewStyleText(e.target.value);
                                              }}
                                              placeholder="Style"
                                            />
                                            <Button
                                              variant="outline-success"
                                              onClick={() => {
                                                let index =
                                                  params.styleList.findIndex(
                                                    (s) => s === newStyleText
                                                  );
                                                if (index === -1) {
                                                  setNewStyleText("");
                                                  setParams({
                                                    ...params,
                                                    styleList: [
                                                      ...params.styleList,
                                                      newStyleText,
                                                    ],
                                                  });
                                                }
                                              }}
                                            >
                                              +
                                            </Button>
                                          </InputGroup>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-12">
                                <FormCheck
                                  checked={params.sizeEnabled}
                                  type="switch"
                                  onChange={(e) => {
                                    setParams({
                                      ...params,
                                      sizeEnabled: e.target.checked,
                                    });
                                  }}
                                  label={`Enable Sizes`}
                                />
                                {params.sizeEnabled && (
                                  <div className="row">
                                    <div className="col-12">
                                      <div className="row mt-3">
                                        <div className="col-12">
                                          <p className="ms-1">List of Sizes</p>
                                        </div>
                                      </div>
                                      {console.log("params.sizeList", params.sizeList)}
                                      <div className="row">
                                        {params.sizeList.map((size) => (
                                          <div className="col-sm-2">
                                            <InputGroup className="mb-3">
                                              <Form.Control
                                                disabled
                                                type="text"
                                                onChange={(e) => {
                                                  handleVariantsChange(
                                                    e,
                                                    index
                                                  );
                                                }}
                                                value={size}
                                                placeholder="Style"
                                              />
                                              <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                  let index =
                                                    params.sizeList.findIndex(
                                                      (s) => s === size
                                                    );
                                                  if (index !== -1) {
                                                    let newParams = {
                                                      ...params,
                                                    };
                                                    newParams.sizeList.splice(
                                                      index,
                                                      1
                                                    );
                                                    setParams(newParams);
                                                  }
                                                }}
                                              >
                                                X
                                              </Button>
                                            </InputGroup>
                                          </div>
                                        ))}
                                        <div className="col-sm-2">
                                          <InputGroup className="mb-3">
                                            <Form.Control
                                              value={newSizeText}
                                              onChange={(e) => {
                                                setNewSizeText(e.target.value);
                                              }}
                                              placeholder="Style"
                                            />
                                            <Button
                                              variant="outline-success"
                                              onClick={() => {
                                                let index =
                                                  params.sizeList.findIndex(
                                                    (s) => s === newSizeText
                                                  );
                                                if (index === -1) {
                                                  setNewSizeText("");
                                                  setParams({
                                                    ...params,
                                                    sizeList: [
                                                      ...params.sizeList,
                                                      newSizeText,
                                                    ],
                                                  });
                                                }
                                              }}
                                            >
                                              +
                                            </Button>
                                          </InputGroup>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            {console.log("params", params)}
                            <div className="row mt-3">
                              <div className="col-12">
                                <FormCheck
                                  checked={params.colorEnabled}
                                  type="switch"
                                  onChange={(e) => {
                                    setParams({
                                      ...params,
                                      colorEnabled: e.target.checked,
                                    });
                                  }}
                                  label={`Enable Colors`}
                                />
                                {params.colorEnabled && (
                                  <div className="row">
                                    <div className="col-12">
                                      <div className="row mt-3">
                                        <div className="col-12">
                                          <p className="ms-1">List of Colors</p>
                                        </div>
                                      </div>
                                      <div className="row">
                                        {!params.colorsList && colorsList?.map((color) => (
                                          <div className="col-sm-2">
                                            <InputGroup className="mb-3">
                                              <Form.Control
                                                disabled
                                                type="text"
                                                onChange={(e) => {
                                                  handleVariantsChange(
                                                    e,
                                                    index
                                                  );
                                                }}
                                                value={color}
                                                placeholder="Style"
                                              />
                                              <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                  let index =
                                                    colorsList.findIndex(
                                                      (s) => s === color
                                                    );
                                                  if (index !== -1) {
                                                    let newColor = colorsList;
                                                    console.log("newColor", newColor)
                                                    newColor.splice(
                                                      index,
                                                      1
                                                    );
                                                    setColorsList(newColor);
                                                  }
                                                }}
                                              >
                                                X
                                              </Button>
                                            </InputGroup>
                                          </div>
                                        ))}
                                        {params.colorsList && params.colorsList?.map((color) => (
                                          <div className="col-sm-2">
                                            <InputGroup className="mb-3">
                                              <Form.Control
                                                disabled
                                                type="text"
                                                onChange={(e) => {
                                                  handleVariantsChange(
                                                    e,
                                                    index
                                                  );
                                                }}
                                                value={color}
                                                placeholder="Style"
                                              />
                                              <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                  let index =
                                                    params.colorsList.findIndex(
                                                      (s) => s === color
                                                    );
                                                  if (index !== -1) {
                                                    let newColor = params.colorsList;
                                                    newColor.splice(
                                                      index,
                                                      1
                                                    );
                                                    setParams({
                                                      ...params,
                                                      colorsList: newColor
                                                    });
                                                  }
                                                }}
                                              >
                                                X
                                              </Button>
                                            </InputGroup>
                                          </div>
                                        ))}
                                        <div className="col-sm-2">
                                          <InputGroup className="mb-3">
                                            <Form.Control
                                              value={newColorText}
                                              onChange={(e) => {
                                                setNewColorText(e.target.value);
                                              }}
                                              placeholder="Style"
                                            />
                                            {console.log("newColorText", newColorText)}
                                            <Button
                                              variant="outline-success"
                                              onClick={() => {
                                                // console.log("Hii")
                                                let index =
                                                  colorsList.findIndex(
                                                    (s) => s === newColorText
                                                  );
                                                console.log(colorsList.length)
                                                if (index === -1) {
                                                  setNewColorText("");
                                                  colorsList.push(newColorText)
                                                  setParams({
                                                    ...params,
                                                    colorsList: colorsList
                                                  });
                                                }
                                              }}
                                            >
                                              +
                                            </Button>
                                          </InputGroup>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-12">
                                <FormCheck
                                  checked={params.dimensionHeightEnabled}
                                  type="switch"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setParams({
                                        ...params,
                                        dimensionHeightEnabled: true,
                                        dimensionWidthEnabled: false,
                                        dimensionThicknessEnabled: false,
                                      });
                                    } else {
                                      setParams({
                                        ...params,
                                        dimensionHeightEnabled: false,
                                        dimensionWidthEnabled: false,
                                        dimensionThicknessEnabled: false,
                                      });
                                    }
                                  }}
                                  label={`Enable Dimensions`}
                                />
                                {params.dimensionHeightEnabled && (
                                  <div className="row mt-3">
                                    <div className="col px-4">
                                      <InputGroup className="mb-3">
                                        <Button
                                          onClick={() => {
                                            setParams({
                                              ...params,
                                              dimensionHeightEnabled: true,
                                              dimensionWidthEnabled: false,
                                              dimensionThicknessEnabled: false,
                                            });
                                          }}
                                          variant={
                                            params.dimensionHeightEnabled
                                              ? "primary"
                                              : "outline-secondary"
                                          }
                                        >
                                          Height
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            setParams({
                                              ...params,
                                              dimensionHeightEnabled: true,
                                              dimensionWidthEnabled: true,
                                              dimensionThicknessEnabled: false,
                                            });
                                          }}
                                          variant={
                                            params.dimensionWidthEnabled
                                              ? "primary"
                                              : "outline-secondary"
                                          }
                                        >
                                          X Width
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            setParams({
                                              ...params,
                                              dimensionHeightEnabled: true,
                                              dimensionWidthEnabled: true,
                                              dimensionThicknessEnabled: true,
                                            });
                                          }}
                                          variant={
                                            params.dimensionThicknessEnabled
                                              ? "primary"
                                              : "outline-secondary"
                                          }
                                        >
                                          X Thickness
                                        </Button>
                                      </InputGroup>

                                      <div className="row mt-3">
                                        <div className="col col-md-4">
                                          <div className="form-group">
                                            <label className="text-muted px-2">
                                              Select Unit for Dimensions
                                            </label>
                                            <select
                                              value={params.dimensionUnitId}
                                              className="form-control"
                                              onChange={(e) => {
                                                setParams({
                                                  ...params,
                                                  dimensionUnitId:
                                                    e.target.value,
                                                });
                                              }}
                                            >
                                              <option value="">
                                                (Select Unit)
                                              </option>
                                              {allUnits.map((u) => (
                                                <option value={u._id}>
                                                  {u.name}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h5 className="text-muted mt-4">
                        List of Variants
                        <div className="row d-inline-block ms-3">
                          <div className="col">
                            <button
                              className="btn btn-sm btn-success m-2"
                              onClick={() => {
                                setNewVariant({ ...NewVariantObject });
                                setNewVariantModal({
                                  visible: true,
                                  editIndex: -1,
                                });
                              }}
                            >
                              Add Variant
                            </button>
                          </div>
                        </div>
                      </h5>
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="card card-body p-0">
                            <table className="table m-0">
                              <thead>
                                <td className="text-center py-2">#</td>
                                <td className="py-2 px-2">Name</td>
                                {params.colorEnabled && (
                                  <td className="text-center py-2">Color</td>
                                )}
                                {params.styleEnabled && (
                                  <td className="text-center py-2">Style</td>
                                )}
                                {params.sizeEnabled && (
                                  <td className="text-center py-2">Size</td>
                                )}
                                {(params.dimensionHeightEnabled ||
                                  params.dimensionWidthEnabled ||
                                  params.dimensionThicknessEnabled) && (
                                    <td className="text-center py-2">
                                      Dimensions
                                    </td>
                                  )}
                                {/* {params.price && ( */}
                                <td className="text-center py-2">Price</td>
                                <td className="text-center py-2">Stock Qty</td>
                                {/* )} */}
                                <td></td>
                              </thead>
                              <tbody>
                                {!variants.length && (
                                  <tr>
                                    <td colSpan={1}>
                                      <small className="text-center p-0 m-0 py-3 d-block">
                                        (No Variants)
                                      </small>
                                    </td>
                                  </tr>
                                )}
                                {variants.map((variant, index) => (
                                  <tr>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{variant.name}</td>
                                    {params.colorEnabled && (
                                      <td className="text-center">
                                        {Boolean(variant.colorId) && (
                                          <span>
                                            {getColor(variant.colorId)?.name}
                                          </span>
                                        )}
                                        {!Boolean(variant.colorId) && (
                                          <span className="badge bg-danger">
                                            Select Color
                                          </span>
                                        )}
                                      </td>
                                    )}
                                    {params.styleEnabled && (
                                      <td className="text-center">
                                        {Boolean(variant.style) && (
                                          <span>{variant.style}</span>
                                        )}
                                        {!Boolean(variant.style) && (
                                          <span className="badge bg-danger">
                                            Select Style
                                          </span>
                                        )}
                                      </td>
                                    )}
                                    {params.sizeEnabled && (
                                      <td className="text-center">
                                        {Boolean(variant.size) && (
                                          <span>{variant.size}</span>
                                        )}
                                        {!Boolean(variant.size) && (
                                          <span className="badge bg-danger">
                                            Select Size
                                          </span>
                                        )}
                                      </td>
                                    )}
                                    {params.dimensionHeightEnabled && (
                                      <td className="text-center">
                                        {variant.dimensions.height + " "}
                                        {Boolean(
                                          params.dimensionWidthEnabled &&
                                          Number.isInteger(
                                            variant.dimensions.width
                                          )
                                        ) && (
                                            <span>
                                              X {variant.dimensions.width}
                                            </span>
                                          )}
                                        {Boolean(
                                          params.dimensionThicknessEnabled &&
                                          Number.isInteger(
                                            variant.dimensions.thickness
                                          )
                                        ) && (
                                            <span>
                                              X {variant.dimensions.thickness}
                                            </span>
                                          )}{" "}
                                        {getUnit(params.dimensionUnitId)
                                          ?.name || "Units"}
                                      </td>
                                    )}
                                    {/* {params.price && ( */}
                                    <td className="text-center">
                                      {Boolean(variant.price) && (
                                        <span>£{variant.price}</span>
                                      )}
                                      {!Boolean(variant.price) && (
                                        <span className="badge bg-danger">
                                          Fix Price
                                        </span>
                                      )}
                                    </td>
                                    {/* )} */}
                                    <td className="text-center">
                                      {Boolean(variant.availableQuantity) && (
                                        <span>{variant.availableQuantity}</span>
                                      )}
                                      {!Boolean(variant.availableQuantity) && (
                                        <span className="badge bg-danger">
                                          Fix Stock
                                        </span>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => {
                                          setNewVariant({ ...variant });
                                          setNewVariantModal({
                                            visible: true,
                                            editIndex: index,
                                          });
                                        }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="btn btn-sm btn-warning ms-2"
                                        onClick={() => {
                                          if (
                                            confirm("Delete Variant Entry?")
                                          ) {
                                            let newVariants = [...variants];
                                            newVariants.splice(index, 1);
                                            setVariants(newVariants);
                                          }
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="addAcordion mt-2">
                        <form className="formStyle addFormStyle" action="#">
                          <div className="">
                            <button
                              className="btnCommon  mt-3"
                              type="button"
                              onClick={handleSubmit}
                            >
                              Save Variants
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Modal
        show={newVariantModal.visible}
        size={"lg"}
        onHide={() => {
          setNewVariantModal({ visible: false, editIndex: -1 });
          setNewVariant({ ...NewVariantObject });
        }}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Variant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <Form.Label className="text-muted px-2">
                    Name of Variant
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setNewVariant({ ...newVariant, name: e.target.value });
                    }}
                    value={newVariant.name}
                    placeholder="Name of Variant"
                  />
                </div>
                {params.sizeEnabled && (
                  <div className="form-group mt-3">
                    <label className="text-muted px-2">Select a Size</label>
                    <select
                      value={newVariant.size}
                      className="form-control"
                      onChange={(e) => {
                        setNewVariant({ ...newVariant, size: e.target.value });
                      }}
                    >
                      <option value="">(Select Size)</option>
                      {params.sizeList.map((s) => (
                        <option value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}
                {
                  // (
                  //   <div className="form-group mt-3">
                  //     <label className="text-muted px-2">Price Of Product</label>
                  //     <input
                  //       value={newVariant.dimensions.height}
                  //       className="form-control"
                  //       type={"number"}
                  //       onChange={(e) => {
                  //         let num = Number.parseInt(e.target.value);
                  //         if (Number.isInteger(num)) {
                  //           let newVariant2 = { ...newVariant };
                  //           pramas = num;
                  //           setNewVariant(newVariant2);
                  //         }
                  //       }}
                  //     />
                  //   </div>
                  // ) &&
                  <div className="form-group mt-3">
                    <label className="text-muted px-2">Price Of Product</label>
                    <div className="input-group">
                      <input
                        value={newVariant.price}
                        className="form-control"
                        type={"number"}
                        onChange={(e) => {
                          let num = Number.parseInt(e.target.value);
                          if (Number.isInteger(num)) {
                            let newVariant2 = { ...newVariant };
                            newVariant2.price = num;
                            setNewVariant(newVariant2);
                          }
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">£</div>
                      </div>
                    </div>
                  </div>
                }
                {params.styleEnabled && (
                  <div className="form-group mt-3">
                    <label className="text-muted px-2">Select a Style</label>
                    <select
                      value={newVariant.style}
                      className="form-control"
                      onChange={(e) => {
                        setNewVariant({ ...newVariant, style: e.target.value });
                      }}
                    >
                      <option value="">(Select Style)</option>
                      {params.styleList.map((s) => (
                        <option value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}
                {params.colorEnabled && (
                  <div className="form-group mt-3">
                    <label className="text-muted px-2">Select a Color</label>
                    <select
                      value={newVariant.colorId}
                      className="form-control"
                      onChange={(e) => {
                        setNewVariant({
                          ...newVariant,
                          colorId: e.target.value,
                        });
                      }}
                    >
                      <option value="">(Select Color)</option>
                      {allColors?.map((c) => (
                        <option value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                {params.colorEnabled && (
                  <div className="form-group mt-3">
                    <label className="text-muted px-2">Select a Color</label>
                    <select
                      value={newVariant.color}
                      className="form-control"
                      onChange={(e) => {
                        setNewVariant({
                          ...newVariant,
                          color: e.target.value,
                        });
                      }}
                    >
                      <option value="">(Select Color)</option>
                      {!params.colorsList ? colorsList?.map((c) => (
                        <option value={c}>{c}</option>
                      )) : params.colorsList?.map((c) => (
                        <option value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-group mt-3">
                  <label className="text-muted px-2">Stock Quantity</label>
                  <input
                    value={newVariant.availableQuantity}
                    className="form-control"
                    type={"number"}
                    onChange={(e) => {
                      let num = Number.parseInt(e.target.value);
                      if (Number.isInteger(num)) {
                        let newVariant2 = { ...newVariant };
                        newVariant2.availableQuantity = num;
                        setNewVariant(newVariant2);
                      }
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="text-muted px-2">Warranty Period</label>
                  <input
                    value={newVariant.warranty_period}
                    className="form-control"
                    type={"number"}
                    onChange={(e) => {
                      let Warranty = Number.parseInt(e.target.value);
                      if (Number.isInteger(Warranty)) {
                        let newVariant2 = { ...newVariant };
                        newVariant2.warranty_period = Warranty;
                        setNewVariant(newVariant2);
                      }
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="text-muted px-2">Material Finish</label>
                  <input
                    value={newVariant.material_finish}
                    className="form-control"
                    type={"text"}
                    onChange={(e) => {
                      setNewVariant({ ...newVariant, material_finish: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="text-muted px-2">Material Type</label>
                  <input
                    value={newVariant.material_type}
                    className="form-control"
                    type={"text"}
                    onChange={(e) => {
                      setNewVariant({ ...newVariant, material_type: e.target.value });
                    }}
                  />
                </div>
                {(params.dimensionHeightEnabled ||
                  params.dimensionWidthEnabled ||
                  params.dimensionThicknessEnabled) && (
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col">
                            <div className="form-group mt-3">
                              <label className="text-muted px-2">Height</label>
                              <div className="input-group">
                                <input
                                  value={newVariant.dimensions?.height}
                                  className="form-control"
                                  type={"number"}
                                  onChange={(e) => {
                                    let num = Number.parseInt(e.target.value);
                                    setNewVariant({ ...newVariant, dimensions: { ...newVariant.dimensions, height: num } });
                                  }}
                                />
                                <div className="input-group-append">
                                  <div className="input-group-text">
                                    {getUnit(params.dimensionUnitId)?.name ||
                                      "Units"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {(params.dimensionWidthEnabled ||
                            params.dimensionThicknessEnabled) && (
                              <div className="col">
                                <div className="form-group mt-3">
                                  <label className="text-muted px-2">Width</label>
                                  <div className="input-group">
                                    <input
                                      value={newVariant.dimensions?.width}
                                      className="form-control"
                                      type={"number"}
                                      onChange={(e) => {
                                        let num = Number.parseInt(e.target.value);
                                        if (Number.isInteger(num)) {
                                          let newVariant2 = { ...newVariant };
                                          newVariant2.dimensions.width = num;
                                          setNewVariant(newVariant2);
                                        }
                                      }}
                                    />
                                    <div className="input-group-append">
                                      <div className="input-group-text">
                                        {getUnit(params.dimensionUnitId)?.name ||
                                          "Units"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          {params.dimensionThicknessEnabled && (
                            <div className="col">
                              <div className="form-group mt-3">
                                <label className="text-muted px-2">
                                  Thickness
                                </label>
                                <div className="input-group">
                                  <input
                                    value={newVariant.dimensions.thickness}
                                    className="form-control"
                                    type={"number"}
                                    onChange={(e) => {
                                      let num = Number.parseInt(e.target.value);
                                      if (Number.isInteger(num)) {
                                        let newVariant2 = { ...newVariant };
                                        newVariant2.dimensions.thickness = num;
                                        setNewVariant(newVariant2);
                                      }
                                    }}
                                  />
                                  <div className="input-group-append">
                                    <div className="input-group-text">
                                      {getUnit(params.dimensionUnitId)?.name ||
                                        "Units"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                <div className="uplogInrDiv">
                  <input
                    onChange={(e) => {
                      uploadImages(e),
                        imagesToUploadFunc(newVariant)
                    }}
                    type="file"
                    multiple
                    className="form-control fileUpload  form-control-lg"
                  />
                  <div className="uploadBlkInr">
                    <div className="uplogImg">
                      {(!imagesToUpload || imagesToUpload.length === 0) && (
                        <img src={upload} alt="" height="50" />
                      )}
                      {imagesToUpload.map((i) => (
                        <img src={i.imageUrl} style={{ margin: 10 }} alt="" height="100" />
                      ))}
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setNewVariant({ ...NewVariantObject });
              setNewVariantModal({ visible: false, editIndex: -1 });
            }}
          >
            Discard
          </Button>
          <Button
            variant="success"
            onClick={() => {
              let newVariants = [...variants];
              if (newVariantModal.editIndex === -1) {
                setVariants([...newVariants, newVariant]);
              } else {
                newVariants[newVariantModal.editIndex] = { ...newVariant };
                setVariants(newVariants);
              }
              setNewVariant({ ...NewVariantObject });
              setNewVariantModal({ visible: false, editIndex: -1 });
            }}
          >
            Save Variant
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AdminEditProductVariants;
