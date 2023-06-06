import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../HomePage/HomePage";

import Test from "../Test/Test";

function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
