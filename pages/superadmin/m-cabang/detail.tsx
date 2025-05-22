import React from "react";
import { Button } from "@roketid/windmill-react-ui";

type DetailBranchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  branch: {
    id: number;
    branch_code: string;
    branch_name: string;
    branch_address: string;
  } | null;
};

const DetailBranchModal: React.FC<DetailBranchModalProps> = ({
  isOpen,
  onClose,
  branch,
}) => {
  if (!isOpen || !branch) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
          <h3 className="text-lg font-bold">Detail Cabang</h3>
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
            <p className="mt-1 text-gray-700">{branch.branch_code}</p>
          </div>
          <div>
            <label className="block font-medium">Nama Cabang</label>
            <p className="mt-1 text-gray-700">{branch.branch_name}</p>
          </div>
          <div>
            <label className="block font-medium">Alamat</label>
            <p className="mt-1 text-gray-700">{branch.branch_address}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 p-4 border-t">
          <Button
            className="bg-[#2B3674] text-white hover:bg-blue-700"
            onClick={onClose}
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailBranchModal;
