import EventsNavigation from "./EventsNavigation";
import { Outlet } from "react-router-dom";

function RoutLayoutEvent() {
	return (
		<div>
			<EventsNavigation />
			<Outlet />
		</div>
	);
}

export default RoutLayoutEvent;
