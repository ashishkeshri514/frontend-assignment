import './App.css';
import React, {useEffect,useState} from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import data from './components/utils/country.json';
function App() {
  const [gridApi, setGridApi] =  useState(null);
  const [tableData, setTableData]  = useState(null);
  const [record, setRecord] = useState( {"id":"","name": "","email":"","gender":"","dob":"","city":"","country":""});

  const url = 'http://localhost:4000/users';
  const columnDefs = [
    {headerName:"Id",field:"id",checkboxSelection: true},
    {headerName:"Name",field:"name"},
    {headerName:"Email",field:"email"},
    {headerName:"Gender",field:"gender"},
    {headerName:"DOB",field:"dob",cellRenderer: date },
    {headerName:"Country",field:"country",cellRenderer: country},
    {headerName:"City",field:"city"},
    {
      headerName: "",
      minWidth: 150,
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action"
    }

  ]
  const onGridReady = (params) => {
    // using hooks - setGridApi/setColumnApi are returned by useState
    setGridApi(params.api);

}
  const defaultColDef = {
    sortable:true,
    flex:1,
    filter: false,
    editable: true,
    
  }

  function actionCellRenderer(params) {
    let eGui = document.createElement("div");
    eGui.innerHTML = `
    <button class="action-button delete" data-action="delete" >  </button>
    `;
    return eGui;
  }

  fuction date() {
    let eGui = document.createElement("div");
    eGui.innerHTML = `
    <input type="date" >  </button>
    `;
    return eGui;
  }

  fuction country() {
    let dropdown = document.createElement("select");

    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = "Select Country";
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    let option;
    for(let i = 0; i< data.length; i++) {
      option = document.createElement('option');
      option.text = data[i];
      option.value =data[i];
      dropdown.add(option);
    }
    
    return dropdown;
  }



  function onCellClicked(params) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
      }
    }
  }

  const onAdd = () => {
    setTableData([...tableData,record])
  }

  const onSelectedDelete = () =>{
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData);
    //To Implement
  }

  const onNonSelectedDelete = () =>{
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData);
    //To Implement
  }

  

  

  useEffect(()=>{
    getUsers();
  },[])

  const getUsers = () =>{
    fetch(url).then(res => res.json()).then(res=>setTableData(res))
  }


return (
    <div className="ag-theme-alpine" style={{height: 400,margin:8}}>
      <div style={{display:'flex',justifyContent: 'space-evenly'}} className="crud-row">
        <button onClick={onAdd}>Add Row</button>
        <button onClick={onSelectedDelete}>Delete Selected Rows</button>
        <button onClick={onNonSelectedDelete}>Delete Non Selected Rows</button>
        <button>Submit</button>
      </div>
      <AgGridReact 
          rowData={tableData} columnDefs={columnDefs} defaultColDef={defaultColDef} onGridReady={onGridReady}  rowSelection="multiple"/>
    </div>
);
}

export default App;
