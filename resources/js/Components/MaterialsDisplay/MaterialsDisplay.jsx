import React from 'react';

import { useSelector } from 'react-redux';

import {InteractiveRow} from './InteractiveRow';

import { Table } from 'reactstrap';


import './MaterialsDisplay.module.scss';


export const MaterialsDisplay = ()=>{
 
    const rows_of_data = useSelector(state => state.materials.displayMaterials);

    return(
        <div className="materialsProgram">

            {rows_of_data.length === 0 && <object className='girlSvg' type="image/svg+xml" data="GirlandSchedule.svg"></object>}

            {rows_of_data.length > 0 && 
			<Table className='materialsTable'>
                <thead>
                    <tr>
                        <th> اضف المادة  </th>
                        <th colSpan={2}> اسم المادة  </th>
                        <th> مدرس المادة  /  الايام والاوقات / القاعة</th>
                    </tr>
                </thead>

                <tbody>
                    {rows_of_data.map( (material, index) =>
                         <InteractiveRow key={index} material={material}/>
                    )}

                </tbody>

            </Table>}
        </div>
    );
}
