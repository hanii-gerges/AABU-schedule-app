import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ADD_TO_SCHDULE, REMOVE_FROM_SCHDULE } from "../../Redux/actions/types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import { faPlus, faBan,faCalendarTimes, faRedoAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export const ButtonModal = ({material}) => {
  const [modal, setModal] = useState(false);
	const [modalInfo, setModalInfo] = useState({renderBtn: null, onAccept: null, title: '', content: ''});

	const toggle = () => setModal(!modal);
	
	const dispatch = useDispatch();

	const materialsInSchedule = useSelector(state => state.materials.scheduleMaterials);

	const isAlreadyScheduled = ()=>{
			return materialsInSchedule.some( _material => _material.course_id == material.course_id);
	}

	const isTimeOccupied = ()=>{

		const days = ['حد', 'ثن', 'ثل', 'ربع', 'خمس'];

		const getTimeOnly = (str) => str.replace(new RegExp('[^\\d\\.\\-AMP]', 'g'), '');

		const getDate = (time) => {
			let today = new Date();
			const isPM = time.includes('PM');
			const _t = time.replace(new RegExp('(AM)|(PM)', 'g'), '').split(".");

			today.setHours( (isPM ? _t[0] + 12 : _t[0])
										, _t[1], 0, 0);
			return today;
		}

		const timeOverLaps = (time1, time2) => {
			time1 = getTimeOnly(time1).split('-');
			time2 = getTimeOnly(time2).split('-');
			
			const [startTime, endTime] = [getDate(time1[0]), getDate(time1[1])];

			if( getDate(time2[0]) <= startTime && startTime < getDate(time2[1]) ||
					getDate(time2[0]) < endTime && endTime <= getDate(time2[1]) )
				return true;

			return false;
		}

		const selectedTime = material.time_days;

		const array_of_occupation = materialsInSchedule.filter( 
			otherMaterial => 
				timeOverLaps(otherMaterial.time_days, selectedTime) &&
				days.some(day => otherMaterial.time_days.includes(day) && selectedTime.includes(day))
		);

		return array_of_occupation;
	}

	const isAlreadyScheduledAtExactTime = () =>
	 	materialsInSchedule.some(mat => mat.course_id == material.course_id && mat.time_days == material.time_days);

	useEffect(() => {
		if(isAlreadyScheduledAtExactTime() || 
			isAlreadyScheduled() && isTimeOccupied().length > 0){
			setModalInfo({
				renderBtn: <Button color="danger" onClick={toggle}>  <FontAwesomeIcon icon={faBan}/> </Button>,
				onAccept:	() => dispatch({
					type: REMOVE_FROM_SCHDULE,
					payload: material.course_id,
				}),

				title:'المادة مضافة مسبقا وبنفس الموعد',
				content: <p>
				هل ترغب بحذف مادة ال 

				"{material.name}"

				من الجدول؟				
			</p>,
			});
			
		}else if(isAlreadyScheduled()){
			const otherMaterial = materialsInSchedule.filter(otherMat => otherMat.course_id == material.course_id)[0];

			setModalInfo({
				renderBtn: <Button color="primary" onClick={toggle}>  <FontAwesomeIcon icon={faRedoAlt}/> </Button>,
				onAccept:	() => {
					dispatch({
						type: REMOVE_FROM_SCHDULE,
						payload: material.course_id,
					});

					dispatch({
						type: ADD_TO_SCHDULE,
						payload: material,
					});
				},

				title:' المادة مضافة مسبقا',
				content: 
				<div>
					هل تريد تغيير وقت المادة؟
					<br/>
					من الموعد السابق 

						<p style={{direction: 'ltr'}}>
							"{ otherMaterial.time_days }"
						</p>

 							:الى	الموعد الجديد

						<p style={{direction: 'ltr'}}>
							"{ material.time_days }"  
						</p>
				</div>,
			});
	
		}else if(isTimeOccupied().length > 0){
			// const selectedTime = material.time_days;
			const otherMaterials = isTimeOccupied();
			console.log(otherMaterials);

			setModalInfo({
				renderBtn: <Button color="warning" onClick={toggle}> <FontAwesomeIcon icon={faCalendarTimes}/> </Button>,
				onAccept:	() => {

					for(let mat of otherMaterials){
						console.log(`Removing: ${mat.name}`);
						dispatch({
							type: REMOVE_FROM_SCHDULE,
							payload: mat.course_id,
						});
					}
						
					dispatch({
						type: ADD_TO_SCHDULE,
						payload: material
					})
				},

				title:'تعارض وقت',
				content: otherMaterials.length > 1 ?
					<p>
						 المادة التي تحاول اضافتها 

						"{ material.name }"

						 :وقتها بتعارض مع المواد التالية

							{	
								otherMaterials.map( (_mat)=> <b> "{_mat.name}" </b> )
							}

					  	<br/>
						هل ترغب بحذف المواد المذكورة
						لتسجيل المادة المراد تسجيلها؟ 
						
					</p> : 
					<p>
						 المادة التي تحاول اضافتها 

							"{ material.name }"

 							وقتها بتعارض مع 

							 "{otherMaterials[0].name}"

							هل ترغب بتبديل المادتين ببعضهما؟
					</p>
			});
	
		}else{
			setModalInfo({
				renderBtn: <Button color="success" onClick={toggle}> <FontAwesomeIcon icon={faPlus}/> </Button>,	
				onAccept:	() => dispatch({
					type: ADD_TO_SCHDULE,
						payload: material,
				}),
				
				title:'اضافة مادة',
				content: <p>
					  هل ترغب باضافة 
					 "{ material.name }" 
					 
					؟
				</p>,
			});
	
		}
	}, [materialsInSchedule, material]);

	

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{}</Button> */}
			{modalInfo.renderBtn}

      <Modal id='modal' isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalInfo.title}</ModalHeader>

        <ModalBody> {modalInfo.content} </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={()=>{modalInfo.onAccept(); toggle()}}>تمام</Button>{' '}
          <Button color="danger" onClick={toggle}> كنسل عالموضوع</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}