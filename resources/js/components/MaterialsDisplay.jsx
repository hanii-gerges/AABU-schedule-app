import React from 'react';
import { Table, FormGroup, Input, Button } from 'reactstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Material{
    constructor(id, name, day_and_time, tutor, room, prerequisite = null){
        this.id = id;
        this.name = name;
        this.day_and_time = day_and_time;
        this.tutor = tutor;
        this.room = room;
        this.pre_req = prerequisite;
    }
}

//? simulates an API response
const rows_of_data = [ 
    new Material(950010 ,'C++', ['8.00-9.00 SUN TUE THR', '8.00-9.30 MON WED'], 'suhair', 'قريش'),  
    new Material(544621, 'Discrete', ['9.00-10.00 SUN TUE THR', '11.00-1.30 MON WED'], 'shatnawi', 'تم 101'),
];

export const MaterialsDisplay = ()=>{

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
                                <Button color="success"> 
                                    <FontAwesomeIcon icon={faPlus}/>
                                </Button>
                            </td>

                            <td> {material.id} </td>
                            <td> {material.name} </td>
                            <td> 
                                <Input id='drop-down' type='select'>
                                    {material.day_and_time.map(
                                        (choice) =>
                                        <option key={choice} className='time-day-option'>
                                            {choice}
                                        </option>
                                    )}
                                </Input>
                            </td>
                            <td> {material.tutor} </td>
                            <td> {material.room} </td>
                        </tr>

                    )}

                </tbody>

            </Table>
        </div>
    );

}
