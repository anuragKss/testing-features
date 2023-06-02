import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/home";
import SignedFileUpload from "./Component/SIgnedFileUpload";
import Header from "./Component/header";

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/signed-file-upload"
            element={<SignedFileUpload />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
