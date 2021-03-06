import React from "react";

// mycss
import styles from "./../../../assets/css/dashboard/home.module.css";

// char
import Piechar from "./chart/pie";
import Linechar from "./chart/line";

class home extends React.Component {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.header_color}></div>
				<div className={styles.main}>
					<h1 className={styles.info_nav}>Dashboard</h1>
					<h1 className={styles.info_grafik}>Grafik pendataan</h1>
					<div className={styles.chart_container}>
						<div className={styles.item_terjual}>
							<Linechar />
						</div>
						<div className={styles.item_terjual}>
							<Piechar />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default home;
