import React, {useState, useEffect} from 'react';

import { CLEAR_SCHDULE } from "../../Redux/actions/types";
import { useDispatch } from 'react-redux';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import { faInfoCircle, faFileImage, faTable, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './NavBar.module.scss';

import htmlToImage from 'html-to-image';
const download = require("downloadjs");

/* // TODO:
		*  Change all className -> className
*/
export const NavBar = ({table})=> {

	//? init hooks
	const [tableLayout, setTableLayout] =  useState(3);
	const dispatch = useDispatch();

	const TakeImageOfTable = ()=> {
		htmlToImage.toPng(table.current, {backgroundColor: 'white', style: {margin: '0px'}})
			.then(function (dataUrl) {
				download(dataUrl, 'my-table.png');
			})
			.catch(function (error) {
				console.error('oops, something went wrong! ', error);
		});
	}

	//?  ChangeTableLayout:
	useEffect(()=>{

		if(tableLayout == 3){

			table.current.children[0].style.display = "none";

			for(let i = 1; i < 3; ++i)
				table.current.children[i].style.display = "table";

		}
		else{
			
			for(let i = 0; i < 3; ++i){
				if(i === tableLayout)
					table.current.children[i].style.display = "table";
				else
					table.current.children[i].style.display = "none";
			}

		}
			
	}, [tableLayout]);

	return(

			<menu className='top-menu'>
					<div className='left-nav'>
							<span className='logo'> 

									{<img className='logo' src={'Assets/logo/somename.jpg'} alt='LOGO'/>}

									&nbsp;
									<h2 className='title'> AABU Schedule App </h2>
							</span>
					</div>

					<div className='right-nav'>
						
							<button className='btn'>		 مين سمير <FontAwesomeIcon icon={faInfoCircle}/> 		</button>

							<button className='btn' onClick={()=> TakeImageOfTable()}>		
									حفظ صورة <FontAwesomeIcon icon={faFileImage}/> 
							</button>

							<button className='btn' onClick={()=> setTableLayout(tableLayout => ++tableLayout%4)}>
								 تغيير نوع الجدول <FontAwesomeIcon icon={faTable}/>	
							</button>

							<button className='btn' onClick={()=> dispatch({type: CLEAR_SCHDULE}) }>
								مسح الجدول <FontAwesomeIcon icon={faTrash}/>		
							</button>

							<button className='btn'>		
									تواصل معنا
							</button>
					</div>

					
			</menu>
	);
}
