import React from 'react';
import './App.css';
import { Timer } from './components/Timer';

const App = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-green-600">
            <Timer />
        </div>
    );
};

export default App;
