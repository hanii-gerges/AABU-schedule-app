import React, { useState } from 'react'

//? simulates the currently selected materials' state.
const selectedMaterials = [ 
	{name: "حاسوب 2 ", time_day: " 8.00 AM- 9.00 AM  حد ثل خمس"},
	{name: "احصاء ",time_day: " 10.00 AM- 11.00 AM  حد ثل خمس"},

	{name: "ديسكريت ", time_day: " 2.00 PM- 3.30 PM  ثن ربع"},
	{name: "تنظيم اسرة ومجتمع ",time_day: " 9.30 AM- 11.00 AM  ثن ربع"},

	{name: "مختبر 2 ",time_day: " 11.00 AM- 12.00 AM  حد"},

];

const times = [8, 9, 9.30, 10, 11, 12, 12.30, 1, 2];
const days = ['حد', 'ثن', 'ثل', 'ربع', 'خمس'];

// console.log(schedule);

let init_schedule = {};
for(let day of days){
	for(let time of times){
		init_schedule[day] = {
			...init_schedule[day], 
			[time]: selectedMaterials.filter(m => m.time_day.includes(day) &&  parseFloat(m.time_day) == time )[0] || null
		};
	}
}
export function StudentSchedule() {
	
	const [schedule, setSchedule] = useState(init_schedule);

	const handleRemove = (day, time)=>{
		setSchedule({
			...schedule, 
			[day]: {...schedule[day],[time]: null},
		});
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
						{times.map( t =>
								<tr key={t}>
									{
											['حد','ثل','خمس'].map( (day)=>
											
											<td> {schedule[day][t] ? 
												<button onClick={()=>handleRemove(day, t)}>
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
						{times.map( t =>
								<tr key={t}>
									{
											['ثن','ربع'].map( (day)=>
											
											<td> {schedule[day][t] ? 
												<button onClick={()=>handleRemove(day, t)}>
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
