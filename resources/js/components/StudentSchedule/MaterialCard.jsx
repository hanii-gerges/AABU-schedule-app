import React from 'react';

import { useDispatch } from 'react-redux';
import { REMOVE_FROM_SCHDULE } from "../../Redux/actions/types";

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Badge, Button } from 'reactstrap';

export const MaterialCard = ({material}) => {

	const dispatch = useDispatch();

	const handleRemove = ()=>{
		dispatch({
			type: REMOVE_FROM_SCHDULE,
			payload: material.course_id,
		});
	}

	const getTimeOnly = (str) => str.replace(new RegExp('[^\\d\\.-]', 'g'), '');

	return (
		<div className='material'>

			<button className='close-btn' onClick={()=>handleRemove()}> 
				<FontAwesomeIcon icon={faWindowClose}/>
			</button>

			{material.isLab && <Badge className='islab-badge' color="secondary">مختبر</Badge> }

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
