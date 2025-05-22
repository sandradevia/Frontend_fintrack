import React from "react";
import { Button, Input } from "@roketid/windmill-react-ui";

type TambahBranchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newBranch: {
    branch_code: string;
    branch_name: string;
    branch_address: string;
  };
  setNewBranch: React.Dispatch<
    React.SetStateAction<{
      branch_code: string;
      branch_name: string;
      branch_address: string;
    }>
  >;
};

const TambahBranchModal: React.FC<TambahBranchModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  newBranch,
  setNewBranch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
          <h3 className="text-lg font-bold">Tambah Cabang</h3>
          <Button
            className="bg-transparent text-white hover:bg-transparent hover:text-white"
            onClick={onClose}
          >
            <span className="text-xl">×</span>
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block font-medium">Kode Cabang</label>
            <Input
              value={newBranch.branch_code}
              onChange={(e) =>
                setNewBranch({ ...newBranch, branch_code: e.target.value })
              }
              placeholder="Kode Cabang"
            />
          </div>
          <div>
            <label className="block font-medium">Nama Cabang</label>
            <Input
              value={newBranch.branch_name}
              onChange={(e) =>
                setNewBranch({ ...newBranch, branch_name: e.target.value })
              }
              placeholder="Nama Cabang"
            />
          </div>
          <div>
            <label className="block font-medium">Alamat Cabang</label>
            <Input
              value={newBranch.branch_address}
              onChange={(e) =>
                setNewBranch({ ...newBranch, branch_address: e.target.value })
              }
              placeholder="Alamat Cabang"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 p-4 border-t">
          <Button
            className="bg-red-700 text-black hover:bg-[#FF0404]"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            className="bg-[#2B3674] text-white hover:bg-blue-700"
            onClick={onSubmit}
          >
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TambahBranchModal;
