import EventForm from "../components/EventForm";
import { redirect } from "react-router-dom";

function NewEventPage() {
	return <EventForm />;
}

export default NewEventPage;

export async function action({ request, params }) {
	const data = await request.formData();
	const inputData = {
		title: data.get("title"),
		image: data.get("image"),
		date: data.get("date"),
		description: data.get("description"),
	};
	const response = await fetch("http://localhost:8080/events/", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inputData),
	});
	if (!response.ok) {
		throw new Response(
			JSON.stringify(
				{ message: "Could not save event!" },
				{
					status: 500,
				}
			)
		);
	}

	return redirect("/events");
}
