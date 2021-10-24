import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function Table() {
  const [gridApi, setGridApi] = useState([]);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const updateData = (data) => {
      setRowData(data);
    };
  };
  const GenderCell = (props) => {
    const { value } = props;
    const icon = value == "Male"; // ? <genderCell/>:<genderCell/>;
    return (
      <div>
        {icon}
        {value}
      </div>
    );
  };

  const handleChange = ({ target }) => {
    setRowData(target.value);
  };
  const addData = (e) => {
    e.preventDefault();
    console.log(rowData);
    if (rowData != null) {
      const mygridApi = gridApi;
      mygridApi.push(rowData);
      setGridApi(mygridApi);
    }
  };

  const rowSelectionType = "multiple";

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <button onClick={() => gridApi.applyTransaction({ add: [{}] })}>
          Add Row
        </button>
        <button
          onClick={() => {
            const selectedRows = gridApi.getSelectedRows();
            gridApi.applyTransaction({ remove: selectedRows });
          }}
        >
          Delete Selected Row
        </button>

        <button>Submit</button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          onGridReady={onGridReady}
          rowSelection={rowSelectionType}
          sideBar={true}
        >
          <AgGridColumn
            field="id"
            sortable={true}
            editable={false}
            filter={true}
            enableValue={true}
            enableRowGroup={true}
            checkboxSelection={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Name"
            sortable={true}
            editable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Email"
            sortable={true}
            editable={true}
            filter={true}
            required
          ></AgGridColumn>
          <AgGridColumn
            field="Gender"
            cellRenderer="GenderCell"
            sortable={true}
            editable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="DOB"
            sortable={true}
            editable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Country"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="City"
            sortable={true}
            editable={true}
            filter={true}
          ></AgGridColumn>
        </AgGridReact>
        <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
          <h2>Submitted Data</h2>
          <AgGridReact
            rowData={rowData}
            rowSelection={rowSelectionType}
            sideBar={true}
          >
            <AgGridColumn
              field="id"
              sortable={true}
              editable={false}
              filter={true}
              enableValue={true}
              enableRowGroup={true}
              checkboxSelection={true}
            ></AgGridColumn>
            <AgGridColumn
              field="Name"
              sortable={true}
              editable={false}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="Email"
              sortable={true}
              editable={false}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="Gender"
              sortable={true}
              editable={false}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="DOB"
              sortable={true}
              editable={false}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="Country"
              sortable={true}
              filter={false}
              editable={true}
            ></AgGridColumn>
            <AgGridColumn
              field="City"
              sortable={true}
              editable={false}
              filter={true}
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
}
