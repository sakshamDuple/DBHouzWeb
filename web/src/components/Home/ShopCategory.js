import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Rest } from "../../rest";
function ShopCategory() {
  const navigate = useNavigate();
  const categories = useSelector((s) => s.categories);
  console.log("jas", categories);

  return (
    <article className="shopByCategy wrapper py-40">
      <div className="mterlSlectnContainer">
        <div className="container">
          <div className="mainHeading headingCenter pb-30">
            <h2>Shop By Category</h2>
            <h5>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </h5>
          </div>
        </div>
        <Container>
          <Row>
            {categories?.map((category) => (
              <Col lg={3} md={6}>
                <div className="categoryItem" style={{ cursor: "pointer" }}>
                  <div className="categoryMedia">
                    <div
                      className="categoryImg"
                      style={{
                        backgroundImage: `url(${Rest}/documents/get/${category.category.imageDocumentId})`,
                      }}
                      onClick={() => {
                        navigate(`/category`, { state: category });
                      }}
                    >
                      <div className="categoryOverlay"></div>
                    </div>
                    <span className="categoryBtn" style={{ display: "flex" }}>
                      {console.log("category", category.category._id)}
                      <button
                        className="btnCommon"
                        style={{ width: "auto" }}
                        onClick={()=>{
                          navigate(`/productlist`,{
                            state:{
                              category:category
                            }
                          })
                        }}
                        // onClick={() => {
                        //   navigate(`/productlist`, {
                        //     state: category.category._id,
                        //   });
                        // }}
                      >
                        Show Products
                      </button>
                    </span>
                  </div>
                  <div className="categoryTitle">
                    <h4>{category?.category.name}</h4>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </article>
  );
}
export default ShopCategory;
