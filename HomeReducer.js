import ACTION_TYPES from './Action/ActionsType';

const INITIAL_STATE = {	
	toDoList : [],
	loginReponse:[]
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){

		case ACTION_TYPES.LOGIN_RES:
			return {...state, loginReponse: action.payload}
		
		case ACTION_TYPES.AddTODO:
			return {...state, toDoList: action.payload}

		default:
			return state;
	}

};