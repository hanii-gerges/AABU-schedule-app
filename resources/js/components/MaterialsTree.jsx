import React, {useEffect} from 'react';

import { ADD_TO_DISPLAY, REMOVE_FROM_DISPLAY } from "../Redux/actions/types";
import { useDispatch } from 'react-redux';

import Tree, {withStyles} from 'react-vertical-tree';
import './MaterialsTree.module.scss';


//? simulates the currently selected materials' state.

const rows_of_data =
 [ 

    {id: 1, name: "حاسوب 2 ", time_days: [" 8.00 AM- 9.00 AM  حد ثل خمس"], room: "تم202", instructor: "TutorName", pre_req: null},
    {id: 2, name: "برمجة كينونية ",time_days: [" 10.00 AM- 11.00 AM  حد ثل خمس"], room: "تم202", instructor: "TutorName", pre_req: 1},
    
        {id: 3, name: "تراكيب البيانات" ,time_days: [" 10.00 AM- 11.00 AM  حد ثل خمس"], room: "تم202", instructor: "TutorName", pre_req: 2},
        {id: 4, name: "تصميم الصفحات الالكترونية",time_days: [" 10.00 AM- 11.00 AM  حد ثل خمس"], room: "تم202", instructor: "TutorName", pre_req: 2},
        {id: 5, name: "البرمجة بلغة جافا",time_days: [" 10.00 AM- 11.00 AM  حد ثل خمس"], room: "تم202", instructor: "TutorName", pre_req: 2},
             {id: 6, name: "البرمجة المرئية",time_days: [" 10.00 AM- 11.00 AM  حد ثل خمس"], room: "تم202", instructor: "TutorName", pre_req: 5},

    {id: 7,name: "ديسكريت ", time_days: [" 2.00 PM- 3.30 PM  ثن ربع"], room: "تم202", instructor: "TutorName", pre_req: null},
    {id: 8,name: "تصميم منطق الحاسوب",time_days: [" 9.30 AM- 11.00 AM  ثن ربع"], room: "تم202", instructor: "TutorName", pre_req: 7},
    {id: 9,name: "نظرية الحسابات ",time_days: [" 11.00 AM- 12.00 AM  حد"], room: "تم202", instructor: "TutorName", pre_req: 7},

];

const getMaterialsForParent = (id) =>{
    let result_child_array = [];

    const child_array = rows_of_data.filter(m => m.pre_req === id);
    for(const material of child_array){
        let dataObject = {...material, parent: id, children:[]}; //{id: material.id, parent: id, name: material.name, children: []};
        dataObject.children = getMaterialsForParent(material.id);
        result_child_array.push(dataObject);
    }

    return result_child_array;
}

const getArrayForMaterial = (material)=>{
    
    let dataObject = {...material, parent: null, children:[]}; //{id: material.id, parent: null, name: material.name, children: []};
    
    dataObject.children = getMaterialsForParent(material.id);

    return [dataObject];
}

export const MaterialsTree = ()=>{

    const dispatch = useDispatch();

    useEffect(() => {
        // fetch('http://46494bad.ngrok.io/api/sections',{
        //     method: 'GET',
        //     mode: 'cors',
        //     headers: {
        //     "Content-Type": "application/json" 
        //     } 
        // })
        // .then(res => res.json())
        // .then(res =>  rows_of_data = res.data)
        // .catch( (e)=>
        //     console.log(`ERR: ${e}`)
        // );

    }, []);

    const styles = {
        lines: {
          color: 'green',
          height: '20px',
        },
        node: {
          backgroundColor: '#19a83d',
        },
        text: {
          color: '#fff',
        }
    };
    
    //? add or remove a material from the MaterialsDisplay
    const toggleMaterialToDisplay = (material) =>{
        const elem = document.querySelector(`button[id="${material.id}"]`);
        const isDisplayed = elem.classList.toggle('fadingNode');
        
        if(!isDisplayed)
            dispatch({
                type: ADD_TO_DISPLAY,
                payload: material
            });

        else
            dispatch({
                type: REMOVE_FROM_DISPLAY,
                payload: material
            });
        
    }

    const parents_array =  rows_of_data.filter(m => m.pre_req === null);
    const StyledTree = withStyles(styles)(Tree);

    return(
        <div className="studyPlan">
            {parents_array.map( material => 
                <StyledTree key={material.id} data={getArrayForMaterial(material)} 
                    render={ item => 
                        <button id={item.id} className={'materialNode fadingNode'}>
                            {`${item.name}`}
                        </button>
                    }
                    onClick={(material) => toggleMaterialToDisplay(material) }
                />    
            )}
        </div>
    )
}