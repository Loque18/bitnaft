/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import formatDate from 'src/utils/format-date';

import styles from '../styles.module.scss';

const { green_circle, red_circle } = styles;

const LoansTable = () => {
    const [assets, setAssets] = useState([]);
    const [filter, setFilter] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    // const [loading, setLoading] = useState(true);

    const [expandedRows, setExpandedRows] = useState(null);

    const isMounted = useRef(false);

    const initFilter = () => {
        setFilter({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name.common': {
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
                // setLoading(false);
            });
        initFilter();
    }, []);

    const expandAll = () => {
        const newExpandedRows = {};
        assets.forEach(asset => {
            newExpandedRows[`${asset.name.common}`] = true;
        });

        setExpandedRows(newExpandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const rowExpansionTemplate = () => {
        return (
            <div className="has-font-roboto">
                <div className="columns">
                    <div className="column">
                        <div className="columns mb-0 is-mobile">
                            <div className="column is-flex is-align-items-center">
                                <h1 className="has-text-md-black">Status</h1>
                                <div className="ml-3" id={`${green_circle}`} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <p className="has-text-md-black is-size-7" style={{ opacity: '0.75' }}>
                                    Not paid
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <h1 className="has-text-md-black" style={{ opacity: '0.75' }}>
                            Yearly Interest
                        </h1>
                        <div className="columns mt-0">
                            <div className="column">
                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">10%</p>
                                <div className="columns mt-0">
                                    <div className="column">
                                        <p className="has-text-md-black" style={{ opacity: '0.75' }}>
                                            Hourly Interest
                                        </p>
                                        <div className="columns mt-0">
                                            <div className="column">
                                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                                    0.00115 %
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <h1 className="has-text-md-black" style={{ opacity: '0.75' }}>
                            Load Duration
                        </h1>
                        <div className="columns mt-0">
                            <div className="column">
                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                    1.5 Years
                                </p>
                                <div className="columns mt-0">
                                    <div className="column">
                                        <p className="has-text-md-black" style={{ opacity: '0.75' }}>
                                            Returning Date
                                        </p>
                                        <div className="columns mt-0">
                                            <div className="column">
                                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                                    {formatDate(1695642037)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <h1 className="has-text-md-black" style={{ opacity: '0.75' }}>
                            Date Borrowed
                        </h1>
                        <div className="columns mt-0">
                            <div className="column">
                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                    {formatDate(1654861237)}
                                </p>
                                <div className="columns mt-0">
                                    <div className="column">
                                        <p className="has-text-md-black" style={{ opacity: '0.75' }}>
                                            Liquidation Price
                                        </p>
                                        <div className="columns mt-0">
                                            <div className="column">
                                                <p className="has-text-hgreen has-font-pt-mono is-size-7 has-text-weight-bold">
                                                    60 %
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <h1 className="has-text-md-black" style={{ opacity: '0.75' }}>
                            Remaining Principal
                        </h1>
                        <div className="columns mt-0">
                            <div className="column">
                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">1.5</p>
                                <div className="columns mt-0">
                                    <div className="column">
                                        <p className="has-text-md-black" style={{ opacity: '0.75' }}>
                                            Residual Interest
                                        </p>
                                        <div className="columns mt-0">
                                            <div className="column">
                                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                                    0.000056
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between is-align-items-center">
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
                <div className="table-header-container is-hidden-mobile">
                    <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} className="mr-2" />
                    <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
                </div>
            </div>
        );
    };

    const assetsNameTemplate = rowData => {
        return (
            <div className="media is-flex is-align-items-center">
                <div className="media-left mr-5 is-relative">
                    <figure className="image is-24x24">
                        <Image className="is-rounded shadowed-logo" src={rowData.flags.png} layout="fill" alt="" />
                    </figure>
                    <figure className="image is-24x24" style={{ position: 'absolute', top: '50%', left: '50%' }}>
                        <Image className="is-rounded shadowed-logo" src={rowData.flags.png} layout="fill" alt="" />
                    </figure>
                </div>
                <div className="media-content is-clipped">
                    <div className="columns is-mobile">
                        <div className="column is-5-desktop is-6-mobile is-flex is-flex-direction-flex-start is-align-items-center">
                            <p className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                {rowData.name.common}
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
                expandedRows={expandedRows}
                className="p-datatable-customers"
                sortMode="multiple"
                removableSort
                onRowToggle={e => {
                    setExpandedRows(e.data);
                }}
                rows={10}
                dataKey="name.common"
                filters={filter}
                filterDisplay="menu"
                // loading={loading}
                rowExpansionTemplate={rowExpansionTemplate}
                responsiveLayout="scroll"
                globalFilterFields={['name.common']}
                header={header}
                emptyMessage="No assets available."
            >
                <Column
                    sortable
                    field="name.common"
                    header="Assets"
                    filter
                    filterPlaceholder="Search by assets"
                    body={assetsNameTemplate}
                    className="min-w-250"
                    style={{ verticalAlign: 'middle' }}
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
                <Column expander style={{ width: '3em' }} />
            </DataTable>
        </div>
    );
};

export default LoansTable;
