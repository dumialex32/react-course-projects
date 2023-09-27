export function Actions({ sortBy, onSortBy, onClearList }) {
  return (
    <div className="actions">
      <select value={sortBy} onChange={(e) => onSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>

      <button onClick={onClearList}>Clear list</button>
    </div>
  );
}
