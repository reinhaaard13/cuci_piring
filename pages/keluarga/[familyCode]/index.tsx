import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import NewPostButton from "../../../components/atoms/NewPostButton";
import FeedSection from "../../../components/organism/FeedSection";

import HeroKeluarga from "../../../components/organism/HeroKeluarga";
import dbConnect from "../../../lib/dbConnect";
import Family, { IFamily } from "../../../models/Family";
import FamilyApi from "../../../services/FamilyApi";
import Head from "next/head";
import { useQuery } from "react-query";
import { ApiResponse } from "../../../types/global";
import PostApi from "../../../services/PostApi";
import { useRouter } from "next/router";

type Props = {};

const KeluargaPage = (props: Props) => {
	const { query } = useRouter();

	const { data, isSuccess } = useQuery<ApiResponse<IFamily>>(
		["Family", query.familyCode],
		() => PostApi.getFamilyWithPosts(query.familyCode as string)
	);

	return (
		<>
			<Head>
				<title>{ isSuccess ? data.data.familyName : query.familyCode } | Cuci Piring</title>
			</Head>

			<HeroKeluarga />

			<FeedSection />
			<NewPostButton />
		</>
	);
};

export default KeluargaPage;
