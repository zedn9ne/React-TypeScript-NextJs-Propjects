"use client";

import { useEffect, useRef, useState } from "react";
import { IUser } from "../01-models/userModels";
import AddModal from "../04-components/AddModal";
import UsersTable from "../04-components/UsersTable";
import DeleteUserModal, {
  IDeleteUserModalRef,
} from "../04-components/DeleteUserModal";
import { addUser, deleteUser, searchUsers } from "../03-services/userServices";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  // Load Users +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const loadUsers = () => {
    const dbUsers = searchUsers({});
    setUsers([...dbUsers]);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  //   Add Users ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const handleAddUser = (addedUser: IUser) => {
    const tmp = [...users];
    tmp.push(addedUser);
    setUsers([...tmp]);

    // addUser(addedUser);
  };

  //   Update Users ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const handleUpdateUser = (updateUser: IUser) => {
    const tmp = [...users];
    const userIndex = tmp.findIndex((user) => user.id === updateUser.id);

    if (userIndex >= 0) {
      tmp[userIndex] = { ...updateUser };
    }

    setUsers([...tmp]);
  };

  //   Delete Users +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const deleteUserModalRef = useRef<IDeleteUserModalRef>(null);
  const handleDeleteUser = (deletingUser: IUser) => {
    deleteUserModalRef.current?.Open(deletingUser);
  };

  return (
    <>
      <AddModal
        onAddUser={(user: IUser) => {
          handleAddUser(user);
        }}
      />
      <UsersTable
        Users={users}
        onDelete={(user: IUser) => {
          handleDeleteUser(user);
        }}
        onUpdate={(user) => {}}
      />
      <DeleteUserModal
        ref={deleteUserModalRef}
        OnDelete={(deletingUser) => {
          const tmp = [...users];
          const userIndex = tmp.findIndex(
            (user) => user.id === deletingUser.id,
          );

          if (userIndex >= 0) {
            tmp.splice(userIndex, 1);
          }

          setUsers([...tmp]);
          deleteUser(deletingUser.id);
        }}
      />
    </>
  );
};

export default Users;
