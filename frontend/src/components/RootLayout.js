import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";

function RootLayout() {
	return (
		<div>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default RootLayout;
