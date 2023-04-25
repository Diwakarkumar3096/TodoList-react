import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Api from "./Components/Api";

function App() {
  return (
    <div className="App">
      {/* <h1>Todo List</h1>

         <Api/> */}
         <BrowserRouter>
             <Routes>
                   <Route path="/" element={<Api/>}/>
                    
             </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
