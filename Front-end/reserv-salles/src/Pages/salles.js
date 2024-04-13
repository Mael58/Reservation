import React, { useEffect, useState } from "react";
import axios from "axios";

const Salles = () => {
  const [rooms, setRooms] = useState([]);
  const [roomEditId, setRoomEditId] = useState(null);

  function roomList() {
    axios.get("http://localhost:8000/rooms/").then((response) => {
      setRooms(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  function deleteRoom(id) {
    axios.delete(`http://localhost:8000/rooms/${id}/`).then((response) => {
      roomList();
    }).catch((error) => {
      console.error(error);
    });
  }

  function editRoom(id) {
    setRoomEditId(id);
  }

  function saveRoom(id) {
    const nameInput = document.getElementById(`name-input-${id}`);
    const capacityInput = document.getElementById(`capacity-input-${id}`);
    const updateData = {
      name: nameInput.value,
      capacity: parseInt(capacityInput.value),
    };
    console.log(updateData);

    axios
      .put(`http://localhost:8000/rooms/${id}/`, updateData)
      .then((response) => {
        setRoomEditId(null);
        roomList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function cancelEdit() {
    setRoomEditId(null);
  }

  useEffect(() => {
    roomList();
  }, []);

  return (
    <div>
      <h1>Salles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              {roomEditId === room.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      id={`name-input-${room.id}`}
                      defaultValue={room.name}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      id={`capacity-input-${room.id}`}
                      defaultValue={room.capacity}
                    />
                  </td>
                  <td>
                    <button onClick={() => saveRoom(room.id)}>Save</button>
                  </td>
                  <td>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{room.name}</td>
                  <td>{room.capacity}</td>
                  <td>
                    <img
                      src={"./edit.png"}
                      alt="edit"
                      width={20}
                      onClick={() => editRoom(room.id)}
                    />
                  </td>
                  <td>
                    <img
                      src={"./corbeille.png"}
                      alt="delete"
                      width={20}
                      onClick={() => deleteRoom(room.id)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salles;
