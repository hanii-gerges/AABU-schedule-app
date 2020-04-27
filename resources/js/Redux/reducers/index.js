import { combineReducers } from "redux";
import materialsReducer from "./materialsReducer";


export default combineReducers({
	materials: materialsReducer,
});