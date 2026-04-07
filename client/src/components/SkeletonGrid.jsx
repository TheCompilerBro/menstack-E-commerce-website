const SkeletonGrid = () => (
  <section className="grid">
    {Array.from({ length: 6 }).map((_, idx) => (
      <div className="card skeleton" key={idx}>
        <div className="skeleton-image" />
        <div className="card-body">
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      </div>
    ))}
  </section>
);

export default SkeletonGrid;
