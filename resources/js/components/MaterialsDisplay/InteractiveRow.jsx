import React, { useState, useEffect } from 'react';

import { ButtonModal } from './Modal';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const InteractiveRow = ({material}) => {
	
	const [selectIndex, setSelectIndex] = useState(0);
	const [isDropDownOpen, setDropDownOpen] = useState(false);

	const [sectionsControl, setSectionsControl] = useState({useLabs: false, displaySections: material.sections});

	useEffect(()=>{
		setSectionsControl({
			useLabs: false,
			displaySections: material.sections
		});
	}, [material]);

	/* //  TODO: 

		* Clicking away from the drop-down-menu should close it!
					-> (ترقيع: onMouseLeave)

		* Think of a more user friendly way to deal with having only one option
	
	*/

	const ToggleLabs = ()=>{
		setSelectIndex(0);

		setSectionsControl({
			useLabs: !sectionsControl.useLabs,
			displaySections: !sectionsControl.useLabs ? material.lab_sections : material.sections,
		});
		
	}

	const containsLabs = material.lab_sections.length > 0;

	return (
		<tr>
			<td>
					<ButtonModal material={{
						name: material.name,
						isLab: sectionsControl.useLabs, // check if should add badge in student schedule
						...sectionsControl.displaySections[selectIndex],
					}}/>
			</td>

			<td colSpan={containsLabs ? 0 : 2}>
				<span className='material-name'>{material.name}</span>
			</td>

			
			{ //	only for materials with lab_sections
				containsLabs &&
				<td>
					<button className='switch' onClick={ToggleLabs}>
						<div className={'selected-highlight '+ (sectionsControl.useLabs ? 'left-side' : 'right-side')}></div>
						<div className='option'>مختبرات</div>

						<div className='option'>شعب المادة</div>
					</button>
				</td>
			}

			<td>
				<Dropdown className={'drop-down'+ (isDropDownOpen ? ' open' : '')} isOpen={isDropDownOpen} 
				onClick={()=>setDropDownOpen(!isDropDownOpen)}
				toggle={()=>setDropDownOpen(!isDropDownOpen)}>
					<DropdownToggle
						tag="span"
						data-toggle="dropdown"
						aria-expanded={isDropDownOpen}
					>
						<table>
							<tbody>
								<tr id={selectIndex}>
										<td>{sectionsControl.displaySections[selectIndex].instructor}</td>
										<td>{sectionsControl.displaySections[selectIndex].time_days}</td>
										<td>{sectionsControl.displaySections[selectIndex].room}</td>
								</tr>
							</tbody>
						</table>
					</DropdownToggle>

					<DropdownMenu className='drop-down-menu'>
						<table>
							<tbody>
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
						</table>
					</DropdownMenu>
				</Dropdown>

			</td>
		</tr>
	)
};