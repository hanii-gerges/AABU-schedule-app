import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ADD_TO_SCHDULE, REMOVE_FROM_SCHDULE } from "../../Redux/actions/types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import { faPlus, faBan,faCalendarTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtonModal = ({material, selectIndex}) => {

  const [modal, setModal] = useState(false);
	const [modalInfo, setModalInfo] = useState({title: '', content:'تشرفنا'});

	const toggle = () => setModal(!modal);
	
	const dispatch = useDispatch();

	const materialsInSchedule = useSelector(state => state.materials.scheduleMaterials);

	const addToSchedule = () =>{
		const selectedTime = material.sections[selectIndex].time_days;

		if(isAlreadyScheduled()){
				console.log('MATERIAL ALREADY ADDED');
				return;
		}

		if(isTimeOccupied()){
			console.log('TIME OCCUPIED');
			return;
		}

		dispatch({
				type: ADD_TO_SCHDULE,
				payload: {...material, time_days: selectedTime}
		});

	}

	const isAlreadyScheduled = ()=>{
			return materialsInSchedule.some( _material => _material.id == material.id);
	}

	const isTimeOccupied = ()=>{
		const selectedTime = material.sections[selectIndex].time_days;
			return materialsInSchedule.some( _material => _material.time_days === selectedTime);
	}


	useEffect(() => {
		if(isAlreadyScheduled()){

			setModalInfo({
				renderBtn: <Button color="danger" onClick={toggle}>  <FontAwesomeIcon icon={faBan}/> </Button>,
				onAccept:	() => dispatch({
					type: REMOVE_FROM_SCHDULE,
					payload: material.id,
				}),

				title:'already dude المادة مضافة',
				content: " بتحب تحذفها؟ ",
			});
	
		}else if(isTimeOccupied()){

			const selectedTime = material.sections[selectIndex].time_days;
			const otherMaterial = materialsInSchedule.filter(material => material.time_days == selectedTime)[0];

			setModalInfo({
				renderBtn: <Button color="warning" onClick={toggle}> <FontAwesomeIcon icon={faCalendarTimes}/> </Button>,
				onAccept:	() => {
					dispatch({
						type: REMOVE_FROM_SCHDULE,
						payload: otherMaterial.id,
					});

					dispatch({
						type: ADD_TO_SCHDULE,
						payload: {...material, time_days: selectedTime}
					})
			},
				title:'تعارض وقت',
				content: 
					<p>
						شوف علي.. مادة ال	

						"{otherMaterial.name}"

						 وقتها بتعارض مع ال

					  	"{ material.name }"  

						بتحب تبدل المواد ببعض؟ 
						
					</p>
			});
	
		}else{

			const selectedTime = material.sections[selectIndex].time_days;

			setModalInfo({
				renderBtn: <Button color="success" onClick={toggle}> <FontAwesomeIcon icon={faPlus}/> </Button>,	
				onAccept:	() => dispatch({
					type: ADD_TO_SCHDULE,
						payload: {...material, time_days: selectedTime}
				}),
				
				title:'اضافة مادة',
				content: <p>
					  بدك اتضيف   

					 "{ material.name }" 
					 
					؟
				</p>,
			});
	
		}
	}, [materialsInSchedule, selectIndex])

	console.log(modal);

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{}</Button> */}
			{modalInfo.renderBtn}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalInfo.title}</ModalHeader>

        <ModalBody> {modalInfo.content} </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={toggle}> كنسل عالموضوع</Button>
          <Button color="primary" onClick={()=>{modalInfo.onAccept(); toggle()}}>تمام</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}



// isAlreadyScheduled() ?
					
{/* <Button color="danger" onClick={() => addToSchedule()}> 
		<FontAwesomeIcon icon={faBan}/>
</Button> */}

// :
// isTimeOccupied() ?

// <Button color="warning" onClick={() => addToSchedule()}>
// 		<FontAwesomeIcon icon={faCalendarTimes}/>
// </Button>

// : 

{/* <Button color="success" onClick={() => addToSchedule()}> 
		<FontAwesomeIcon icon={faPlus}/>
</Button> */}
