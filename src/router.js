import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./views/auth/login";
import Dashboard from "./views/layout/dashboard";

function router() {
	return (
		<Router>
			<Switch>
				<Route exact strict path="/" component={Login} />
				<Route exact strict path="/login" component={Login} />
				<Route path="/dashboard" component={Dashboard} />
			</Switch>
		</Router>
	);
}

export default router;
