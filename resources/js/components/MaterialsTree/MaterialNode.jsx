import React, { createRef } from 'react';

import { ADD_TO_DISPLAY, REMOVE_FROM_DISPLAY } from "../../Redux/actions/types";
import { useDispatch } from 'react-redux';

import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { UncontrolledTooltip } from 'reactstrap';

export const MaterialNode = ({material})=>{

	const materialRef = createRef();
	const dispatch = useDispatch();

	//? add or remove a material from the MaterialsDisplay
	const ToggleMaterialToDisplay = () =>{
		
		const isDisplayed = materialRef.current.classList.toggle('fadingNode');
				
		if(!isDisplayed)
				dispatch({
						type: ADD_TO_DISPLAY,
						payload: material
				});

		else
				dispatch({
						type: REMOVE_FROM_DISPLAY,
						payload: material.id
				});
		
}

	const is_disabled = (material.sections.length == 0);
	return <div>
			<button id={`MATERIAL${material.id}`} ref={materialRef} className={'materialNode fadingNode'}
			 onClick={()=>ToggleMaterialToDisplay()} disabled={is_disabled}>

			 		{is_disabled && 
					//  <div className='disabled-material-ico'> X </div>
					 <FontAwesomeIcon className='disabled-material-ico' icon={faBan}/>
					}

					{`${material.name}`}

			</button>
				
			{is_disabled && <UncontrolledTooltip placement="top" target={`MATERIAL${material.id}`}>
					لا يوجد شعب لهذة المادة
			</UncontrolledTooltip>}
		</div>
}