import { Divider } from "@mantine/core";
import NewPostButton from "../components/atoms/NewPostButton";
import CreateKeluargaForm from "../components/molecules/CreateKeluargaForm";
import JoinKeluargaForm from "../components/organism/JoinKeluargaForm";
import FeedSection from "../components/organism/FeedSection";
import Header from "../components/organism/Header";
import Hero from "../components/organism/Hero";
import MyKeluargaSection from "../components/organism/MyKeluargaSection";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | Cuci Piring</title>
			</Head>
			<Hero />
			<MyKeluargaSection />

			<JoinKeluargaForm />
			<Divider label="atau" labelPosition="center" my={"xs"} />
			<CreateKeluargaForm />
		</>
	);
}
