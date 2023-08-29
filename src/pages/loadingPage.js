import Spinner from "../components/common/spinner";

const LoadingPage = () => {
  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Spinner />
    </div>
  );
};

export default LoadingPage;
