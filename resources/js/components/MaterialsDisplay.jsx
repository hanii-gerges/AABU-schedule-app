import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ADD_TO_SCHDULE, REMOVE_FROM_SCHDULE } from "../Redux/actions/types";

import { Table, FormGroup, Input, Button } from 'reactstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MaterialsDisplay.module.scss';




export const MaterialsDisplay = ()=>{
    const rows_of_data = useSelector(state => state.materials.displayMaterials);
    const selectedMaterials = useSelector(state => state.materials.scheduleMaterials);
    console.log(selectedMaterials);

    const dispatch = useDispatch();
    const addToSchedule = (material) =>{
        
        //! WRONG, this compares all days, not the currently selected day.
        if(selectedMaterials.some( _material => _material.time_days == material.time_days )){
            console.log('TIME OCCUPIED');
            return;
        }
        
        dispatch({
            type: ADD_TO_SCHDULE,
            payload: {...material, time_days: material.time_days[0]}  //! NOT ACTUALLY CORRECT
        });

        console.log({...material, time_days: material.time_days[0]});
    }

    return(
        <div className="materialsProgram">
            <h3>Avaliable Times:</h3>

            <Table className='materialsTable'>
                <thead>
                    <tr>
                        <th> اضف المادة  </th>
                        <th> رقم المادة</th>
                        <th> اسم المادة  </th>
                        <th> الايام والاوقات</th>
                        <th>  مدرس المادة  </th>
                        <th> القاعة  </th>
                    </tr>
                </thead>

                <tbody>
                    {rows_of_data.map( (material) =>
                        <tr key={material.id} id='material'>
                            <td>
                                <Button color="success" onClick={() => addToSchedule(material)}> 
                                    <FontAwesomeIcon icon={faPlus}/>
                                </Button>
                            </td>

                            <td> {material.id} </td>
                            <td> {material.name} </td>
                            <td>
                                <Input id='drop-down' type='select'>
                                    {material.time_days.map(
                                        (choice, index) =>
                                        <option key={index} className='time-day-option'>
                                            {choice}
                                        </option>
                                    )}
                                </Input>
                            </td>
                            <td> {material.instructor} </td>
                            <td> {material.room} </td>
                        </tr>

                    )}

                </tbody>

            </Table>
        </div>
    );

}
