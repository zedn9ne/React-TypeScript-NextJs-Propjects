"use client";

import { ActionIcon, Center, Flex, Table } from "@mantine/core";
import { IUser } from "../01-models/userModels";
import { IconEdit, IconTrash } from "@tabler/icons-react";

function onDelete(user:IUser){

}
export interface IUsersTableProps {
  Users: IUser[],
  onDelete : (user : IUser) => void,
  onUpdate : (user : IUser) => void,
}

function UsersTable(props: IUsersTableProps) {
  const rows = props.Users.map((user, index) => (
    <Table.Tr key={index}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.lastName}</Table.Td>
      <Table.Td>{user.phoneNumber}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        <Flex columnGap={5}>
          <ActionIcon onClick={()=> {props.onUpdate(user)}}>
            <IconEdit />
          </ActionIcon>
          <ActionIcon onClick={() => {props.onDelete(user)}} bg={"red"}>
            <IconTrash/>
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Center>
        <Table.ScrollContainer
          mt={"5rem"}
          w={1000}
          minWidth={500}
          maxHeight={300}
        >
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>First Name</Table.Th>
                <Table.Th>Last Name</Table.Th>
                <Table.Th>Phone Number</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Center>
    </>
  );
}

export default UsersTable;
