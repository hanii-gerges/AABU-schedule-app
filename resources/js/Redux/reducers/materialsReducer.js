import { ADD_TO_DISPLAY, REMOVE_FROM_DISPLAY } from "../actions/types";
import { ADD_TO_SCHDULE, REMOVE_FROM_SCHDULE } from "../actions/types";

const initialState = {
	displayMaterials: [],
	scheduleMaterials: [],
};

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
				displayMaterials: state.displayMaterials.filter( m => m.id != action.payload.id)
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
				scheduleMaterials: state.scheduleMaterials.filter( m => m.id != action.payload.id)
			}
		default:
			return state;
	}

}