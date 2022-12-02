import { Divider } from "@mantine/core"
import NewFeedButton from "../components/atoms/NewFeedButton";
import CreateKeluargaForm from "../components/molecules/CreateKeluargaForm";
import JoinKeluargaForm from "../components/organism/JoinKeluargaForm";
import FeedSection from "../components/organism/FeedSection";
import Header from "../components/organism/Header";
import Hero from "../components/organism/Hero";
import MyKeluargaSection from "../components/organism/MyKeluargaSection";

export default function Home() {
	return (
		<>
			<Hero />
			<MyKeluargaSection />

			<JoinKeluargaForm />
			<Divider label="atau" labelPosition="center" my={"xs"} />
			<CreateKeluargaForm />
		</>
	);
}
