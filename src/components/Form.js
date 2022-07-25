import Select from "react-select";
// import Button from "@mui/material/Button";
import "../App.css";
let products = [
  {
    author: "Chinua Achebe",
    country: "Nigeria",
    imageLink: "images/things-fall-apart.jpg",
    language: "English",
    link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    pages: 209,
    title: "Things Fall Apart",
    year: 1958,
  },
  {
    author: "Hans Christian Andersen",
    country: "Denmark",
    imageLink: "images/fairy-tales.jpg",
    language: "Danish",
    link: "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
    pages: 784,
    title: "Fairy tales",
    year: 1836,
  },
  {
    author: "Dante Alighieri",
    country: "Italy",
    imageLink: "images/the-divine-comedy.jpg",
    language: "Italian",
    link: "https://en.wikipedia.org/wiki/Divine_Comedy\n",
    pages: 928,
    title: "The Divine Comedy",
    year: 1315,
  },
  {
    author: "Unknown",
    country: "Sumer and Akkadian Empire",
    imageLink: "images/the-epic-of-gilgamesh.jpg",
    language: "Akkadian",
    link: "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
    pages: 160,
    title: "The Epic Of Gilgamesh",
    year: -1700,
  },
  {
    author: "Unknown",
    country: "Achaemenid Empire",
    imageLink: "images/the-book-of-job.jpg",
    language: "Hebrew",
    link: "https://en.wikipedia.org/wiki/Book_of_Job\n",
    pages: 176,
    title: "The Book Of Job",
    year: -600,
  },
];
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

const mock = [
  { value: "AB500", label: "mismar" },
  { value: "BB", label: "בייבי" },
  { value: "XP", label: "גת XP" },
];

const mock2 = [
  { value: "60001", label: "רמי" },
  { value: "6021", label: "איציק" },
  { value: "6198", label: "משה" },
];

export const FormLine = (props) => {
  let products = ["baby", "mismar", "gabi"];
  // console.log(props);
  let lineData = props.lineData;
  console.log(lineData);
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
            value={mock2.map((castumer) => {
              if (castumer["label"] == lineData.castumerName)
                return { label: castumer.label, value: castumer.value };
            })}
            onChange={props.handleDropDownInput2}
            options={mock2}
            placeholder="בחר לקוח..."
          />
        ) : (
          <Select
            styles={colorStyles}
            className="drop-select"
            name="castumerName"
            onChange={props.handleDropDownInput2}
            options={mock2}
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
            value={mock.map((item) => {
              if (item["label"] == lineData.itemHead)
                return { label: item.label, value: item.value };
            })}
            onChange={props.handleDropDownInput}
            options={mock}
            placeholder="בחר פריט..."
          />
        ) : (
          <Select
            styles={colorStyles}
            className="drop-select"
            name="itemHead"
            onChange={props.handleDropDownInput}
            options={mock}
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
