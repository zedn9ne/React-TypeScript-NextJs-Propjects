import { IUser } from "@/features/users/01-models/userModels";

import { useId } from "react";

export interface ISearchUsers {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  // searchTerm: string;
}

export const addUser = (newUser: IUser): void => {
  const usersString = localStorage.getItem("allUsers") ?? "[]";
  const users = JSON.parse(usersString);
  users.push(newUser);
  localStorage.setItem("allUsers", JSON.stringify(users));
};

export const getUserById = (userId: string): IUser | undefined => {
  const userString = localStorage.getItem("allUsers") ?? "";
  const users = JSON.parse(userString) as IUser[];
  const user = users.find((user) => user.id === userId);
  return user;
};

export const deleteUser = (userId: string): boolean => {
  const users = JSON.parse(localStorage.getItem("allUsers") ?? "[]") as IUser[];
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
  }
  localStorage.setItem("allUsers", JSON.stringify(users));
  return true;
};

export const updateUser = (updateUser: IUser): IUser | undefined => {
  const userString = localStorage.getItem("allUsers") ?? "";
  const users = JSON.parse(userString) as IUser[];
  const userIndex = users.findIndex((user) => user.id === updateUser.id);

  if (userIndex >= 0) {
    let user = users.at(userIndex);
    user = { ...updateUser };
    localStorage.setItem("allUser", JSON.stringify(user));
    return user;
  }
  return undefined;
};

export const searchUsers = (searchUser: ISearchUsers): IUser[] => {
  const userString = localStorage.getItem("allUsers") ?? "[]";
  const users = JSON.parse(userString) as IUser[];
 
  let foundedUser: IUser[] = users;

  if (searchUser.fullName) {
    foundedUser = users.filter((user) =>
      user.name.includes(searchUser.fullName!),
    );
  }

  if (searchUser.fullName) {
    foundedUser = users.filter((user) => {
      user.lastName.includes(searchUser.fullName!);
    });
  }

  if (searchUser.phoneNumber) {
    foundedUser = users.filter((user) => {
      user.phoneNumber.includes(searchUser.phoneNumber!);
    });
  }

  if (searchUser.email) {
    foundedUser = users.filter((user) => {
      user.email.includes(searchUser.email!);
    });
  }

  return foundedUser;
};
