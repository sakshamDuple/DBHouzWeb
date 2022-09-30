import React, { useEffect, useMemo, useState } from 'react';
import Table, { Styles } from './Table';
import axios from '../../../API/axios';

const initialState = { temples: [], currentPage: 1, totalCount: 0 };

const App = ({Id}) => {
  console.log("userId",Id)
  const [{ temples, currentPage, totalCount }, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // const onToggle = async (val, id) => {
  //   if (window.confirm("Are you sure?")) {
  //     try {
  //       const url = val ? '/admin/enableUser' : '/admin/disableUser';
  //       const res = await axios.post(url, {
  //         type: "temple",
  //         id
  //       });
  //       // initialData(currentPage + 1)
  //       updateSate(id, 'status', val ? 'ACTIVE' : 'INACTIVE');
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  // }

  // const updateSate = (selected_id, key, value) => {
  //   setState((prev) => {
  //     const { temples } = prev;
  //     const updatedTemple = temples.map((temple) => {
  //       const { _id } = temple;
  //       if (_id === selected_id) {
  //         return { ...temple, [key]: value };
  //       } else {
  //         return temple;
  //       }
  //     });
  //     return { ...prev, temples: updatedTemple };
  //   });
  // };

  // const handleClickFeatured = async (val, id) => {
  //   if (window.confirm("Are you sure?")) {
  //     try {
  //       const url = val ? '/admin/enableFeature' : '/admin/disableFeature';
  //       const res = await axios.post(url, {
  //         type: "temple",
  //         id
  //       });
  //       console.log("currentPage currentPage", currentPage)
  //       console.log("res js", res)
  //       updateSate(id, 'featured', val ? 'true' : '"false"');
  //       // initialData(currentPage+1) 
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  // }

  const columns = useMemo(
    () => [
      {
        Header: 'Order Id #',
        accessor: 'sr_no',
      },
      {
        Header: 'Order Date',
        accessor: 'title',
      },
      {
        Header: 'Order Status',
        accessor: 'Address',
      },
      {
        Header: 'Payment',
        accessor: 'creatorPhone',
      },
      {
        Header: 'Shipping',
        accessor: 'creatorEmail',
      },
      {
        Header : 'Total',
      },
      {
        Header : 'Action',
      }
    ],
    []
  )

  const data = useMemo(
    () => {

      const temples_data = temples.map((temp, index) => {
        const {
          createdBy: { creatorEmail, creatorPhone } = {},
          templeImages: { templePictures } = {},
          location: { city, state, country, postalCode } = {},
        } = temp || {};
        return {
          ...temp,
          sr_no: index + 1 + (currentPage) * 10,
          creatorEmail,
          creatorPhone,
          Address: [city, state, country, postalCode].join("  "),
          Image: templePictures,
        }
      });
      return temples_data
    },
    [temples]
  )

  const initialData = async (userId=Id) => {
    // console.log(page, limit)
    try {
      setLoading(true);
      const res = await axios.post(`/order/getOrderForUser/:${userId}`);
      // const { data: { results: { temples = [] } = {}, totalResults = 0 } = {}, } = res || {}
      console.log("userId", res)
      // setState(prev => ({ ...prev, temples, totalCount: totalResults }));
      // setLoading(false);
    } catch (error) {
      console.log("error", error)
      setLoading(false);
    }
  }

  const fetchData = React.useCallback(({ pageIndex, pageSize }) => {
    setState(prev => ({ ...prev, currentPage: pageIndex, }));
    initialData(pageIndex + 1, pageSize)
  }, [])


  return (
    <Styles>
      <Table columns={columns} data={data} fetchData={fetchData} totalCount={totalCount} loading={loading} />
    </Styles>
  )
}

export default App;
