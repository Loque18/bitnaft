/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

const AssetsTable = ({ assets }) => {
    // const [assets, setAssets] = useState([]);
    const [filter, setFilter] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const initFilter = () => {
        setFilter({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
            },
            symbol: {
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
        // fetch('https://restcountries.com/v3.1/all')
        //     .then(response => response.json())
        //     .then(data => {
        //         // setAssets(data);
        //         // setLoading(false);
        //         console.log(data);
        //     });
        initFilter();
    }, []);

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
                    <figure className="image is-48x48">
                        <Image className="is-rounded shadowed-logo" src={rowData.icon} layout="fill" alt="" />
                    </figure>
                </div>
                <div className="media-content is-clipped">
                    <div className="columns is-mobile">
                        <div className="column is-4-desktop is-6-mobile is-flex is-flex-direction-flex-start is-align-items-center">
                            <p className="title has-text-md-black is-size-6 has-text-weight-medium">{rowData.name}</p>
                        </div>
                        <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                            <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-roboto">
                                {rowData.symbol}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const balanceBodyTemplate = rowData => {
        return (
            <p className="is-size-6 has-text-md-black has-text-weight-semi-bold has-font-pt-mono">{rowData.balance}</p>
        );
    };

    const usdBalanceBodyTemplate = rowData => {
        return (
            <p className="is-size-6 has-text-md-black has-text-weight-semi-bold has-font-pt-mono">{rowData.usdValue}</p>
        );
    };

    const actionsBodyTemplate = () => {
        return (
            <div className="buttons is-flex is-justify-content-flex-start is-align-items-center">
                <button
                    type="button"
                    className="unstyled-button has-text-weight-medium has-font-roboto has-text-md-ref-primary-10 is-size-6"
                    style={{ borderBottom: '1px dashed #15195B' }}
                >
                    Withdraw
                </button>
                <button
                    type="button"
                    className="unstyled-button has-text-weight-medium has-font-roboto has-text-md-ref-primary-10 is-size-6 ml-5"
                    style={{ borderBottom: '1px dashed #15195B' }}
                >
                    Deposit
                </button>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="box">
            <DataTable
                value={assets}
                paginator
                className="p-datatable-customers"
                removableSort
                sortMode="multiple"
                rows={8}
                dataKey="name"
                filters={filter}
                filterDisplay="menu"
                responsiveLayout="scroll"
                globalFilterFields={['name', 'symbol']}
                header={header}
                emptyMessage="No assets available."
            >
                <Column
                    field="name"
                    header="Assets"
                    sortable
                    filter
                    filterPlaceholder="Search by assets"
                    body={assetsNameTemplate}
                    className="min-w-250"
                />
                <Column
                    sortable
                    field="balance"
                    header="Balance"
                    body={balanceBodyTemplate}
                    style={{ verticalAlign: 'middle' }}
                />
                <Column
                    sortable
                    field="usdValue"
                    header="USD Value"
                    body={usdBalanceBodyTemplate}
                    style={{ verticalAlign: 'middle' }}
                />
                <Column
                    header="Actions"
                    body={actionsBodyTemplate}
                    style={{ verticalAlign: 'middle' }}
                    className="min-w-200"
                />
            </DataTable>
        </div>
    );
};

export default AssetsTable;
