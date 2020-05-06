import React, { useState } from 'react'

 export const Dropdown = React.forwardRef(({options}, ref) => {
	 const [selectValue, setSelectValue] = useState(0);
	 const [isOpen, setOpen] = useState(false);

	
	/* //  TODO: 

		* Clicking away from the drop-down-menu should close it!

		* Think of a more user friendly way to deal with having only one option
	
	*/

	return (
		<div id='drop-down' onClick={()=> setOpen(!isOpen)}>
			<table>
				
				<tbody>
					<tr id={selectValue} ref={ref}>
							<td>{options[selectValue].instructor}</td>
							<td>{options[selectValue].time_days}</td>
							<td>{options[selectValue].room}</td>
					</tr>
				</tbody>
			
				
				{isOpen && 
					<tbody id='drop-down-menu'>
						{options.map(
							(_option, index)=>
								<tr key={index} onClick={()=>{setSelectValue(index)}}>
										<td>{_option.instructor}</td>
										<td>{_option.time_days}</td>
										<td>{_option.room}</td>
										<td>{index == selectValue ? "✔" : null}</td>
								</tr>
						)}
					</tbody>
				}

			</table>
		</div>
	)
});


// export default Dropdown;