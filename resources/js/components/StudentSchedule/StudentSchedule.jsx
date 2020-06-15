import React, { useState, useEffect } from 'react';
import './StudentSchedule.module.scss';

import { useSelector } from 'react-redux';

import { MaterialCard } from './MaterialCard';

// const times = [8, 9, 9.30, 10, 11, 12, 12.30, 1, 2];
let times = new Set();
const days = ['حد', 'ثن', 'ثل', 'ربع', 'خمس'];


export const StudentSchedule = React.forwardRef((_, tableRef)=> {
	
	const materialsInSchedule = useSelector(state => state.materials.scheduleMaterials);
	const [schedule, setSchedule] = useState({});
	
	useEffect(() => {
		let updated_schedule = {};
		times.clear();
		
		for(let day of days){
				for(let m of materialsInSchedule.filter(m => m.time_days.includes(day))){
					times.add(parseInt(m.time_days));

					if(typeof updated_schedule[day] === 'undefined')
						updated_schedule[day] = [];

					updated_schedule[day].push(m);
				}
		}
		

		setSchedule(updated_schedule);
	}, [materialsInSchedule]);
	
	const compTimes = (time1, time2)=> {
		const timeOrder = [8, 9, 10, 11, 12, 1, 2, 3, 6];
		for(let time of timeOrder){
			if(time == time1) return -1;
			if(time == time2) return  1;
		}
	}

	return (
		<div className='studentSchedule' ref={tableRef}>

		<table className='singleTable'>
				
				<thead>
					<tr>
						<th> SUN </th>
						<th> MON </th>
						<th> TUE </th>
						<th> WED </th>
						<th> THR </th>
					</tr>
				</thead>

			<tbody>
				{[...times].sort((a, b)=> compTimes(a,b)).map( (t, index) =>
						<tr key={index}>
							{
									days.map( (day, index)=>
										
									<td key={index}> {day in schedule && schedule[day].some( m => t == parseInt(m.time_days)) ? 
										<MaterialCard
											material={schedule[day].filter( m => t == parseInt(m.time_days))[0]}
										/> 
										: <pre> {null} </pre>} 
									</td>
								)
							}
						</tr>
				)}
			</tbody>
			</table> 
			
			<div className='left-schedule'>
				<table>
					<thead>
						<tr>
							<th> SUN </th>
							<th> TUE </th>
							<th> THR </th>
						</tr>
					</thead>

					<tbody>
						{/* on this scheduel/table the times is filterd to only integers */}

						{[...times].sort((a, b)=> compTimes(a,b)).map( (t, index) =>
							<tr key={index}>
								{
										['حد','ثل','خمس'].map( (day, index)=>
											
										<td key={index}> {day in schedule && schedule[day].some( m => t == parseInt(m.time_days)) ? 
											<MaterialCard
												material={schedule[day].filter( m => t == parseInt(m.time_days))[0]}
											/> 
											: <pre> {null} </pre>} 
										</td>
									)
								}
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className='right-schedule'>

				<table>
					<thead>
						<tr>
							<th> MON </th>
							<th> WED </th>
						</tr>
					</thead>

					<tbody>
						{[...times].sort((a, b)=> compTimes(a,b)).map( (t, index) =>
							<tr key={index}>
								{
										['ثن','ربع'].map( (day, index)=>
											
										<td key={index}> {day in schedule && schedule[day].some( m => t == parseInt(m.time_days)) ? 
											<MaterialCard
												material={schedule[day].filter( m => t == parseInt(m.time_days))[0]}
											/> 
											: <pre> {null} </pre>} 
										</td>
									)
								}
							</tr>
						)}
						
					</tbody>
				</table>

			</div>

		</div>
	);
})


