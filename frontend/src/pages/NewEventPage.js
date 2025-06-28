import EventForm from "../components/EventForm";
import { redirect } from "react-router-dom";

function NewEventPage() {
	return <EventForm method={"POST"} />;
}

export default NewEventPage;
