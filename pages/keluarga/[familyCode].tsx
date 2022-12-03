import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import NewPostButton from "../../components/atoms/NewPostButton";
import FeedSection from "../../components/organism/FeedSection";

import HeroKeluarga from "../../components/organism/HeroKeluarga";
import dbConnect from "../../lib/dbConnect";
import Family from "../../models/Family";
import FamilyApi from "../../services/FamilyApi";

type Props = {};

const KeluargaPage = (props: Props) => {
	return (
		<>
			<HeroKeluarga />

			<FeedSection />
			<NewPostButton />
		</>
	);
};

export default KeluargaPage;
