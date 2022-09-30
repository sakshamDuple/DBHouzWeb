import React , {useEffect} from 'react'
import styled from 'styled-components'
import { useTable,usePagination } from 'react-table'


export const Styles = styled.div`
  padding: 0rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const  Table = ({ columns, data, fetchData,
  loading,totalCount }) =>{
  // Use the state and functions returned from useTable to build your UI
  const controlledPageCount = Math.ceil(totalCount/10)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0, pageSize:10}, // Pass our hoisted table state
    manualPagination: true, // Tell the usePagination
    // hook that we'll handle our own data fetching
    // This means we'll also have to provide our own
    // pageCount.
    pageCount: controlledPageCount,
  }, usePagination);

  useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  console.log("pageIndex",pageIndex)

  // Render the UI for your table
  return (
    <>
    <table {...getTableProps()} className="w-100">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{totalCount}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
    </table>
     <div className="pagination tablePagination">
     <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
       {  <i class="fa fa-angle-double-left" aria-hidden="true"></i>}
     </button>{' '}
     <button onClick={() => previousPage()} disabled={!canPreviousPage}>
       {<i class="fa fa-angle-left" aria-hidden="true"></i>}
     </button>{' '}
     <button onClick={() => nextPage()} disabled={!canNextPage}>
       {<i class="fa fa-angle-right" aria-hidden="true"></i>}
     </button>{' '}
     <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>
       {<i class="fa fa-angle-double-right" aria-hidden="true"></i>}
     </button>{' '}
     <span>
       Page{' '}
       <strong>
         {pageIndex + 1} of {pageOptions.length}
       </strong>{' '}
     </span>
     <span>
       | Go to page:{' '}
       <input
         type="number"
         defaultValue={pageIndex + 1}
         onChange={e => {
           const page = e.target.value ? Number(e.target.value) - 1 : 0
           gotoPage(page)
         }}
         style={{ width: '100px' }}
       />
     </span>{' '}
   </div>
   </>
  )
}

export default Table;
