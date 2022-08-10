/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import formatDate from 'src/utils/format-date';
import formatBigNumber from 'src/utils/format-bignumber';

import styles from '../styles.module.scss';

const { green_circle } = styles;

const LoansTable = ({ assets }) => {
    const [filter, setFilter] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    // const [loading, setLoading] = useState(true);

    const [expandedRows, setExpandedRows] = useState(null);

    // const isMounted = useRef(false);

    const initFilter = () => {
        setFilter({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            borrowName: {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
            },
            collateralName: {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
            },

            borrowSymbol: {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
            },

            collateralSymbol: {
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
        // isMounted.current = true;
        // fetch('https://restcountries.com/v3.1/all')
        //     .then(response => response.json())
        //     .then(data => {
        //         setAssets(data);
        //         // setLoading(false);
        //     });
        initFilter();
    }, []);

    const expandAll = () => {
        const newExpandedRows = {};
        assets.forEach(asset => {
            newExpandedRows[asset.loanHash] = true;
        });

        setExpandedRows(newExpandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const rowExpansionTemplate = rowData => {
        const loanDuration = +(Number(rowData.LoanDuration) / 60 / 60 / 24 / 365).toFixed(2);
        const returningDate = formatDate(rowData.returningDate);
        const borrowDate = formatDate(rowData.borrowDate);

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
                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                    {rowData.yearlyInterestRate}%
                                </p>
                                <div className="columns mt-0">
                                    <div className="column">
                                        <p className="has-text-md-black" style={{ opacity: '0.75' }}>
                                            Hourly Interest
                                        </p>
                                        <div className="columns mt-0">
                                            <div className="column">
                                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                                    {rowData.hourlyInterestRate} %
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
                                    {loanDuration} Years
                                </p>
                                <div className="columns mt-0">
                                    <div className="column">
                                        <p className="has-text-md-black" style={{ opacity: '0.75' }}>
                                            Returning Date
                                        </p>
                                        <div className="columns mt-0">
                                            <div className="column">
                                                <p
                                                    className="has-font-pt-mono is-size-7 has-text-weight-bold"
                                                    style={{ color: '#FF6E3A' }}
                                                >
                                                    {returningDate}
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
                                    {borrowDate}
                                </p>
                                <div className="columns mt-0">
                                    <div className="column">
                                        <p className="has-text-md-black" style={{ opacity: '0.75' }}>
                                            Liquidation Price
                                        </p>
                                        <div className="columns mt-0">
                                            <div className="column">
                                                <p className="has-text-hgreen has-font-pt-mono is-size-7 has-text-weight-bold">
                                                    {rowData.ltv} %
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
                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                    {rowData.remainingPrinciple}
                                </p>
                                <div className="columns mt-0">
                                    <div className="column">
                                        <p className="has-text-md-black" style={{ opacity: '0.75' }}>
                                            Residual Interest
                                        </p>
                                        <div className="columns mt-0">
                                            <div className="column">
                                                <p className="has-text-md-black has-font-pt-mono is-size-7 has-text-weight-bold">
                                                    {rowData.residualInterest}
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
                        <Image className="is-rounded shadowed-logo" src={rowData.borrowIcon} layout="fill" alt="" />
                    </figure>
                    <figure className="image is-24x24" style={{ position: 'absolute', top: '50%', left: '50%' }}>
                        <Image className="is-rounded shadowed-logo" src={rowData.collateralIcon} layout="fill" alt="" />
                    </figure>
                </div>
                <div className="media-content is-clipped">
                    <div className="columns is-mobile">
                        <div className="column is-5-desktop is-6-mobile is-flex is-flex-direction-flex-start is-align-items-center">
                            <p className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                {rowData.borrowName} / {rowData.collateralName}
                            </p>
                        </div>
                        <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                            <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-roboto">
                                {rowData.borrowSymbol} / {rowData.collateralSymbol}
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
                {formatBigNumber(rowData.borrowAmount, rowData.borrowDecimals)}
            </p>
        );
    };

    const collateralAmountTemplate = rowData => {
        return (
            <p className="is-size-6 has-text-md-black has-text-weight-semi-bold has-font-pt-mono">
                {formatBigNumber(rowData.collateralAmount, rowData.collateralDecimals)}
            </p>
        );
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
                dataKey="loanHash"
                filters={filter}
                filterDisplay="menu"
                // loading={loading}
                rowExpansionTemplate={rowExpansionTemplate}
                responsiveLayout="scroll"
                globalFilterFields={['borrowName', 'collateralName', 'borrowSymbol', 'collateralSymbol']}
                header={header}
                emptyMessage="No assets available."
            >
                <Column
                    sortable
                    field="borrowName"
                    header="Assets (borrowed/collateral)"
                    filter
                    filterPlaceholder="Search by assets"
                    body={assetsNameTemplate}
                    className="min-w-250"
                    style={{ verticalAlign: 'middle' }}
                />
                <Column
                    sortable
                    field="borrowAmount"
                    header="Loan Amount"
                    body={loanAmountTemplate}
                    style={{ verticalAlign: 'middle' }}
                />
                <Column
                    sortable
                    field="collateralAmount"
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
