import { useEffect } from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Desktop3 from "./pages/desktop3";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Desktop3 />} />
    </Routes>
  );
}
export default App;
