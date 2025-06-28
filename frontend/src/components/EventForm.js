import {
	Form,
	useActionData,
	useNavigate,
	useNavigation,
	redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
	const data = useActionData();
	const navigate = useNavigate();
	const navigation = useNavigation();

	const isSubmitting = navigation.state === "submitting";

	function cancelHandler() {
		navigate("..");
	}

	return (
		<Form method={method} className={classes.form}>
			{data && data.errors && (
				<ul>
					{Object.values(data.errors).map((err) => (
						<li key={err}>{err}</li>
					))}
				</ul>
			)}
			<p>
				<label htmlFor="title">Title</label>
				<input
					required
					id="title"
					type="text"
					name="title"
					defaultValue={event ? event.title : ""}
				/>
			</p>
			<p>
				<label htmlFor="image">Image</label>
				<input
					required
					id="image"
					type="url"
					name="image"
					defaultValue={event ? event.image : ""}
				/>
			</p>
			<p>
				<label htmlFor="date">Date</label>
				<input
					required
					id="date"
					type="date"
					name="date"
					defaultValue={event ? event.date : ""}
				/>
			</p>
			<p>
				<label htmlFor="description">Description</label>
				<textarea
					required
					id="description"
					name="description"
					rows="5"
					defaultValue={event ? event.description : ""}
				/>
			</p>
			<div className={classes.actions}>
				<button type="button" onClick={cancelHandler}>
					Cancel
				</button>
				<button disabled={isSubmitting}>
					{isSubmitting ? "Submitting" : "Submit"}
				</button>
			</div>
		</Form>
	);
}

export default EventForm;

export async function action({ request, params }) {
	const method = request.method;
	const data = await request.formData();
	const inputData = {
		title: data.get("title"),
		image: data.get("image"),
		date: data.get("date"),
		description: data.get("description"),
	};
	let apiUrl = "http://localhost:8080/events/";
	if (method === "PATCH") {
		apiUrl = "http://localhost:8080/events/" + params.eventId;
	}
	const response = await fetch(apiUrl, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inputData),
	});

	if (response.status === 422) {
		return response;
	}

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
