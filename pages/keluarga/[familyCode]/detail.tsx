import React from 'react'
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Head from 'next/head';

import { ApiResponse } from '../../../types/global';
import PostApi from '../../../services/PostApi';
import HeroKeluarga from '../../../components/organism/HeroKeluarga';
import FeedSection from '../../../components/organism/FeedSection';
import NewPostButton from '../../../components/atoms/NewPostButton';
import { IFamily } from '../../../models/Family';
import FamilyMemberList from '../../../components/organism/FamilyMemberList';
import LeaveFamilyButton from '../../../components/atoms/LeaveFamilyButton';

type Props = {}

const DetailKeluargaPage = (props: Props) => {
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

      <FamilyMemberList />

      <LeaveFamilyButton />
		</>
  )
}

export default DetailKeluargaPage