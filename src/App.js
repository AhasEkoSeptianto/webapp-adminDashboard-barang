import Router from "./router.js";

// redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/redux";

const store = createStore(rootReducer);

function App() {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
}

export default App;
