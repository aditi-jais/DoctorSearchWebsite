import { useEffect } from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Desktop1 from "./pages/desktop1";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Desktop1 />} />
    </Routes>
  );
}
export default App;
