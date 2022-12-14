import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "../css/header.css";
import { Link } from "react-router-dom";
const NestedDropdown = ({ title, children }) => {
  console.log("jagvirsinghev", title)
  console.log("jagvir", children)
  return (
    <Dropdown.Item >
      <Dropdown variant="primary" drop="end" autoClose="outside">
        <Dropdown.Toggle as={CustomToggle}>
          <div className='d-flex align-items-center justify-content-between'>
            <span> {title}{"  "}</span>
            <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu >
          {children}
        </Dropdown.Menu>
      </Dropdown>
    </Dropdown.Item>
  );
}

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div className='dp-dropdown manvir'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    {children}
  </div>
));
export const CustomToggle2 = React.forwardRef(({ children, onClick }, ref) => (
  <div className='dp-dropdown manvir'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    {children}
  </div>
));

export const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    {console.log("className bibek", className)}
    return (
      <div
        className={className}
        ref={ref}
        style={style}
        aria-labelledby={labeledBy}
      >
        {children}
      </div>
    );
  },
)

export default NestedDropdown;





{/* <Dropdown>
<Dropdown.Toggle variant="default" id="dropdown-basic">
  <img src="/img/catIcon.svg" /> Categories
</Dropdown.Toggle>
<Dropdown.Menu className="dp-dropdown-main">
  {categories.map((category) => {
    return (
      <Dropdown.Item href="#/action-1">
        <div className='dp-dropdown'>
          <div  className='d-flex align-items-center justify-content-between' onClick={MouseOver(category.category._id)} >
            <span> {category?.category?.name}</span>
            <i className="fa fa-caret-right ml-10" aria-hidden="true"></i>
          </div>
          <div className="dp-dropdown-box box-shadow ">
            <div className="row">
              <div className="col-md-6">
                <div className="blueBg p-4 h-100">
                  <h3 className="m-0">{category?.category?.name}</h3>
                  <hr />
                  <ul className=''>
                    <li>Tyrone Burt</li>
                    <li><Link to="" >Regina Moreno</Link></li>
                    <li><Link to="" >Tyrone Burt</Link></li>
                    <li><Link to="" >Regina Moreno</Link></li>
                    <li><Link to="" >Tyrone Burt</Link></li>
                    <li><Link to="" >Regina Moreno</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="px-4 py-3">
                  <h3 className="m-0">Popular Product</h3>
                  <hr />
                  <ul className=''>
                    <li><Link to="" >Carla Meyers</Link></li>
                    <li><Link to="" >Martin Barron</Link></li>
                    <li><Link to="" >Pankaj Tiles</Link></li>
                    <li><Link to="" >Martin Barron</Link></li>
                    <li><Link to="" >Carla Meyers</Link></li>
                    <li><Link to="" >Martin Barron</Link></li>
                    <li><Link to="" >Pankaj Tiles</Link></li>
                    <li><Link to="" >Martin Barron</Link></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Dropdown.Item>
    );
  })}
  {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</Dropdown.Menu>
{/* <Dropdown.Menu>
  {categories.map((category) => {
    console.log("category",category)
  return (
      
    <Dropdown.Item>

      <CustomDropDown category={category}>
           cdcf sdn
      </CustomDropDown>
      
    </Dropdown.Item>
  )})}
</Dropdown.Menu> 
</Dropdown> */}

export const dataD = [
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
  {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  }, {
    "category": {
      "_id": "634964284dd5edd2bd53fb85",
      "name": "Marble",
      "description": "<p>Marble</p>",
      "seo": {
        "metaTagTitle": "Marble",
        "metaTagDescription": "Marble",
        "metaTagKeywords": "Marble"
      },
      "status": "INACTIVE",
      "createdAt": 1665754152363,
      "imageDocumentId": "6349642a4dd5edd2bd53fb86"
    },
    "subCategories": [
      {
        "_id": "634964414dd5edd2bd53fb87",
        "name": "Marble",
        "description": "<p>Marble</p>",
        "categoryId": "634964284dd5edd2bd53fb85",
        "seo": {
          "metaTagTitle": "Marble",
          "metaTagDescription": "Marble",
          "metaTagKeywords": "Marble"
        },
        "status": "INACTIVE",
        "createdAt": 1665754177563,
        "imageDocumentId": "634964414dd5edd2bd53fb88"
      }
    ]
  },
]