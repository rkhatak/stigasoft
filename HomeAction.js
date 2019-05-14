import ACTION_TYPES from './Action/ActionsType';
export const addToDo = (data) => ({
	type: ACTION_TYPES.AddTODO,payload:data	
});