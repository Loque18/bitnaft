/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const AssetsTable = () => {
    const [assets, setAssets] = useState([]);
    const [filter, setFilter] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

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
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setAssets(data);
                setLoading(false);
            });
        initFilter();
    }, []);

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search Assets"
                        className="has-font-roboto"
                    />
                </span>
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Clear"
                    className="button p-button-outlined has-font-roboto has-text-md-ref-primary-30"
                    onClick={clearFilter}
                />
            </div>
        );
    };

    const assetsNameTemplate = rowData => {
        return (
            <div className="media is-flex is-align-items-center">
                <div className="media-left">
                    <figure className="image is-48x48">
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

    const balanceBodyTemplate = rowData => {
        return (
            <p className="is-size-6 has-text-md-black has-text-weight-bold has-font-pt-mono">{rowData.population}</p>
        );
    };

    const actionsBodyTemplate = () => {
        return (
            <div className="buttons is-flex is-align-items-center">
                <button
                    type="button"
                    className="unstyled-button has-text-weight-medium has-font-roboto has-text-md-ref-primary-10 is-size-6"
                    style={{ borderBottom: '1px dashed #15195B' }}
                >
                    Withdraw
                </button>
                <button
                    type="button"
                    className="unstyled-button has-text-weight-medium has-font-roboto has-text-md-ref-primary-10 is-size-6 ml-3"
                    style={{ borderBottom: '1px dashed #15195B' }}
                >
                    Deposit
                </button>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <DataTable
            value={assets}
            paginator
            className="p-datatable-customers"
            removableSort
            rows={10}
            dataKey="name.official"
            filters={filter}
            filterDisplay="menu"
            loading={loading}
            responsiveLayout="scroll"
            globalFilterFields={['name.official', 'name.cca3', 'name.population']}
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
                header="Balance"
                body={balanceBodyTemplate}
                style={{ verticalAlign: 'middle' }}
            />
            <Column header="Actions" body={actionsBodyTemplate} style={{ verticalAlign: 'middle' }} />
        </DataTable>
    );
};

export default AssetsTable;
