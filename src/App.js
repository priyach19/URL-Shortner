import {Routes,Route} from "react-router-dom"
import Register from "./Register";
import Login from "./Login"
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>
    </>
  );
}

export default App;
