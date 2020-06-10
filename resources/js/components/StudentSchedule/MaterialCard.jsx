import React from 'react';

import { useDispatch } from 'react-redux';
import { REMOVE_FROM_SCHDULE } from "../../Redux/actions/types";

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MaterialCard = ({material}) => {

	const dispatch = useDispatch();

	const handleRemove = ()=>{
		dispatch({
			type: REMOVE_FROM_SCHDULE,
			payload: material.id,
		});
	}

	const getTimeOnly = (str) => str.replace(new RegExp('[^\\d\\.-]', 'g'), '');

	return (
		<div className='material'>

			<button className='close-btn' onClick={()=>handleRemove()}> 
				<FontAwesomeIcon icon={faWindowClose}/>
			</button>

			<div className='material-name'>
				{/* if lab add a (lab) label */}
				<b>{material.name} </b> 
			</div> 

			<div className='material-time'>
				{getTimeOnly(material.time_days)}
			</div>

		</div> 

	);
}
