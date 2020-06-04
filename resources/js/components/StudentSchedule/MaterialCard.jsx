import { REMOVE_FROM_SCHDULE } from "../../Redux/actions/types";

import React from 'react';
import { useDispatch } from 'react-redux';

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MaterialCard = ({materialID, materialName, materialTime}) => {

	const dispatch = useDispatch();

	const handleRemove = ()=>{
		dispatch({
			type: REMOVE_FROM_SCHDULE,
			payload: materialID,
		});
	}

	const getTimeOnly = (str) => {
		const days = ['حد', 'ثن', 'ثل', 'ربع', 'خمس'];

		for(let day of days)
			str = str.replace(day, '');
		
		str = str.replace(new RegExp('(AM)|(PM)', 'g'), '');

		return str;
	}


	return (
		<div className='material'>

			<button className='close-btn' onClick={()=>handleRemove()}> 
				<FontAwesomeIcon icon={faWindowClose}/>
			</button>

			<div className='material-name'>
				<b> {materialName} </b> 
			</div> 

			<div className='material-time'>
				{getTimeOnly(materialTime)}
			</div>

		</div> 

	);
}
