import React, { Fragment } from "react";

import Chart from "chart.js";

import axios from "axios";

class pie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			semua_data: [],
			semua_tanggal: [],
			semua_pencapaian: [],
			isLoading: true,
		};
	}

	async componentDidMount() {
		await this.get_all_data_tanggal();
		await this.get_pencapaian_penjualan();
		this.setState({ isLoading: false });
		try {
			var ctx = document.getElementById("myChart2").getContext("2d");
			var myChart2 = new Chart(ctx, {
				// The type of chart we want to create
				type: "line",

				// The data for our dataset
				data: {
					labels: this.state.semua_tanggal,
					datasets: [
						{
							label: "item terjual berdasarkan per-hari",
							backgroundColor: "rgb(255, 99, 132)",
							borderColor: "rgb(255, 99, 132)",
							data: this.state.semua_pencapaian,
						},
					],
				},

				// Configuration options go here
				options: {},
			});
		} catch (e) {
			console.log(e);
		}
	}

	get_pencapaian_penjualan = () => {
		var result = [];

		// menambahkan dari db
		this.state.semua_tanggal.forEach((all_tanggal, ke_tanggal) => {
			result.push(0);
			this.state.semua_data.forEach((all_data, jumlah_data) => {
				if (all_tanggal === all_data.tanggal) {
					result[ke_tanggal] += 1;
				}
			});
		});
		this.setState({ semua_pencapaian: result });
	};

	get_all_data_tanggal = async () => {
		let all_data = [];
		await axios
			.get("https://api-webapp-admindashboard.herokuapp.com/api")
			.then((res) => {
				all_data.push(res.data);
			});
		all_data = all_data[0];
		const unique = [
			...new Map(
				all_data.map((item) => [item["tanggal"], item])
			).values(),
		];
		let all_data_tanggal = [unique.map((res) => res.tanggal)];
		this.setState({ semua_data: all_data });
		this.setState({ semua_tanggal: all_data_tanggal[0] });
	};

	render() {
		return (
			<Fragment>
				<p>hasil penjualan</p>
				{this.state.isLoading === true ? (
					<p>wait...</p>
				) : (
					<canvas id="myChart2"></canvas>
				)}
			</Fragment>
		);
	}
}

export default pie;
