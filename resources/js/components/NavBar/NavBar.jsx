import React, {useState, useEffect} from 'react';

import { CLEAR_SCHDULE } from "../../Redux/actions/types";
import { useDispatch } from 'react-redux';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import { faInfoCircle, faFileImage, faTable, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './NavBar.module.scss';

import htmlToImage from 'html-to-image';
const download = require("downloadjs");


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

			<menu id='top-menu'>
					<div id='left-nav'>
							<span id='logo'> 

									{<img id='logo' src={'Assets/logo/somename.jpg'} alt='LOGO'/>}

									&nbsp;
									<h2 id='title'> AABU Schedule App </h2>
							</span>
					</div>

					<div id='right-nav'>
						
							<button id='btn'>		 مين سمير <FontAwesomeIcon icon={faInfoCircle}/> 		</button>

							<button id='btn' onClick={()=> TakeImageOfTable()}>		
									حفظ صورة <FontAwesomeIcon icon={faFileImage}/> 
							</button>

							<button id='btn' onClick={()=> setTableLayout(tableLayout => ++tableLayout%4)}>
								 تغيير نوع الجدول <FontAwesomeIcon icon={faTable}/>	
							</button>

							<button id='btn' onClick={()=> dispatch({type: CLEAR_SCHDULE}) }>
								مسح الجدول <FontAwesomeIcon icon={faTrash}/>		
							</button>

							<button id='btn'>		
									تواصل معنا
							</button>
					</div>

					
			</menu>
	);
}
