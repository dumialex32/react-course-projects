import { useState } from "react";
import { Logo } from "./logo";
import { Form } from "./form";
import { PackingList } from "./packingList";

import { Footer } from "./footer";

export default function App() {
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("input");

  function handleSortBy(newSort) {
    setSortBy(newSort);
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) setItems([]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItems={handleRemoveItems}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
        onSortBy={handleSortBy}
        sortBy={sortBy}
      />
      <Footer items={items} />
    </div>
  );
}
