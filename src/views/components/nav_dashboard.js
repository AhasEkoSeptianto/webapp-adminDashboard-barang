import React from "react";

// logo
import Boys from "./../../assets/image/boy.svg";
import Online from "./../../assets/image/online.svg";

// material-ui icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import PaymentIcon from "@material-ui/icons/Payment";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// mycss
import styles from "./../../assets/css/components/nav_dashboard.module.css";

// reacr-touter
import { Link, Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux";

// cookies js
import Cookies from "js-cookie";

class nav_dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			switch_arrow_payment: false,
			nav: true,
			redirect: false,
		};
	}

	handle_arrow_nav_kesantrian = () => {
		let id = document.getElementById("dropdown_tranksaksi");
		if (this.state.switch_arrow_payment === false) {
			this.setState({ switch_arrow_payment: true }); //pengen dipermudah tapi tidak bisa menghandle setstate
			id.setAttribute("style", "height:10%; overflow:hidden;");
		} else {
			this.setState({ switch_arrow_payment: false });
			id.setAttribute("style", "height:0px; overflow:hidden;");
		}
	};

	nav_close = () => {
		let id = document.getElementById("menu_nav");
		let all_id_paranav = [
			"para_dashboard",
			"para_tranksaksi",
			"para_logout",
			"para_users",
		];

		if (this.state.nav === true) {
			id.setAttribute("style", "width:80px;");
			this.setState({ nav: false });
			all_id_paranav.forEach((val, index) => {
				document
					.getElementById(val)
					.setAttribute("style", "width:0px; overflow:hidden");
			});
		} else {
			id.setAttribute("style", "width:230px;");
			this.setState({ nav: true });
			all_id_paranav.forEach((val, index) => {
				document
					.getElementById(val)
					.setAttribute("style", "width:100%; overflow:none;");
			});
		}
	};

	logout = () => {
		Cookies.remove("token");
		this.setState({ redirect: true });
	};

	componentDidMount() {
		// console.log("username = ", this.props.username);
		if (this.props.username === "") {
			this.props.setUname(Cookies.get("username"));
		}
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/login" />;
		}
		// variable untuk handle looping di nav
		let item_kesantrian = [
			{ text: "Input", link: "/dashboard/input-data" },
			{ text: "View", link: "/dashboard/view-data" },
		];

		return (
			<nav className={styles.menu_nav} id="menu_nav">
				{/* logo image */}
				<div className={styles.logo_container}>
					<DehazeIcon
						className={styles.logo_icons_container}
						onClick={this.nav_close}
					/>
				</div>
				{/* end logo image */}

				{/* profile navbar */}
				<div className={styles.container_profile_nav}>
					<div>
						<img
							src={Boys}
							className={styles.img_user}
							alt="none"
						/>
					</div>
					<div className={styles.info_users} id="para_users">
						<p>{this.props.username}</p>
						<div className={styles.container_online}>
							<img
								src={Online}
								className={styles.logo_online}
								alt="none"
							/>
							<p>online</p>
						</div>
					</div>
				</div>
				{/* end profile navbar */}

				{/* menu */}
				<div className={styles.container_menu_item}>
					<p>MENU</p>
				</div>
				{/* end menu */}

				{/* dashboard */}
				<Link to="/dashboard">
					<div className={styles.item_nav}>
						<DashboardIcon className={styles.icon_nav} />
						<p className={styles.para_nav} id="para_dashboard">
							Dashboard
						</p>
					</div>
				</Link>
				{/* end dashboard */}

				{/* Tranksaksi */}
				<Link
					className={styles.link_item_nav}
					onClick={this.handle_arrow_nav_kesantrian}
				>
					<div className={styles.item_nav}>
						<PaymentIcon className={styles.icon_nav} />
						<p className={styles.para_nav} id="para_tranksaksi">
							Tranksaksi
						</p>
						<div className={styles.container_arrow}>
							{this.state.switch_arrow_payment === false ? (
								<KeyboardArrowLeftIcon
									className={styles.arrow_nav}
								/>
							) : (
								<KeyboardArrowDownIcon
									className={styles.arrow_nav}
								/>
							)}
						</div>
					</div>
					{/* dropdown here */}
					<ul
						className={styles.drop_down_nav}
						id="dropdown_tranksaksi"
					>
						{item_kesantrian.map((res) => (
							<Link
								className={styles.link_item_nav}
								to={res.link}
							>
								<li className={styles.list_item_dropdown}>
									<RadioButtonUncheckedIcon
										className={styles.img_item_nav}
									/>
									<span>{res.text}</span>
								</li>
							</Link>
						))}
					</ul>
					{/* end dropdown here */}
				</Link>
				{/* end Tranksaksi */}
				<Link
					to="/dashboard"
					className={styles.link_item_nav_logout}
					onClick={this.logout}
				>
					<div className={styles.item_nav}>
						<ExitToAppIcon className={styles.icon_nav} />
						<p className={styles.para_nav} id="para_logout">
							Logout
						</p>
					</div>
				</Link>
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUname: (name) => dispatch({ type: "IsLogged", switch: name }),
		Logout: () => dispatch({ type: "IsLogged", switch: "" }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(nav_dashboard);
