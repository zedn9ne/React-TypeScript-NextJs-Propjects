import { IUser } from "@/features/users/01-models/userModels";
import validator from "validator";

import { useId } from "react";

function getUsersFromLocalStorage() {
  const usersString = localStorage.getItem("allUsers") ?? "[]";
  const users = JSON.parse(usersString) as IUser[];
  return users;
}
function saveUsersToLocalStorage(users: IUser[]) {
  localStorage.setItem("allUsers", JSON.stringify(users));
}

export interface ISearchUsers {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  // searchTerm: string;
}

export const addUser = (newUser: IUser): void => {
  const users = getUsersFromLocalStorage();
  users.push(newUser);
  saveUsersToLocalStorage(users);
};

export const getUserById = (userId: string): IUser | undefined => {
  const users = getUsersFromLocalStorage();

  const user = users.find((user) => user.id === userId);
  return user;
};

export const deleteUser = (userId: string): boolean => {
  const users = getUsersFromLocalStorage();

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
  }
  saveUsersToLocalStorage(users);
  return true;
};

export const updateUser = (updateUser: IUser): IUser | undefined => {
  const users = getUsersFromLocalStorage();

  const userIndex = users.findIndex((user) => user.id === updateUser.id);

  if (userIndex >= 0) {
    let user = users.at(userIndex);
    user = { ...updateUser };
    saveUsersToLocalStorage(users);
    return user;
  }
  return undefined;
};

export const searchUsers = (searchUser: ISearchUsers): IUser[] => {
  const users = getUsersFromLocalStorage();

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

export const isValidate = (user: IUser): void => {
  if (validator.isLength(user.name, { max: 2 })) {
    const message = "Incorrect";
  }
  if (validator.isLength(user.lastName, { max: 2 })) {
    const message = "Incorrect";
  }
  if (validator.isMobilePhone(user.phoneNumber, "ir-IR")) {
    const correctMessage = "Correct";
  } else {
    const incorrectMessage = "Incorrect";
  }
  if (validator.isEmail(user.email)) {
    const correctMessage = "Correct";
  } else {
    const incorrectMessage = "Incorrect";
  }
  if (
    validator.isStrongPassword(user.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    const correctMessage = "Correct";
  } else {
    const incorrectMessage = "Incorrect";
  }
};
