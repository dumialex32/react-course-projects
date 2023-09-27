import { useState } from "react";
import { Item } from "./item";
import { Actions } from "./actions";

export function PackingList({
  items,
  onRemoveItems,
  onToggleItems,
  onClearList,
  onSortBy,
  sortBy,
}) {
  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemoveItems={onRemoveItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <Actions onClearList={onClearList} onSortBy={onSortBy} />
    </div>
  );
}
