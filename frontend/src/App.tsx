import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserRouter from "./routes/UserRouter";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </>
  );
};

export default App;