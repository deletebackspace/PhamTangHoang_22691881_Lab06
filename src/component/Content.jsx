import { useState, useEffect } from "react";


const Content = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [datax, setDatax] = useState([]);

  // Fetch dữ liệu từ JSON Server
  useEffect(() => {
    fetch("http://localhost:2000/data")
      .then((res) => res.json())
      .then((data) => setDatax(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const openModal = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async (updatedUser) => {
    if (!selectedUser) {
      // Add new user
      const newUser = { ...updatedUser, id: Date.now() };
      const response = await fetch("http://localhost:1881/dataTable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const result = await response.json();
      setDataTB((prev) => [...prev, result]);
    } else {
      // Update existing user
      const response = await fetch(`http://localhost:1881/dataTable/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedUser, id: selectedUser.id }),
      });
      const result = await response.json();
      setDataTB((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? result : user))
      );
    }

    closeModal();
  };


  return (
    <div className="w-full p-5">
      {/* Header */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex">
          <img src="./Squares four 1.png" alt="Overview Icon" />
          <p className="font-bold text-xl ml-2">Overviews</p>
        </div>
      </div>
      <br />
      {/* Overview cards */}
      <div className="grid grid-cols-12 gap-1">
        {datax.map((item, index) => (
          <div key={index} className={`col-span-4 p-3 rounded flex ${item.bg}`}>
            <div className="flex-1">
              <p className="font-bold">{item.title}</p>
              <h1 className="font-bold text-4xl">{item.price}</h1>
              <br />
              <i>
                <b className="text-green-400">{item.tile}</b> period of change
              </i>
            </div>
            <img src={item.image} alt={item.title} className="w-10 h-10" />
          </div>
        ))}
      </div>
      <br />
      {/* Table Header + Add Button */}
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="flex">
            <img src="./File text 1.png" alt="Report Icon" />
            <h1 className="font-bold ml-2 text-xl">Detailed Report</h1>
          </div>
        </div>
        <div className="col-span-10 text-end">
          <button
            className="rounded border-1 border-pink-400 p-1 text-pink-400"
            onClick={openModal}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
