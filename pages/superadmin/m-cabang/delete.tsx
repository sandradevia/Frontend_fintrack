import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "@roketid/windmill-react-ui";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  branch: { id: number; branch_name: string } | null;
};

const DeleteBranchModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  branch,
}) => {
  if (!branch) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        Apakah kamu yakin ingin menghapus cabang <strong>{branch.branch_name}</strong>?
      </ModalBody>
      <ModalFooter>
        <Button layout="outline" onClick={onClose}>
          Batal
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={onDelete}
        >
          Hapus
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteBranchModal;
