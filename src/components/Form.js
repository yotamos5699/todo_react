import Select from "react-select";
// import Button from "@mui/material/Button";
import "../App.css";
import { useEffect, useState } from "react";

let hi = "45px";
const colorStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white", height: hi }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return { ...styles, height: hi };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      height: hi,
      color: "#fff",
    };
  },
  multiValueLabel: (styles, { data }) => {
    return {
      ...styles,
      height: hi,
      color: "#fff",
    };
  },
  multiValueRemove: (styles, { data }) => {
    return {
      ...styles,
      color: "#fff",
      height: hi,
      cursor: "pointer",
      ":hover": {
        color: "#fff",
      },
    };
  },
};

// const mock = [
//   { value: "AB500", label: "mismar" },
//   { value: "BB", label: "בייבי" },
//   { value: "XP", label: "גת XP" },
// ];

// const mock2 = [
//   { value: "60001", label: "רמי" },
//   { value: "6021", label: "איציק" },
//   { value: "6198", label: "משה" },
// ];
let mock, mock2;
const fetchApiData = (path) => {
  return (
    fetch(path)
      //.then((res) => JSON.parse(res))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => console.log(e))
  );
};

export const FormLine = (props) => {
  const [castumerSelect, setCastumersSelect] = useState();
  const [itemsSelect, setItemsSelect] = useState();
  // console.log(props);
  let lineData = props.lineData;
  console.log(lineData);
  useEffect(() => {
    let castumersData;
    let itemsData;
    const fetchCastumersData = async () => {
      castumersData = await fetchApiData(
        "https://gatavigdorapi.herokuapp.com/api/getCastumers"
      );
      return castumersData;
    };

    const fetchItemsData = async () => {
      itemsData = await fetchApiData(
        "https://gatavigdorapi.herokuapp.com/api/getstock"
      );
      return itemsData;
    };
    console.log(typeof castumersData, typeof itemsData);
    const sortCastumersData = async () => {
      let data = castumersData;
      let sortedData = [];
      data.repdata.forEach((castumer) => {
        if (castumer["קוד מיון"] == 300) {
          sortedData.push({
            value: castumer["מפתח"],
            label: castumer["שם חשבון"],
          });
        }
      });
      return sortedData;
    };
    const sortItemssData = async () => {
      let data = itemsData;
      console.log("datttta ", data);
      let sortedData = [];
      data.repdata.forEach((item) => {
        if (item["מחסן"] == 3) {
          sortedData.push({
            value: item["מפתח פריט"],
            label: item["שם פריט"],
          });
        }
      });
      return sortedData;
    };
    const setData = async () => {
      castumersData = await fetchCastumersData();
      itemsData = await fetchItemsData();
      let sortedC = await sortCastumersData();
      let sortedI = await sortItemssData();
      console.log(sortedC);
      console.log(sortedI);
      mock2 = sortedC;
      mock = sortedI;
      setCastumersSelect(mock2);
      setItemsSelect(mock);
    };

    setData();

    //  console.log(a);
    //console.log(casData);
  }, []);
  return (
    <div className="addItem">
      <div className="chooseCastumer">
        <button className="appB" onClick={props.showAll}>
          כל המידע{" "}
        </button>

        <button className="appB" onClick={props.updateDB}>
          עדכן{" "}
        </button>
        {lineData.isRenderd ? (
          <Select
            styles={colorStyles}
            className="drop-select"
            name="castumerName"
            value={
              mock2 &&
              castumerSelect.map((castumer) => {
                if (castumer["label"] == lineData.castumerName)
                  return { label: castumer.label, value: castumer.value };
              })
            }
            onChange={props.handleDropDownInput2}
            options={mock2 && castumerSelect}
            placeholder="בחר לקוח..."
          />
        ) : (
          <Select
            styles={colorStyles}
            className="drop-select"
            name="castumerName"
            onChange={props.handleDropDownInput2}
            options={mock2 && castumerSelect}
            placeholder="בחר לקוח..."
          />
        )}
      </div>
      <div className="itemDetailes">
        <button className="appB" onClick={props.addItemRow}>
          הוסף פריט{" "}
        </button>
        <input
          name="startDate"
          type="date"
          //onChange={handleDate}
          placeholder="תאריך התחלה"
        />
        {lineData.isRenderd ? (
          <input
            value={lineData.Quantity}
            name="Quantity"
            onChange={props.handleTaskInput}
            placeholder="הזן כמות"
          />
        ) : (
          <input
            name="Quantity"
            onChange={props.handleTaskInput}
            placeholder="הזן כמות"
          />
        )}
        {lineData.isRenderd ? (
          <Select
            styles={colorStyles}
            className="drop-select"
            name="itemHead"
            value={
              mock &&
              itemsSelect.map((item) => {
                if (item["label"] == lineData.itemHead)
                  return { label: item.label, value: item.value };
              })
            }
            onChange={props.handleDropDownInput}
            options={mock && itemsSelect}
            placeholder="בחר פריט..."
          />
        ) : (
          <Select
            styles={colorStyles}
            className="drop-select"
            name="itemHead"
            onChange={props.handleDropDownInput}
            options={mock && itemsSelect}
            placeholder="בחר פריט..."
          />
        )}
      </div>
    </div>
  );
};

// function BasicExample() {
//   return (
//     <Dropdown>

//     </Dropdown>
//   );
// }

// export default BasicExample;
