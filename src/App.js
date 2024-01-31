import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Create from './component/create';
import ContactDetail from "./component/contactDetail";
import ContactDetailsEdit from "./component/contactDetailsEdit";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={< Create />}></Route>
          <Route exact path='/detail' element={< ContactDetail />}></Route>
          <Route exact path='/ContactDetailsEdit/:id' element={< ContactDetailsEdit />}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
