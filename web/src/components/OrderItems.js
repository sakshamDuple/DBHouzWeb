import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderItems.css";
import { Rest, RestClient, RestAdmin } from "../rest";
function OrderItems({ product }) {
  let [selectedVariant, setSelectedVariant] = useState(0);
  const [color, setColor] = useState([]);
  const stars = Array(5).fill(0);
  const currentRatingValue = product.rating||0;
  const getDimension = (obj) => {
    if (obj)
      return `${obj.dimensions.height} inches x ${obj.dimensions.width} inches x ${obj.dimensions.thickness} inches`; //^${unit}
    else return "0 x 0 x 0 inches";
  };
  const getColors = async () => {
    let color = await RestAdmin.getAllColors();
    setColor(color);
  };
  const getSingleColors = (id) => {
    if (color && color.colors) {
      const _color = color.colors.filter((item) => item._id === id);
      return _color[0]?.name;
    } else return "green";
  };
  const handleChange=()=>{
    
  }
  console.log(product);
  useEffect(() => {
    getColors();
  }, [product]);
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
          <span className="text-secondary">Catagory</span> {">"}
          <span className="text-secondary bg-light">sub catogery</span>
        </span>
        <span className="siDistance">{product?.description}</span>

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
            {currentRatingValue}{" "}
            {stars?.map((_, index) => {
              return (
                <i
                  key={index}
                  className={
                    currentRatingValue > index
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
                    (product.variants[selectedVariant].price * 82) /
                    100
                  ).toFixed(2)
                : 0
            }`}{" "}
            <sub>
              + £
              {((product.variants[selectedVariant]?.price / 100) * 18).toFixed(
                2
              )}
              vat
            </sub>{" "}
          </span>

          <Link to={`/`}>
            <button className="siCheckButton" onClick={handleChange} >Rate This Product</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderItems;
