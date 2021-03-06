import React from "react";

// nav dashboard
import Navdashboard from "./../components/nav_dashboard";

// mycss
import styles from "./../../assets/css/layout/dashboard.module.css";

import { Switch, Route } from "react-router-dom";

import Home_dasboard from "./dashboard/home";
import Input_data from "./dashboard/input_data";
import View_data from "./dashboard/view_data";

// cookie js
import Cookies from "js-cookie";

// ({ match });
class dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match,
		};
	}
	componentDidMount() {
		var cookie = Cookies.get("token");
		if (!cookie) {
			window.location.href = "/login";
		} else {
			document
				.getElementById("main_router")
				.setAttribute("style", "height:100%;overflow:none");
		}
	}
	render() {
		return (
			<div className={styles.container} id="main_router">
				<Navdashboard />
				<Switch>
					<Route
						path={this.state.id.url}
						exact={true}
						component={Home_dasboard}
					/>
					<Route
						path={`${this.state.id.url}/input-data`}
						exact={true}
						component={Input_data}
					/>
					<Route
						path={`${this.state.id.url}/view-data`}
						exact={true}
						component={View_data}
					/>
				</Switch>
			</div>
		);
	}
}

export default dashboard;
