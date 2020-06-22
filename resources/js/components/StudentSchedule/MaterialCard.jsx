import React from 'react';

import { useDispatch } from 'react-redux';
import { RemoveFromSchdule } from "../../Redux/actions/schduleActions";

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Badge } from 'reactstrap';

export const MaterialCard = ({material}) => {

	const dispatch = useDispatch();
	
	const getTimeOnly = (str) => str.replace(new RegExp('[^\\d\\.-]', 'g'), '');

	const handleRemove = ()=>{
		dispatch(RemoveFromSchdule(material.course_id));
	}

	const applyFadeEffect = ()=>{
		const arrOfMaterialCopies = document.getElementsByClassName(`MATCARD-${material.course_id}`);

		for(let materialCard of arrOfMaterialCopies)
			materialCard.style.background = 
			"repeating-linear-gradient( 45deg, #19a83d, #19a83d 10px, #14802f 10px, #14802f 20px)";
		
	}

	const removeFadeEffect = () =>{
		const arrOfMaterialCopies = document.getElementsByClassName(`MATCARD-${material.course_id}`);

		for(let materialCard of arrOfMaterialCopies)
			materialCard.style.background = '#19a83d';
		
	}

	return (
		<div className={'material ' + `MATCARD-${material.course_id}`} >

			<button className='close-btn' onClick={handleRemove} 
				onMouseEnter={applyFadeEffect} onMouseLeave={removeFadeEffect}> 
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
