const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div
        className="spinner-border"
        role="status"
        style={{ height: "10rem", width: "10rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
