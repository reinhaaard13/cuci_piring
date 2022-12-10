import { ActionIcon, Menu } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { useQueryClient } from "react-query";
import axios from "../../services/axios";
import Token from "../../services/Token";

type Props = {};

const ActionMenu = (props: Props) => {
	const router = useRouter()
	const queryClient = useQueryClient()

	const handleLogout = () => {
		Token.removeToken();
		axios.defaults.headers.common["Authorization"] = "";
		router.replace("/auth")
		queryClient.clear()
	}

	return (
		<Menu shadow={"md"} width={200} position="bottom-end">
			<Menu.Target>
				<ActionIcon size={"lg"} variant="light">
					<IoEllipsisVertical />
				</ActionIcon>
			</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component={Link} href="/me">Profil Saya</Menu.Item>
        <Menu.Item color={'red'} onClick={handleLogout}>Keluar</Menu.Item>
      </Menu.Dropdown>
		</Menu>
	);
};

export default ActionMenu;
