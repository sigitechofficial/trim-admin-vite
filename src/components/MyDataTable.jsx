// @ts-nocheck
import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { LuSearch } from "react-icons/lu";
import { RiFileDownloadLine } from "react-icons/ri";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';


export default function MyDataTable(props) {
  const [globalFilter, setGlobalFilter] = useState('');

  const onGlobalFilterChange = (event) => {
    setGlobalFilter(event?.target?.value);
  };

  const filteredData = props?.data?.filter((item) =>
    Object.values(item).some(
      (val) =>
        val && val.toString().toLowerCase().includes(globalFilter.toLowerCase())
    )
  );

  return (
    <div className="bg-white p-8 rounded-lg space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="relative">
          <input
            type="search"
            value={globalFilter}
            onChange={onGlobalFilterChange}
            //  placeholder="Global Search"
            placeholder="Search by ID, product, or others..."
            className="w-96 h-12 bg-themeGray rounded-lg px-10 outline-none placeholder:font-workSans placeholder:font-medium focus:bg-gray-200"
          />
          <LuSearch
            size={20}
            color="#111827"
            className="absolute top-3.5 left-3"
          />
          {/* <InputText
          type="search"
          value={globalFilter}
          onChange={onGlobalFilterChange}
          placeholder="Global Search"
        /> */}

        </div>

        <div className={`flex gap-x-5 ${props?.hide ? 'hidden':'block'}`}>
          <button
            className="flex items-center gap-x-2 p-3 bg-themeGray rounded-lg hover:bg-gray-200 duration-200"
            onClick={props.onClick}
          >
            <TbAdjustmentsHorizontal size={24} color="#A0AEC0" />
            <span className="text-[#718096] font-workSans">Filters</span>
          </button>
          <button className="flex items-center gap-x-2 p-3 bg-themeGray rounded-lg hover:bg-gray-200 duration-200">
            <CiCalendarDate size={24} color="#A0AEC0" />
            <span className="text-[#718096] font-workSans">
              April 11 - April 24
            </span>
          </button>
          <button className="flex items-center gap-x-2 p-3 bg-themeGray rounded-lg hover:bg-gray-200 duration-200">
            <RiFileDownloadLine size={24} color="#A0AEC0" />
            <span className="text-[#718096] font-workSans">Download</span>
          </button>
        </div>
      </div>
      <div className="manageTable ">

        <DataTable
          value={filteredData}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50, 100]}
          removableSort
          emptyMessage="No Data Found"
        >
          {props.columns?.map((col, ind) => (
            <Column
              key={ind}
              field={col.field}
              header={col.header}
              sortable={true}
              style={{ minWidth: '12rem' }}
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
}