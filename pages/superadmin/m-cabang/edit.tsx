import React from "react";
import { Button, Input, Label } from "@roketid/windmill-react-ui";

interface Cabang {
  id: number;
  branch_code: string;
  branch_name: string;
  branch_address: string;
}

interface EditModalProps {
  isOpen: boolean;
  branch: Cabang | null;
  onClose: () => void;
  onSave: () => void;
  setBranch: (branch: Cabang) => void;
}

const EditBranchModal: React.FC<EditModalProps> = ({
  isOpen,
  branch,
  onClose,
  onSave,
  setBranch,
}) => {
  if (!isOpen || !branch) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBranch({
      ...branch,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#2B3674] text-white rounded-t-lg">
          <h3 className="text-lg font-semibold">Edit Cabang</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <Label className="mb-1 block font-medium">
              Kode Cabang
            </Label>
            <Input
              id="branch_code"
              name="branch_code"
              value={branch.branch_code}
              onChange={handleInputChange}
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label className="mb-1 block font-medium">
              Nama Cabang
            </Label>
            <Input
              id="branch_name"
              name="branch_name"
              value={branch.branch_name}
              onChange={handleInputChange}
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label className="mb-1 block font-medium">
              Alamat
            </Label>
            <Input
              id="branch_address"
              name="branch_address"
              value={branch.branch_address}
              onChange={handleInputChange}
              className="mt-1 w-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-4 border-t">
          <Button
            layout="outline"
            onClick={onClose}
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            Batal
          </Button>
          <Button
            onClick={onSave}
            className="bg-[#2B3674] hover:bg-[#1e284a] text-white"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBranchModal;
