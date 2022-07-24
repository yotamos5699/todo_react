import { useState } from "react";
import "./App.css";
import { Task } from "./components/Task";
import { FormLine } from "./components/Form";
import Helper from "./Helper";
function App() {
  const [itemList, setItemList] = useState([]);
  const [lineData, setLineData] = useState({
    itemHead: "",
    castumerName: "",
    Quantity: 0,
    isRenderd: true,
  });
  const [newItem, setNewItem] = useState({
    itemHead: "",
    castumerName: "",
    Quantity: 0,
    isInStock: true,
  });

  const updateDB = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let isDataExist = itemList.length > 0 ? true :false
    if(!isDataExist){
      console.log('no data')
      return
    }
    var raw = JSON.stringify({
      type: 2,
      data: itemList,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/updateSpacielOrders", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(setItemList([]))
      .catch((error) => console.log("error", error));
  };

  const toggleIsRenderd = (state) => {
    console.log("asdasdasd ", lineData.isRenderd);

    if (lineData.isRenderd || state == false) {
      setLineData((prev) => {
        return { ...prev, isRenderd: state };
      });
    } else if (!lineData.isRenderd || state == true) {
      setLineData((prev) => {
        return { ...prev, isRenderd: state };
      });
    }
  };
  const handleTaskInput = (event) => {
    toggleIsRenderd(false);
    console.log(event.target);
    let name = event.target.name;
    let value = event.target.value;
    setNewItem((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleDropDownInput = (event) => {
    toggleIsRenderd(false);
    console.log(event.label);
    console.log(event);
    let name = "itemHead";
    let value = event.label;
    setNewItem((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleDropDownInput2 = (event) => {
    toggleIsRenderd(false);
    console.log(event.label);
    console.log(event);
    let name = "castumerName";
    let value = event.label;
    setNewItem((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addItemRow = (event) => {
    console.log("clicked");
    const item = {
      date: new Date(),
      id: itemList.length === 0 ? 1 : itemList[itemList.length - 1].id + 1,
      isInStock: true,
      ...newItem,
    };
    setItemList([...itemList, item]);
  };

  const deleteItemRow = (id) => {
    setItemList(itemList.filter((value) => value.id !== id));
  };
  const editRow = (id) => {
    itemList.forEach((value) => {
      console.log(value.event);
      if (value.id === id) {
        let input = {
          ...value,
          Quantity: value.Quantity,
          castumerName: value.castumerName,
        };
        console.log("input", input);
        setLineData(input);
      }
    });
    toggleIsRenderd(true);
    deleteItemRow(id);
  };
  return (
    <div className="App">
      <FormLine
        updateDB={updateDB}
        setLineData={setLineData}
        lineData={lineData}
        editRow={editRow}
        addItemRow={addItemRow}
        handleTaskInput={handleTaskInput}
        handleDropDownInput={handleDropDownInput}
        handleDropDownInput2={handleDropDownInput2}
      />
      <Task
        itemList={itemList}
        // updateForm={updateForm}
        deleteItemRow={deleteItemRow}
        editRow={editRow}
      />
    </div>
  );
}

export default App;
