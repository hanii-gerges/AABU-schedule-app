import { ADD_TO_DISPLAY, REMOVE_FROM_DISPLAY } from "../actions/types";
import { ADD_TO_SCHDULE, REMOVE_FROM_SCHDULE } from "../actions/types";
import { CLEAR_SCHDULE } from "../../Redux/actions/types";

const initialState = {
	displayMaterials: [],
	scheduleMaterials: [],
};

/*
 * ADD: 		action.payload is a material object.
 * REMOVE: 	action.payload is just the id.
*/
export default function(state = initialState, action) {
	switch(action.type){

		case ADD_TO_DISPLAY:
			return {
				...state,
				displayMaterials: [
					...state.displayMaterials,
					action.payload
				]
			}

		case REMOVE_FROM_DISPLAY:  //! There has to be a cleaner way READ: Actions when using Redux Hooks!

			return {
				...state,
				displayMaterials: state.displayMaterials.filter( m => m.id != action.payload)
			}



		case ADD_TO_SCHDULE:
			return {
				...state,
				scheduleMaterials: [
					...state.scheduleMaterials,
					action.payload
				]
			}

		case REMOVE_FROM_SCHDULE:

			return {
				...state,
				scheduleMaterials: state.scheduleMaterials.filter( m => m.id != action.payload)
			}
		default:
			return state;

		case CLEAR_SCHDULE:
			return {
				...state,
				scheduleMaterials: [],
			}
	}

}