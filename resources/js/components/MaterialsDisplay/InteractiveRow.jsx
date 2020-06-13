import React, { useState } from 'react';

import { ButtonModal } from './Modal';

export const InteractiveRow = ({material}) => {
	
	const [selectIndex, setSelectIndex] = useState(0);
	const [isDropDownOpen, setDropDownOpen] = useState(false);

	const [sectionsControl, setSectionsControl] = useState({useLabs: false, displaySections: material.sections});

	
	/* //  TODO: 

		* Clicking away from the drop-down-menu should close it!
					-> (ترقيع: onMouseLeave)

		* Think of a more user friendly way to deal with having only one option
	
	*/

	const ToggleLabs = ()=>{
		//! TEMPORARY DOESN'T WORK BEC. OF A CHANGE IN LAB_SECTIONS' ID -> LAB_ID
		setSelectIndex(0);

		setSectionsControl({
			useLabs: !sectionsControl.useLabs,
			displaySections: !sectionsControl.useLabs ? material.lab_sections : material.sections,
		});
		
	}

	return (
		<tr id='material'>
			<td>
					<ButtonModal material={{
						name: material.name,
						isLab: sectionsControl.useLabs, // check if should add badge in student schedule
						...sectionsControl.displaySections[selectIndex],
					}}/>
			</td>

			<td>

				{ 
					//	only for materials with lab_sections
					material.lab_sections.length > 0 && 
					<button className='toggle-labs-btn' 
					onClick={ToggleLabs}> لابات؟ </button>
				}

				{material.name}

			</td>

			

			<td>
				<div id='drop-down' onClick={()=> setDropDownOpen(!isDropDownOpen)}>
						<table>
							
							<tbody>
								<tr id={selectIndex}>
										<td>{sectionsControl.displaySections[selectIndex].instructor}</td>
										<td>{sectionsControl.displaySections[selectIndex].time_days}</td>
										<td>{sectionsControl.displaySections[selectIndex].room}</td>
								</tr>
							</tbody>
						
							
							{isDropDownOpen && 
								<tbody id='drop-down-menu' onMouseLeave={()=> setDropDownOpen(false)}>
									{sectionsControl.displaySections.map(
										(_option, index)=>
											<tr key={index} onClick={()=>{setSelectIndex(index)}}>

													<td>{_option.instructor}</td>
													<td>{_option.time_days}</td>
													<td>{_option.room}</td>
													<td>{index == selectIndex ? "✔" : null}</td>

											</tr>
									)}
								</tbody>
							}

						</table>
					</div>
			</td>
		</tr>
	)
};