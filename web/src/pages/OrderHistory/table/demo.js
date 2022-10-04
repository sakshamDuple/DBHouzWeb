// / eslint-disable prettier/prettier /
// / eslint-disable no-unused-vars /
// / eslint-disable prettier/prettier /
// / eslint-disable react/jsx-key /
// / eslint-disable prettier/prettier /
import React from 'react';
import styled from 'styled-components';
import {
    useTable,
    usePagination,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
} from 'react-table';
// import Pagination from './paging';
import { matchSorter } from 'match-sorter';
import { strictValidArrayWithLength } from '../../utils/commonUtils';

export const Styles = styled.div`
  padding: 1rem;
  .table-responsive {
    overflow-y: hidden;
    overflow-x: auto;
  }

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
  .pagination {
    padding: 0.5rem;
  }
`;

const columns = useMemo(
    () => [
        {
            Header: 'Name',
            totalWidth: 156,
            accessor: 'name',
            fixed: 'left',
            Cell: ({ cell: { row: { original: { _id } = {} } } = {}, value }) => {
                return <Link to={`/inhabitant/${_id}`}>{value}</Link>;
            },
            Filter: DefaultColumnFilter,
        },
        {
            Header: 'Father Name',
            totalWidth: 156,
            accessor: 'father_name',
            Filter: DefaultColumnFilter,
        },
        {
            Header: 'Birth date',
            accessor: 'birth_date',
            totalWidth: 156,
            filter: 'equals',
            Filter: DefaultColumnFilter,
        },
        {
            Header: 'Adhar card',
            totalWidth: 56,
            accessor: 'uhid',
            filter: 'equals',
            Filter: DefaultColumnFilter,
        },
        {
            Header: 'Qualification',
            accessor: 'qualification',
            Filter: DefaultColumnFilter,
        },
        {
            Header: 'Gender',
            accessor: 'gender',
            Filter: DefaultColumnFilter,
        },
        {
            Header: 'Seniority',
            accessor: 'seniority',
        },
        {
            Header: 'Is Pregnent',
            accessor: 'is_pregent',
        },
        {
            Header: 'Is Nursing',
            accessor: 'is_nursing_mother',
        },
        {
            Header: 'Pan Card',
            accessor: 'pan_card',
        },
        {
            Header: 'Mobile Number',
            accessor: 'mobile_number',
        },
        {
            Header: 'Marital Status',
            accessor: 'marital_status',
        },

        {
            Header: 'Categorey',
            accessor: 'category',
        },

        {
            Header: 'is Penstion',
            accessor: 'is_pensation',
        },
        {
            Header: 'Pension type',
            accessor: 'pension_type',
        },
        {
            Header: 'House Number',
            accessor: 'house_number',
        },
    ],
    [],
);

// Define a default UI for filtering
export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            Search:{' '}
            <input
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    );
}

// Define a default UI for filtering
export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length;
    const onChange = useAsyncDebounce((val) => {
        setFilter(val || undefined); // Set undefined to remove the filter entirely
    }, 200);

    const [value, setValue] = React.useState(filterValue);

    return (
        <input
            value={value || ''}
            onChange={(e) => {
                const val = e.target.value;
                setValue(val);
                onChange(val);
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

//  This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={(e) => {
                    setFilter(parseInt(e.target.value, 10));
                }}
            />
            <button onClick={() => setFilter(undefined)}>Off</button>
        </>
    );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <input
                value={filterValue[0] || ''}
                type="number"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        val ? parseInt(val, 10) : undefined,
                        old[1],
                    ]);
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: '70px',
                    marginRight: '0.5rem',
                }}
            />
            to
            <input
                value={filterValue[1] || ''}
                type="number"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        old[0],
                        val ? parseInt(val, 10) : undefined,
                    ]);
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: '70px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    );
}

// Define a custom filter filter function!
export function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

const Table = ({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
}) => {

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        [],
    );

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
        // setPageSize,
        // Get the state from the instance
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
            useFilters, // useFilters!
            manualSortBy: true,
            disableSortRemove: true,
            disableMultiSort: true,
            defaultColumn,
            manualFilters: true,
        },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination,
    );
    const { pageIndex, pageSize, sortBy, filters } = state;

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        let sort = '_id';
        let order = 'desc';
        let mapFilters = {};
        if (strictValidArrayWithLength(sortBy)) {
            const [{ id = '_id', desc = true }] = sortBy;
            sort = id;
            order = desc ? 'desc' : 'asc';
        }
        if (strictValidArrayWithLength(filters)) {
            filters.forEach((val) => {
                const { id, value } = val;
                mapFilters[id] = value;
            })
        }

        console.log('filters manvir harjot', mapFilters);


        fetchData({ pageIndex, pageSize, sort, order, filters: mapFilters });
    }, [fetchData, pageIndex, pageSize, sortBy, filters]);

    // Render the UI for your table
    return (
        <>
            <div className="table-responsive">
                <table {...getTableProps()} className="w-full overflow-auto">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                        <div>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row);
                            const className = index % 2 ? 'bg-sky-100' : 'bg-sky-50';
                            return (
                                <tr {...row.getRowProps()} className={className}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        <tr>
                            {loading ? (
                                // Use our custom loading state to show a loading indicator
                                <td colSpan="10000">Loading...</td>
                            ) : (
                                <td colSpan="10000">
                                    Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                                    results
                                </td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <Pagination
        previousPage={previousPage}
        nextPage={nextPage}
        gotoPage={gotoPage}
        pageOptions={pageOptions}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
      /> */}
        </>
    );
};

export default Table;