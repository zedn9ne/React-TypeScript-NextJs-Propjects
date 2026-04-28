import { IUser } from "@/features/users/01-models/userModels";
import { Button, Modal, Text } from "@mantine/core";
import { forwardRef, useImperativeHandle, useState } from "react";

export interface IDeleteUserModalProps {
  OnDelete: (user: IUser) => void;
}
export interface IDeleteUserModalRef {
  Open: (user: IUser) => void;
}

const DeleteUserModal = forwardRef<IDeleteUserModalRef, IDeleteUserModalProps>(
  (props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>();
    useImperativeHandle(ref, () => {
      return {
        Open: (user: IUser) => {
          setOpen(true);
          setUser(user);
        },
      };
    });

    return (
      <Modal
        opened={open}
        onClose={() => {
          setOpen(false);
          setUser(undefined);
        }}
      >
        <Text>{`حذف شود؟ ${user?.name}`}</Text>

        <Button
          onClick={() => {
            if (user) {
              props.OnDelete(user);
              setOpen(false)
            }
          }}
        >
          Del
        </Button>
      </Modal>
    );
  },
);

export default DeleteUserModal;
