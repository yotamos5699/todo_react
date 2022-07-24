export const Task = (props) => {
  console.log(props);
  // const editRow = (id) => {
  //     console.log("complited", id);

  //     let res = itemList.map((value) => {
  //         if (value.id === id) {
  //           return value;
  //       }})
  //     return res
  //   };
  return (
    <div className="itemList">
      <table className="content-table">
        <thead>
          <tr>
            <td>מחק</td>
            <td>ערןך</td>
            <td>כמות</td>
            <td>פריט</td>
            <td>שם לקוח</td>
            <td>מס שורה</td>
          </tr>
        </thead>
        <tbody>
          {props.itemList.map((task, index) => {
            return (
              <tr className="task" style={{ color: task.editRow && "green" }}>
                <td
                  className="delete"
                  onClick={() => props.deleteItemRow(task.id)}
                >
                  X
                </td>
                <td className="edit" onClick={() => props.editRow(task.id)}>
                  V
                </td>
                <td>{task.Quantity}</td>
                <td> {task.itemHead}</td>
                <td> {task.castumerName}</td>
                <td>{index}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
