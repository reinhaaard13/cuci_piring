import { Divider } from "@mantine/core"
import NewFeedButton from "../components/atoms/NewFeedButton";
import CreateKeluargaForm from "../components/molecules/CreateKeluargaForm";
import JoinKeluargaForm from "../components/molecules/JoinKeluargaForm";
import FeedSection from "../components/organism/FeedSection";
import Header from "../components/organism/Header";
import Hero from "../components/organism/Hero";

export default function Home() {
	return (
		<>
			<Hero />
			<JoinKeluargaForm />
			<Divider label="atau" labelPosition="center" my={"xs"} />
			<CreateKeluargaForm />
		</>
	);
}
