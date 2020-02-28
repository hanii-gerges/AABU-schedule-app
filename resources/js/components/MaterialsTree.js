import React from 'react';
import Tree, {withStyles} from 'react-vertical-tree';

class Material{
    constructor(id, name, prerequisite = null){
        this.id = id;
        this.name = name;
        this.pre_req = prerequisite;
    }
}
const rows_of_data = [ 
    new Material(-1 ,'رياضيات متقطعة'), 
    new Material(-2 ,'نظرية الحسابات', -1), 
    new Material(-3 ,'تصميم منطق الحاسوب', -1), 

    new Material(0 ,'حاسوب 2 C++'),  
    new Material(1 ,'برمجة كينونة', 0),

    new Material(2 ,'تراكيب البيانات', 1),
    new Material(3 ,'برمجة بلغة بايثون', 1),
    new Material(4 ,'تصميم الصفحات الالكترونية', 1),

    new Material(5 ,'البرمجة بلغة جافا', 1),
    new Material(6 ,'البرمجة المرئية', 5),
];


const getMaterialsForParent = (id) =>{
    let result_child_array = [];

    const child_array = rows_of_data.filter(m => m.pre_req === id);
    for(const material of child_array){
        let dataObject = {id: material.id, parent: {id}, name: material.name, children: []};
        dataObject.children = getMaterialsForParent(material.id);
        result_child_array.push(dataObject);
    }

    return result_child_array;
}

const getArrayForMaterial = (material)=>{
    
    let dataObject = {id: material.id, parent: null, name: material.name, children: []};
    
    dataObject.children = getMaterialsForParent(material.id);

    return [dataObject];
}

export const MaterialsTree = ()=>{

    //const data = getArrayForMaterials(rows_of_data);


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
    
    
    const parents_array =  rows_of_data.filter(m => m.pre_req === null);
    const StyledTree = withStyles(styles)(Tree);

    return(
        <div className="studyPlan">
            {parents_array.map( material => 
                <StyledTree data={getArrayForMaterial(material)} 
                    render={ item => <button className='materialNode'>{`${item.name}`}</button>}
                    onClick={(e) =>{alert(e.id)}} //implement a real fuken method!
                />    
            )}
        </div>
    )
}