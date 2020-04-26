import React from 'react';
import ReactDOM from 'react-dom';
import {MaterialsDisplay} from './MaterialsDisplay.jsx';
import {MaterialsTree} from './MaterialsTree.jsx';
import {StudentSchedule} from './StudentSchedule.jsx';

const App = ()=> {
    return (
        <div className="AABU-Schedule-App">
            <h1>AABU-Schedule-App</h1>
            <div className="Row">
                
                <MaterialsTree/>

                <StudentSchedule/>
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

