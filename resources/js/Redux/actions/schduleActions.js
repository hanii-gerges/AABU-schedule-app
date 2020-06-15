import { ADD_TO_SCHDULE, REMOVE_FROM_SCHDULE } from "./types";

export const AddToSchdule = (material)=> {
	return {
		type: ADD_TO_SCHDULE,
		payload: material
	}
}

export const RemoveFromSchdule = (id)=> {
	return {
		type: REMOVE_FROM_SCHDULE,
		payload: id
	}
}