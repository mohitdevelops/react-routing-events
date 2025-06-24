import {
	useParams,
	json,
	useLoaderData,
	useRouteLoaderData,
	redirect,
} from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
	const data = useRouteLoaderData("event-detail");
	const events = data.event;
	return <EventItem event={events} />;
}

export default EventDetailPage;

export async function loader({ params }) {
	const id = params.eventId;
	const response = await fetch("http://localhost:8080/events/" + id);
	if (!response.ok) {
		throw new Response(
			JSON.stringify({ message: "Could not fetch details of event!" }),
			{
				status: 500,
			}
		);
	} else {
		return response;
	}
}

export async function action({ params, request }) {
	const id = params.eventId;
	const response = await fetch("http://localhost:8080/events/" + id, {
		method: request.method,
	});
	if (!response.ok) {
		throw new Response(JSON.stringify({ message: "Could not delete event!" }), {
			status: 500,
		});
	}
	return redirect("/events");
}
