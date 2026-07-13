const HEIGHTS = [280, 200, 340, 240, 300, 220, 320, 260, 290, 210, 350, 230];

function Loading() {
  return (
    <div className="skeleton-grid">
      {HEIGHTS.map((h, i) => (
        <div key={i} className="skeleton" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}

export default Loading;