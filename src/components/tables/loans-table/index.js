/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

const LoansTable = () => {
    const [assets, setAssets] = useState([]);
    const [filter, setFilter] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    // const [expandedRows, setExpandedRows] = useState(null);

    const isMounted = useRef(false);

    const initFilter = () => {
        setFilter({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name.official': {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
            },

            'name.cca3': {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
            },
        });
        setGlobalFilterValue('');
    };

    const clearFilter = () => {
        initFilter();
    };

    const onGlobalFilterChange = e => {
        const { value } = e.target;

        const newFilter = { ...filter };

        newFilter.global.value = value;

        setFilter(newFilter);
        setGlobalFilterValue(value);
    };

    useEffect(() => {
        isMounted.current = true;
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setAssets(data);
                setLoading(false);
            });
        initFilter();
    }, []);

    // const expandAll = () => {
    //     const newExpandedRows = {};
    //     assets.forEach(asset => {
    //         newExpandedRows[`${asset.name.official}`] = true;
    //     });

    //     setExpandedRows(newExpandedRows);
    // };

    // const collapseAll = () => {
    //     setExpandedRows(null);
    // };

    // const rowExpansionTemplate = (data) => {
    //     return null;
    // };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <div className="control has-icons-left has-icons-right">
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search Assets"
                        className="input has-font-roboto"
                        onKeyUp={e => {
                            if (e.key === 'Escape') {
                                clearFilter();
                            }
                        }}
                    />
                    <span className="icon is-left">
                        <i className="fas fa-search" />
                    </span>
                    {globalFilterValue.length > 0 ? (
                        <span className="icon is-right">
                            <i className="fas fa-times is-clickable" onClick={clearFilter} />
                        </span>
                    ) : null}
                </div>
            </div>
        );
    };

    const assetsNameTemplate = rowData => {
        return (
            <div className="media is-flex is-align-items-center">
                <div className="media-left">
                    <figure className="image is-24x24">
                        <Image className="is-rounded shadowed-logos" src={rowData.flags.png} layout="fill" alt="" />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="columns">
                        <div className="column is-3 is-flex is-flex-direction-flex-start is-align-items-center">
                            <p className="title has-text-md-black is-size-6 has-text-weight-medium">
                                {rowData.name.official}
                            </p>
                        </div>
                        <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                            <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-roboto">
                                {rowData.cca3}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const loanAmountTemplate = rowData => {
        return (
            <p className="is-size-6 has-text-md-black has-text-weight-semi-bold has-font-pt-mono">
                {rowData.population}
            </p>
        );
    };

    const collateralAmountTemplate = rowData => {
        return <p className="is-size-6 has-text-md-black has-text-weight-semi-bold has-font-pt-mono">{rowData.area}</p>;
    };

    const header = renderHeader();
    return (
        <div className="box">
            <DataTable
                value={assets}
                paginator
                // expandedRows={rowExpansionTemplate}
                className="p-datatable-customers"
                removableSort
                // onRowToggle={e => {
                //     setExpandedRows(e.data);
                // }}
                rows={10}
                dataKey="name.official"
                filters={filter}
                filterDisplay="menu"
                loading={loading}
                responsiveLayout="scroll"
                globalFilterFields={['name.official']}
                header={header}
                emptyMessage="No assets available."
            >
                <Column
                    sortable
                    field="name.official"
                    header="Assets"
                    filter
                    filterPlaceholder="Search by assets"
                    body={assetsNameTemplate}
                />
                <Column
                    sortable
                    field="population"
                    header="Loan Amount"
                    body={loanAmountTemplate}
                    style={{ verticalAlign: 'middle' }}
                />
                <Column
                    sortable
                    field="area"
                    header="Collateral Amount"
                    body={collateralAmountTemplate}
                    style={{ verticalAlign: 'middle' }}
                />
            </DataTable>
        </div>
    );
};

export default LoansTable;
