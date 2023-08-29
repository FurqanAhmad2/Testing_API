
import Navbar from "./navbar/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      
    </>
  );
};
export default Layout;
