import { ADD_TO_DISPLAY, REMOVE_FROM_DISPLAY } from "../actions/types";

export const AddToDisplay = (material)=> {
	return {
		type: ADD_TO_DISPLAY,
		payload: material
	}
}

export const RemoveFromDisplay = (id)=> {
	return {
		type: REMOVE_FROM_DISPLAY,
		payload: id
	}
}