import './App.css';
import React, {useState} from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import data from './components/utils/country.json';
import user from './components/utils/db.json';

function App() {
  const [gridApi, setGridApi] =  useState(null);
  const [tableData, setTableData]  = useState(user.users);
  const [record, setRecord] = useState( {"id":"","name": "","email":"","gender":"","dob":"","city":"","country":""});
  const [addtableData, setAddTableData]  = useState(null);


  // const url = 'http://localhost:4000/users';
  const columnDefs = [
    {headerName:"Id",field:"id",checkboxSelection: true},
    {headerName:"Name",field:"name"},
    {headerName:"Email",field:"email"},
    {headerName:"Gender",field:"gender"},
    {headerName:"DOB",field:"dob" },
    {headerName:"Country",field:"country"},
    {headerName:"City",field:"city"},
    {
      headerName: "",
      minWidth: 150,
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action"
    }

  ]

  const columnDefs2 = [
    {headerName:"Id",field:"id",},
    {headerName:"Name",field:"name"},
    {headerName:"Email",field:"email"},
    {headerName:"Gender",field:"gender"},
    {headerName:"DOB",field:"dob"},
    {headerName:"Country",field:"country"},
    {headerName:"City",field:"city"},

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
  const defaultColDef2 = {
    sortable:true,
    flex:1,
    filter: false,

  }

  function actionCellRenderer(params) {
    let eGui = document.createElement("div");
    eGui.innerHTML = `
    <button class="action-button delete" onClick={onCellClicked()} data-action="delete" > Delete </button>
    `;
    
    return eGui;
  }

  // function date() {
  //   let eGui = document.createElement("div");
  //   eGui.innerHTML = `
  //   <input type="date" >  </button>
  //   `;
  //   return eGui;
  // }

  // function gender() {
  //   let data = {"Male":"male","Female":"female"};
  //   let dropdown = document.createElement("select");

  //   dropdown.length = 0;
  //   dropdown.classList.add("custom-select");

  //   let defaultOption = document.createElement('option');
  //   defaultOption.text = "Select Gender";
  //   dropdown.add(defaultOption);
  //   dropdown.selectedIndex = 0;
  //   let option;
    
  //   for (const [key, value] of Object.entries(data)) {
  //     option = document.createElement('option');
  //     option.text = key;
  //     option.value = key;
  //     dropdown.add(option);
  //   }
    
  //   return dropdown;
  // }

  // function country() {
  //   console.log(data);
  //   let dropdown = document.createElement("select");

  //   dropdown.length = 0;
  //   dropdown.classList.add("custom-select");

  //   let defaultOption = document.createElement('option');
  //   defaultOption.text = "Select Country";
  //   dropdown.add(defaultOption);
  //   dropdown.selectedIndex = 0;
  //   let option;
    
  //   for (const [key, value] of Object.entries(data)) {
  //     option = document.createElement('option');
  //     option.text = key;
  //     option.value = key;
  //     dropdown.add(option);
  //   }
    
  //   return dropdown;
  // }
  

  // function onCellClicked() {
  //   const selectedRows = gridApi.getSelectedRows();
  //   setAddTableData(gridApi.applyTransaction({ remove: selectedRows }));
  //   return true;

  //   }
  

  const onAdd = () => {
    try{
      setRecord({"id":"","name": "","email":"","gender":"","dob":"","city":"","country":""});
      setAddTableData([...addtableData,record])
      }
    catch(err){
      setRecord({"id":"","name": "","email":"","gender":"","dob":"","city":"","country":""});
      setAddTableData([record]);
      }
  }

  const onSelectedDelete = () =>{
    const selectedRows = gridApi.getSelectedRows();
    setAddTableData(gridApi.applyTransaction({ remove: selectedRows }));
    return true;
    
  }

  const onNonSelectedDelete = () =>{
    const selectedNodes = gridApi.getSelectedNodes();
    const nonselectedData = addtableData.filter(node => !(selectedNodes.includes(node)));
    console.log(nonselectedData);
    //To Implement
  }

  const onSubmit = () => {  
    setTableData([...tableData,...addtableData]);
    setAddTableData(null);
  }

  // useEffect(()=>{
  //   getUsers();
  // },[])
  // const getUsers = () =>{
 
  //   fetch(url).then(res => res.json()).then(res=>setTableData(res))
   
  // }


return (
  <div className="App">
    <div className="ag-theme-alpine" style={{height: 400,margin:8}}>
      
      <div style={{display:'flex',justifyContent: 'space-evenly'}} className="crud-row">
        <button onClick={onAdd}>Add Row</button>
        <button onClick={onSelectedDelete}>Delete Selected Rows</button>
        <button onClick={onNonSelectedDelete}>Delete Non Selected Rows</button>
        <button onClick={onSubmit}>Submit</button>
      </div>
       <AgGridReact 
        rowData={addtableData} 
           columnDefs={columnDefs} defaultColDef={defaultColDef} onGridReady={onGridReady}  rowSelection="multiple"/>
      <h1>Submitted Data</h1>
      <AgGridReact 
          rowData={tableData} columnDefs={columnDefs2} defaultColDef={defaultColDef2}/>
     
    
      
     
    </div>

  </div>
);
}

export default App;
