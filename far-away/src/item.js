export function Item({ item, onRemoveItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      ></input>
      <p
        style={{
          textDecorationLine: `${item.packed ? "line-through" : "none"}`,
        }}
      >
        {item.quantity} {item.description}
      </p>

      <button onClick={() => onRemoveItems(item.id)}>❌</button>
    </li>
  );
}
