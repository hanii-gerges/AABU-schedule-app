import React, {useRef} from 'react';
import ReactDOM from 'react-dom';

import {MaterialsTree} from './MaterialsTree/MaterialsTree.jsx';
import {StudentSchedule} from './StudentSchedule/StudentSchedule.jsx';
import {MaterialsDisplay} from './MaterialsDisplay/MaterialsDisplay.jsx';
import {NavBar} from './NavBar/NavBar.jsx';

import SplitPane from 'react-split-pane';
import '../../sass/splitter.module.scss';

import { Provider } from "react-redux";
import store from '../Redux/Store.js';
/*  // TODO:

	*[upd] when attempting to add an already added material but different time suggest replacement of time.
		-> new icon for updating a previously added material.

    ?[DONE][major-fix] know what is the currently selected time_days to be added

    ?[DONE][major-fix] prevent adding a material that are already there in the schedule 
        -> doesn't compare the current selected time.
            ? fixed :)
        -> doesn't prevent to click to check if it's occupied
           ? instead it replaces materials if clicked.

    *[feature]  calculate the total credit hours so far

    ?[DONE][feature] create a navbar for extra options like:
        -> save schedule as picture
        -> clear everything
    
    ?[DONE]  StudentSchedule should display the time of each row
    
    ?[DONE][design] when hovering over a material in the schedule display a little (x) icon to remove it
    
    *[design] view the schedule in full-view mode (with instructors names displayed)

    *[design] when the materials display is empty display a helpful and cute svg.
*/
const App = ()=> {

	const tableRef = useRef(null);
    return (
        <Provider store={store}>
            <div className="AABU-Schedule-App">


                <div className="Row">
                    <SplitPane minSize={10} maxSize={890} defaultSize={770}>
                        <MaterialsTree/>
                        <StudentSchedule ref={tableRef}/>

                    </SplitPane>
                </div>

				<NavBar table={tableRef} />  {/*  */}

                <MaterialsDisplay />                
            </div>
        </Provider>
    );
}

export default <App />

if (document.getElementById('root'))
    ReactDOM.render(<App />, document.getElementById('root'));
else
    alert('err: root element not found!');

