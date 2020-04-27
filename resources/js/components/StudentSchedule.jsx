import React, { useState, useEffect } from 'react';
import './StudentSchedule.module.scss';


import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_FROM_SCHDULE } from "../Redux/actions/types";


const times = [8, 9, 9.30, 10, 11, 12, 12.30, 1, 2];
const days = ['حد', 'ثن', 'ثل', 'ربع', 'خمس'];

// console.log(schedule);

export function StudentSchedule() {
	
	const selectedMaterials = useSelector(state => state.materials.scheduleMaterials);
	const [schedule, setSchedule] = useState({});
	
	useEffect(() => {
		let init_schedule = {};

		for(let day of days){
			for(let time of times){
				init_schedule[day] = {
					...init_schedule[day], 
					[time]: selectedMaterials.filter(m => m.time_days.includes(day) &&  parseFloat(m.time_days) == time )[0] || null
				};
			}
		}
		
		setSchedule(init_schedule);
	}, [selectedMaterials]);
	
	// console.log(schedule);
	
	const dispatch = useDispatch();
	const handleRemove = (material)=>{
		dispatch({
			type: REMOVE_FROM_SCHDULE,
			payload: material,
		});

		// setSchedule({
		// 	...schedule, 
		// 	[day]: {...schedule[day],[time]: null},
		// });
	}

	return (
		<div className='studentSchedule'>
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
						{times.map( (t, index) =>
								<tr key={index}>
									{
											['حد','ثل','خمس'].map( (day, index)=>
												
											<td key={index}> {day in schedule && schedule[day][t] ? 
												<button onClick={()=>handleRemove(schedule[day][t])}>
													{	schedule[day][t].name }
												</button> : <pre>{null}</pre>} 
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
						{times.map( (t, index) =>
								<tr key={index}>
									{
											['ثن','ربع'].map( (day, index)=>
											
											<td key={index}> {day in schedule && schedule[day][t] ? 
												<button onClick={()=>handleRemove(schedule[day][t])}>
													{	schedule[day][t].name }
												</button> : <pre>{null}</pre>} 
											</td>

										)
									}
								</tr>
						)}
					</tbody>
				</table>

			</div>
		</div>
	)
}
