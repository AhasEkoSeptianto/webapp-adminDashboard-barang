import React from "react";

import styles from "./../../../assets/css/dashboard/view_data.module.css";

import { DataGrid } from "@material-ui/data-grid";

import { Button } from "@material-ui/core";

import axios from "axios";

import { connect } from "react-redux";

class input_data extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			all_data: [],
			tanggal_form: "",
			lokasi_form: "",
			isLoading: true,
		};
	}

	// jika props tidak ada data barang maka akan diupdate
	setupRedux = async () => {
		let all_data = [];
		await axios.get("http://localhost:8000/api").then((res) => {
			all_data.push(res.data);
		});
		this.props.setUp(all_data[0]);
		this.setState({ all_data: all_data[0] });
	};

	async componentDidMount() {
		if (this.props.data_barang.length === 0) {
			await this.setupRedux();
		} else {
			this.setState({ all_data: this.props.data_barang });
		}
		this.setState({ isLoading: false });
	}

	search = async () => {
		let tanggal = this.state.tanggal_form;
		let lokasi = this.state.lokasi_form;
		var result = [];
		await this.setupRedux();
		this.props.data_barang.forEach((value, index) => {
			if (value.tanggal === tanggal || value.lokasi === lokasi) {
				result.push(value);
			}
		});
		this.setState({ all_data: result });
	};

	render() {
		// console.log("data barang = ", this.props.data_barang);
		const columns = [
			{ field: "_id", headerName: "ID", width: 70 },
			{ field: "tanggal", headerName: "Tanggal", width: 130 },
			{ field: "item", headerName: "Kode Item", width: 130 },
			{ field: "nama_item", headerName: "Nama Item", width: 130 },
			{ field: "kode_lokasi", headerName: "Kode Lokasi", width: 130 },
			{ field: "lokasi", headerName: "Nama Lokasi", width: 130 },
			{
				field: "qty",
				headerName: "Qty Actual",
				type: "number",
				width: 130,
			},
		];

		return (
			<div className={styles.container}>
				<div className={styles.header_color}></div>
				<div className={styles.main}>
					<h1 className={styles.info_nav}>View data</h1>
					<div className={styles.filter_form}>
						<div className={styles.forms}>
							<p className={styles.para}>Tanggal</p>
							<input
								type="text"
								onChange={(e) =>
									this.setState({
										tanggal_form: e.target.value,
									})
								}
							/>
						</div>
						<div className={styles.forms}>
							<p className={styles.para}>Lokasi</p>
							<input
								type="text"
								onChange={(e) =>
									this.setState({
										lokasi_form: e.target.value,
									})
								}
							/>
						</div>
						<div className={styles.forms}>
							<Button
								variant="contained"
								color="primary"
								size="small"
								onClick={this.search}
							>
								Cari
							</Button>
							<Button
								variant="contained"
								color="primary"
								size="small"
								onClick={this.setupRedux}
							>
								Clear
							</Button>
						</div>
					</div>
					<div style={{ height: 400, width: "100%" }}>
						{this.state.isLoading === true ? (
							<p>wait...</p>
						) : (
							<DataGrid
								id="_id"
								rows={this.state.all_data}
								columns={columns}
								pageSize={5}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data_barang: state.data_barang,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUp: (data) => dispatch({ type: "setDataBarang", switch: data }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(input_data);
