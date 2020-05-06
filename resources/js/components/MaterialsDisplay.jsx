import React, {useState, useEffect, createRef} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ADD_TO_SCHDULE } from "../Redux/actions/types";

import {Dropdown} from '../utility_components/Dropdown';

import { Table, Button } from 'reactstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MaterialsDisplay.module.scss';




export const MaterialsDisplay = ()=>{

    const dispatch = useDispatch();

    const rows_of_data = useSelector(state => state.materials.displayMaterials);

    const selectedMaterials = useSelector(state => state.materials.scheduleMaterials);

    //const optionsRefs = rows_of_data.map( () => createRef());
    
    const [optionsRefs, setOptionsRefs] = useState([]);

    useEffect(() => {
        setOptionsRefs(optionsRefs => (
            rows_of_data.map((_, i) => optionsRefs[i] || createRef())
        ));
    }, [rows_of_data]);

    const addToSchedule = (material, index) =>{
        const sectionNum = optionsRefs[index].current.id;
        const selectedTime = material.sections[sectionNum].time_days;

        //! WRONG, this compares all days, not the currently selected day.
        if(selectedMaterials.some( _material => _material.time_days == selectedTime )){
            console.log('TIME OCCUPIED');
            return;
        }
        
        if(selectedMaterials.some( _material => _material.id == material.id )){
            console.log('MATERIAL ALREADY ADDED');
            return;
        }

        dispatch({
            type: ADD_TO_SCHDULE,
            payload: {...material, time_days: selectedTime}  //! NOT ACTUALLY CORRECT
        });

        console.log({...material, time_days: selectedTime});
    }

    return(
        <div className="materialsProgram">
            <h3>Avaliable Times:</h3>

            <Table className='materialsTable'>
                <thead>
                    <tr>
                        <th> اضف المادة  </th>
                        <th> اسم المادة  </th>
                        <th> مدرس المادة  /  الايام والاوقات / القاعة</th>
                    </tr>
                </thead>

                <tbody>
                    {rows_of_data.map( (material, index) =>
                        <tr key={index} id='material'>
                            <td>
                                <Button color="success" onClick={() => addToSchedule(material, index)}> 
                                    <FontAwesomeIcon icon={faPlus}/>
                                </Button>
                            </td>

                            <td> {material.name} </td>
                            <td>
                                <Dropdown ref={optionsRefs[index]} options={material.sections} />
                                {/* <Input id='drop-down' type='select'>
                                    {material.sections.map(
                                        (section, index) =>
                                        <option key={index} className='time-day-option'>
                                            {section.time_days + ' ' + section.instructor + ' ' + section.room}
                                        </option>
                                    )}
                                </Input> */}
                            </td>
                        </tr>

                    )}

                </tbody>

            </Table>
        </div>
    );
}
