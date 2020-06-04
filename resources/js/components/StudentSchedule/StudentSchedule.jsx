import React, { useState, useEffect } from 'react';
import './StudentSchedule.module.scss';

import { MaterialCard } from './MaterialCard';

import { useSelector } from 'react-redux';



const times = [8, 9, 9.30, 10, 11, 12, 12.30, 1, 2];
const days = ['حد', 'ثن', 'ثل', 'ربع', 'خمس'];


export function StudentSchedule() {
	
	const materialsInSchedule = useSelector(state => state.materials.scheduleMaterials);
	const [schedule, setSchedule] = useState({});
	
	useEffect(() => {
		let updated_schedule = {};

		for(let day of days){
			for(let time of times){
				updated_schedule[day] = {
					...updated_schedule[day],
					[time]: materialsInSchedule.filter(m => m.time_days.includes(day) &&  parseFloat(m.time_days) == time )[0] || null
				};
			}
		}

		setSchedule(updated_schedule);

	}, [materialsInSchedule]);
	

	return (
		<div className='studentSchedule'>

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
				{times.map( (t, index) =>
						<tr key={index}>
							{
									days.map( (day, index)=>
										
									<td key={index}> {day in schedule && schedule[day][t] ? 
										<MaterialCard
											materialID={schedule[day][t].id}
											materialName={schedule[day][t].name} 
											materialTime={schedule[day][t].time_days} 
										/> 
										: <pre>{null}</pre>} 
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
						{times.filter(t => t === parseInt(t)).map( (t, index) => 
								<tr key={index}>
									{
											['حد','ثل','خمس'].map( (day, index)=>
												
											<td key={index}> {day in schedule && schedule[day][t] ? 

												<MaterialCard
														materialID={schedule[day][t].id} 
														materialName={schedule[day][t].name} 
														materialTime={schedule[day][t].time_days} 
												/>

											: <pre>{null}</pre>}

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
												<MaterialCard
													materialID={schedule[day][t].id}
													materialName={schedule[day][t].name} 
													materialTime={schedule[day][t].time_days} 
												/>
											 : <pre>{null}</pre>} 
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
}

