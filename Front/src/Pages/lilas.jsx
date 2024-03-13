import React, { useState } from 'react';
import './App.css';

function App() {
    const [isContainerVisible, setContainerVisible] = useState(false);

    const toggleContainer = () => {
        setContainerVisible(!isContainerVisible);
    };

    return (
        <div className="App">
            <h1>React Button and Container Example</h1>
            <button onClick={toggleContainer}>Toggle Container</button>
            {isContainerVisible && (
                <div className="container">
                    <p>This is the container content.</p>
                    <button onClick={toggleContainer}>Close Container</button>
                </div>
            )}
        </div>
    );
}

export default App;
