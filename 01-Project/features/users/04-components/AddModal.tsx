"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Center, TextInput, Flex } from "@mantine/core";
import { use, useState } from "react";
import { IUser } from "../01-models/userModels";
import { v4 as uuidV4, v4 } from "uuid";
import validator from "validator";

export interface IAddUser {
  onAddUser: (user: IUser) => void;
}

function AddModal(props: IAddUser) {
  const [user, setUser] = useState<IUser>({
    id: v4(),
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleAdd = () => {
    setUser({
      id: "",
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };

  const [errorMessage, setErrorMessage] = useState("");
  const validate = (value: string) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("");
      return true;
    } else {
      setErrorMessage(
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.",
      );
      return false;
    }
  };
  const emailValidate = (value : string) => {
    if (validator.isEmail(value , ))
  }

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="User Informations" centered>
        <Flex direction={"column"} rowGap={"lg"}>
          <TextInput
            placeholder="Big"
            label="First Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.currentTarget.value })}
          />
          <TextInput
            placeholder="Masoud"
            label="Last Name"
            value={user.lastName}
            onChange={(e) =>
              setUser({ ...user, lastName: e.currentTarget.value })
            }
          />
          <TextInput
            placeholder="+98984156987"
            type="number"
            label="Phone Number"
            value={user.phoneNumber}
            onChange={(e) =>
              setUser({ ...user, phoneNumber: e.currentTarget.value })
            }
          />
          <TextInput
            placeholder="big-e-Masoud@email.com"
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
          />
          <TextInput
            placeholder="Enter Your Password"
            label="Password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.currentTarget.value })
            }
            error={errorMessage}
          />
          <Button
            w={"5rem"}
            onClick={() => {
              if (validate(user.password)) {
                props.onAddUser(user);
                setUser({
                  name: "",
                  lastName: "",
                  phoneNumber: "",
                  email: "",
                  id: "",
                  password: "",
                });
                alert("کاربر با موفقیت اضافه شد !");
              }
            }}
          >
            Add
          </Button>
        </Flex>
      </Modal>

      <Center mt={"xl"}>
        <Button
          c="white"
          bg={"blue"}
          mt={"xl"}
          variant="default"
          onClick={open}
        >
          Add User
        </Button>
      </Center>
    </>
  );
}

export default AddModal;
