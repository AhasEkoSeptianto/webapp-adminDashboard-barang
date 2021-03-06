import axios from "axios";

import React from "react";

import { connect } from "react-redux";

class setupReduxData extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		console.log("from redux");
		let all_data = [];
		await axios.get("http://localhost:8000/api").then((res) => {
			all_data.push(res.data);
		});
		console.log("from redux = ", all_data);
		this.props.setData(all_data);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setData: (data) => dispatch({ type: "setDataBarang", switch: data }),
	};
};
export default connect(mapDispatchToProps)(setupReduxData);
