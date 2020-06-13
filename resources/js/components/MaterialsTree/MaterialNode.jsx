import React, { useState, createRef } from 'react';

import { ADD_TO_DISPLAY, REMOVE_FROM_DISPLAY } from "../../Redux/actions/types";
import { useDispatch } from 'react-redux';


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

	const isenabled = (material.sections.length > 0);
	return <div>

			<button id={material.id} ref={materialRef} className={'materialNode fadingNode'}
			 onClick={()=>ToggleMaterialToDisplay()} disabled={!isenabled}>

					{`${material.name}`}

			</button>

		</div>
}