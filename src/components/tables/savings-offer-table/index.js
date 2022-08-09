/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

const SavingsOfferTable = () => {
    const [assets, setAssets] = useState([]);
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
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setAssets(data);
            }, []);
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

    const coinNameTemplate = rowData => {
        return (
            <div className="media is-flex is-align-items-center">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <Image className="is-rounded shadowed-logo" src={rowData.flags.png} layout="fill" alt="" />
                    </figure>
                </div>
                <div className="media-content is-clipped">
                    <div className="columns is-mobile">
                        <div className="column is-3-desktop is-6-mobile is-flex is-flex-direction-flex-start is-align-items-center">
                            <p className="title has-text-md-black is-size-6 has-text-weight-medium">{rowData.cca3}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const aprBodyTemplate = rowData => {
        return <p className="is-size-6 has-text-hgreen has-text-weight-semi-bold has-font-pt-mono">{rowData.area} %</p>;
    };

    const durationBodyTemplate = rowData => {
        return (
            <p className="is-size-6 has-text-md-black has-text-weight-semi-bold has-font-roboto">{rowData.capital}</p>
        );
    };

    const actionsBodyTemplate = () => {
        return (
            <button type="button" className="button has-bg-md-source-primary-o-2 has-text-md-source-primary">
                Subscribe
            </button>
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
                    field="cca3"
                    header="Coins"
                    sortable
                    filter
                    filterPlaceholder="Search by assets"
                    body={coinNameTemplate}
                    style={{ verticalAlign: 'middle' }}
                />
                <Column field="area" header="APR" sortable body={aprBodyTemplate} style={{ verticalAlign: 'middle' }} />
                <Column
                    field="capital"
                    header="Duration"
                    body={durationBodyTemplate}
                    style={{ verticalAlign: 'middle' }}
                />
                <Column body={actionsBodyTemplate} style={{ verticalAlign: 'middle' }} />
            </DataTable>
        </div>
    );
};

export default SavingsOfferTable;
