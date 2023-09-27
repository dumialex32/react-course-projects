import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: 0,
  },
  {
    id: 933372,
    name: "Johnny",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 0,
  },
  {
    id: 499476,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend(e) {
    e.preventDefault();
    setShowAddFriend(!showAddFriend);
  }

  function handleSelectedFriend(friend) {
    // setSelectedFriend(friend);

    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    showAddFriend && setShowAddFriend(!showAddFriend);
  }

  function handleSplitBill(value) {
    console.log(value);

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSetFriends={setFriends}
          onSelectFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />

        <Button className={"btn--add-friend"} onClick={handleShowAddFriend}>
          {!showAddFriend ? "Add Friend" : "Close"}
        </Button>
        {showAddFriend && (
          <FormAddFriend
            onSetShowAddFriends={handleShowAddFriend}
            onSetFriends={setFriends}
          />
        )}
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul className="friend-list">
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={`friend-item ${isSelected ? "selected" : ""}`}>
      <img src={friend.image} alt="friend"></img>
      <div>
        <p className="name">{friend.name}</p>
        {friend.balance < 0 && (
          <p className="msg-red">
            You owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance > 0 && (
          <p className="msg-green">
            {friend.name} owes you {friend.balance}$
          </p>
        )}
        {friend.balance === 0 && (
          <p className="msg">You and {friend.name} are even.</p>
        )}
      </div>

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onSetFriends, onSetShowAddFriends }) {
  const [newFriendName, setNewFriendName] = useState("");
  const img = "https://i.pravatar.cc/48";

  function handleSubmitNewFriend(e) {
    e.preventDefault();

    if (!newFriendName || /^\d+$/.test(newFriendName)) return;

    const randomId = crypto.randomUUID();

    const newFriend = {
      id: randomId,
      name: newFriendName,
      image: `${img}?u=${randomId}`,
      balance: 0,
    };

    onSetFriends((friends) => [...friends, { ...newFriend }]);

    setNewFriendName("");
    onSetShowAddFriends(e);
  }

  return (
    <form className="add-friend" onSubmit={(e) => handleSubmitNewFriend(e)}>
      <Input
        value={newFriendName}
        onChange={(e) => setNewFriendName(e.target.value)}
      >
        Friend Name
      </Input>
      <Input value={img} readOnly>
        Image Url
      </Input>

      <Button className="btn--add">Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoPays, setWhoPays] = useState("user");
  const paidByFriend = bill - paidByUser;

  function handleBillValue(value) {
    setBill(value);
  }

  function handlePaidByUser(value) {
    setPaidByUser(value);
  }

  function handleWhoPays(value) {
    setWhoPays(value);
    console.log(whoPays);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoPays === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2 className="form-title">Split a bill with {selectedFriend.name}</h2>

      <Input
        type="number"
        value={bill === 0 ? "" : bill}
        onChange={(e) => handleBillValue(+e.target.value)}
      >
        Bill Value
      </Input>

      <Input
        type="number"
        value={paidByUser === 0 ? "" : paidByUser}
        onChange={(e) =>
          handlePaidByUser(
            +e.target.value > bill ? paidByUser : +e.target.value
          )
        }
      >
        Your expense
      </Input>

      <Input
        type="number"
        value={paidByFriend === 0 ? "" : paidByFriend}
        disabled
      >
        {selectedFriend.name}' expense
      </Input>

      <Select value={whoPays} onChange={(e) => handleWhoPays(e.target.value)}>
        Who is paying the bill
        <Option value="user">You</Option>
        <Option value="friend">{selectedFriend.name}</Option>
      </Select>

      <Button className="btn--split-bill ">Split the bill</Button>
    </form>
  );
}
function Button({ children, className = "", onClick }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Input({
  children,
  value,
  type = "text",
  readOnly = false,
  disabled = false,
  onChange,
}) {
  return (
    <>
      <label>{children}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        readOnly={readOnly}
      ></input>
    </>
  );
}

function Select({ children, value, onChange }) {
  const label = children[0];
  const optionEl = children.filter((children) => typeof children === "object");

  return (
    <>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {optionEl}
      </select>
    </>
  );
}

function Option({ children, value, hidden = false }) {
  return (
    <option value={value} hidden={hidden}>
      {children}
    </option>
  );
}
