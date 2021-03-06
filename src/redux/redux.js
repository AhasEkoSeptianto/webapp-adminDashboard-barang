// redux

const initialState = {
	isLoading: false,
	username: "",
	token: "",
	data_barang: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case "Loading": {
			return {
				...state,
				isLoading: action.switch,
			};
		}
		case "IsLogged": {
			return {
				...state,
				username: action.switch,
			};
		}
		case "setToken": {
			return {
				...state,
				token: action.switch,
			};
		}
		case "setDataBarang": {
			return {
				...state,
				data_barang: action.switch,
			};
		}
		default: {
			console.log("err");
		}
	}
	return state;
};
export default rootReducer;
