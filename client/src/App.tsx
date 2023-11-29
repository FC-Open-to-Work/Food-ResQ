import React from 'react';

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="h-full">
                <Routes>
                    <Route
                        path="/home"
                        element={<Home/>}
                    ></Route>
                    <Route
                        path="/login"
                        element={<Login/>}
                    ></Route>
                    <Route
                        path="/signup"
                        element={<Signup/>}
                    ></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
