import React from "react";

import {
	Box,
	Text,
	Flex,
	Button,
	Grid,
	useMantineTheme,
	Avatar,
	ActionIcon,
} from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import {HiOutlineChevronLeft} from "react-icons/hi2"
import { useQuery } from "react-query";
import { ApiResponse } from "../../types/global";
import { IFamily } from "../../models/Family";
import FamilyApi from "../../services/FamilyApi";

import getNameInitials from "../../utils/getNameInitial";
import getRandomColor from "../../utils/getRandomColor";
import FamilyMemberItem from "../molecules/FamilyMemberItem";
import { useRouter } from "next/router";

type Props = {};

const FamilyMemberList = (props: Props) => {
	const theme = useMantineTheme();

  const { query, back } = useRouter()

  const { data, isSuccess, isError, isFetching } = useQuery<
		ApiResponse<IFamily>
	>(["FamilySearch", { searchQuery: query.familyCode }], FamilyApi.getFamilyByCode);

	return (
		<Box>
			<Flex justify="space-between" align={"center"}>
        <Flex align={"baseline"}>
          <Button
            leftIcon={<HiOutlineChevronLeft />}
            size={"xs"}
            mr={theme.spacing.sm}
            variant={"subtle"}
            color={"gray"}
            onClick={() => back()}
          >Back</Button>
          <Text
            sx={(theme) => ({
              marginTop: theme.spacing.sm,
              fontWeight: 600
            })}
          >
            Anggota Keluarga
          </Text>
        </Flex>
				<Button
					sx={(theme) => ({
						marginTop: theme.spacing.sm,
					})}
					leftIcon={<IoPersonAdd />}
					size="xs"
					variant="subtle"
				>
					Tambah
				</Button>
			</Flex>

			<Grid gutter={theme.spacing.xs} pt={theme.spacing.sm}>
        { isSuccess && data.data.members.map((member) => (
          <Grid.Col md={6} key={member._id as string}>
            <FamilyMemberItem user={member as any} />
          </Grid.Col>
        ))}
			</Grid>
		</Box>
	);
};

export default FamilyMemberList;
