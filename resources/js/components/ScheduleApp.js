import React from 'react';
import ReactDOM from 'react-dom';
import {MaterialsDisplay} from './MaterialsDisplay.js';
import {MaterialsTree} from './MaterialsTree.js';

const App = ()=> {
    return (
        <div className="AABU-Schedule-App">
            <h1>AABU-Schedule-App</h1>
            <div className="Row">
                
                <MaterialsTree/>

                <div className="studentSchedule">

                </div>
            </div>

            <MaterialsDisplay />
            
        </div>
    );
}

export default <App />

if (document.getElementById('root'))
    ReactDOM.render(<App />, document.getElementById('root'));
else
    alert('err: root element not found!');

