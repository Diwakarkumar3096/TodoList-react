import { useEffect, useState } from "react";

function Api() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setUser(data);
      });
  };

  const addTask = () => {
    setUser((data) => [{ title: name },...data]);
    setName("");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const deleteItem = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setUser((values) => values.filter((item) => item.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const editItem = (id) => {
    const updatedName = prompt("Enter updated name:");
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: updatedName }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setUser((values) =>
          values.map((item) =>
            item.id === id ? { ...item, title: updatedName } : item
          )
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Api</h1>
      <input
        id="editinput"
        value={name}
        onChange={handleChange}
        type="text"
        placeholder="Write or edit"
      />
      <button id="addbtn" onClick={addTask}>
        ADD
      </button>
      <div id="todolist">
        <table>
          <thead>
            <tr>
              <th>SNo.</th>
              <th id="name">Name</th>
              <th id="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((value,key) => (
              <tr key={key}>
                <td>{key+1}</td>
                <td>{value.title}</td>
                <td>
                  <button id="delete" onClick={() => deleteItem(value.id)}>
                    Delete
                  </button>

                  <button id="edit" onClick={() => editItem(value.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Api;
