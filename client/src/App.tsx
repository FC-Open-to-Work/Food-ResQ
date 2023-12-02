import React from 'react';

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import DynamicRoute from "./utils/DynamicRoute";

function App() {
    return (
        <Router>
            <div className="h-full">
                <Routes>
                    <Route
                        path="/"
                        element={<DynamicRoute element={<Home />} authenticated={true}/>}
                    ></Route>
                    <Route
                        path="/login"
                        element={<DynamicRoute element={<Login />} authenticated={false}/>}
                    ></Route>
                    <Route
                        path="/signup"
                        element={<DynamicRoute element={<Signup />} authenticated={false}/>}
                    ></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
