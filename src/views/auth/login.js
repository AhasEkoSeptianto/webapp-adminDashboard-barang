import React from "react";

// mycss;
import s from "./../../assets/css/auth/login.module.css";

// icon material
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// img logo
import Logo from "./../../assets/image/login.svg";

// axios
import axios from "axios";

// router
import { Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux";

// js cookie
import Cookies from "js-cookie";

class login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			isLoading: false,
			buttonInfo: "Login",
			timer: 0,
		};
	}

	is_auth() {
		var cookies = Cookies.get("token");
		if (cookies) {
			this.setState({ redirect: true });
			return true;
		}
		return false;
	}

	validate = (item, id) => {
		if (item !== "") {
			document.getElementById(id).setAttribute("style", "border:none");
			return item;
		} else {
			document
				.getElementById(id)
				.setAttribute("style", "border:2px solid red;");
		}
	};

	changeValBtnSubmit = () => {
		let dot = "Loading";
		for (let i = 0; i <= this.state.timer; i++) {
			dot = dot + ".";
		}
		if (this.state.isLoading === true) {
			this.setState({ buttonInfo: dot });
		} else {
			this.setState({ buttonInfo: "Loading" });
		}
	};

	submitForm = (e) => {
		this.setState({ isLoading: true });
		this.update_timer = this.get_realTimer(); // update time for button

		e.preventDefault();
		let username = this.validate(e.target.username.value, "username");
		let password = this.validate(e.target.password.value, "password");

		if (username !== "" && password !== "") {
			let data = {
				username: username,
				password: password,
			};
			axios
				.post(
					"https://api-webapp-admindashboard.herokuapp.com/api/login",
					data,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then(async (response) => {
					let login = await response.data.login; // menunggu respone API db login
					//hadling user input jika user login salah maka akan show error
					let showerr = document.getElementById("wrong_user&pass");
					if (login === true) {
						this.props.Login(username); //setting username user ke redux
						this.props.setToken(response.data.token); //setting cookie pada redux
						console.log(response.data);
						Cookies.set("token", response.data.token, {
							expires: 7,
							path: "",
						});
						Cookies.set("username", response.data.username, {
							expires: 7,
							path: "",
						});
						showerr.style.display = "none";
						this.setState({ redirect: true });
					} else {
						this.setState({ isLoading: false });
						showerr.style.display = "flex";
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.log("error");
		}
	};

	get_realTimer = () => {
		setInterval(() => {
			this.changeValBtnSubmit(); // animated button when user is loggin
			if (this.state.timer === 0) {
				this.setState({ timer: 1 });
			} else if (this.state.timer === 1) {
				this.setState({ timer: 2 });
			} else {
				this.setState({ timer: 0 });
			}
		}, 1000);
	};

	componentDidMount() {
		document.getElementById("button").value = " oke";
		let is_login = this.is_auth(); //check jika user memiliki akses login
		if (is_login === true) {
			// this.props.Login(localStorage.getItem("username"));
			this.setState({ redirect: true });
		} else {
			alert(
				"untuk demo applikasi silahkan login dengan \n\nusername : admin\npassword : admin "
			);
		}
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<div className={s.bg}>
				<div className={s.container_login}>
					<div className={s.header_login}>
						<img src={Logo} className={s.img_logo} alt="none" />
						<h1 className={s.text_stikom}>Login</h1>
					</div>
					<div
						className={s.container_wrong_pass}
						id="wrong_user&pass"
					>
						<p className={s.text_wrong_pass}>
							&sdot; Login gagal, mohon periksa kembali username
							dan password yang digunakan
						</p>
					</div>
					<form
						className={s.form}
						onSubmit={this.submitForm}
						method="post"
					>
						<div className={s.username} id="username">
							<AccountCircleRoundedIcon
								className={s.logo_login}
							/>
							<input
								type="text"
								name="username"
								placeholder="username"
								onClick={this.clickUsername}
								className={s.form_user}
							/>
						</div>
						<div className={s.password} id="password">
							<LockOutlinedIcon className={s.logo_login} />
							<input
								type="password"
								name="password"
								placeholder="password"
								className={s.form_user}
							/>
						</div>
						<button className={s.button} id="button">
							{this.state.buttonInfo}
						</button>
					</form>
				</div>
			</div>
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
		Login: (user) => dispatch({ type: "IsLogged", switch: user }),
		setToken: (token) => dispatch({ type: "setToken", switch: token }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
