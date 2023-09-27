export function Footer({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.ceil((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      {!numItems ? (
        <p>Start to pack some items!</p>
      ) : (
        <p>
          {" "}
          {percentage === 100 ? (
            <span>You are done and ready for vacation ! ✈</span>
          ) : (
            <span>
              You have packed {numPacked} items and have {numItems} items on
              your list ({percentage ? percentage : 0}%)
            </span>
          )}
        </p>
      )}
    </footer>
  );
}
