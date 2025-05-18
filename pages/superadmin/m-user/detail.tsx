import React, { useState } from 'react';
import { Button } from '@roketid/windmill-react-ui';


type User = {
  id: number;
  username: string;
  password: string;
  branchId?: number;
};

type Branch = {
  id: number;
  name: string;
};

type DetailUserModalProps = {
  user: User;
  branches: { id: number; name: string; password: string }[];
  onClose: () => void;
};

const DetailUserModal: React.FC<DetailUserModalProps> = ({ user, branches, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Find branch name based on the user branchId
  const branchName = branches.find(b => b.id === user.branchId)?.name || 'Tidak Ditemukan';

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
          <h3 className="text-xl font-semibold">Detail User</h3>
          <Button
            className="bg-transparent text-white hover:bg-transparent hover:text-white"
            onClick={onClose}
          >
            <span className="text-white text-xl">×</span>
          </Button>
        </div>
        <div className="space-y-4 mt-4 p-4">
          <div className="flex">
            <div className="w-1/3 font-medium">Username</div>
            <div className="w-1/12">:</div>
            <div className="font-bold">{user.username}</div>
          </div>
          <div className="flex">
            <div className="w-1/3 font-medium">Password</div>
            <div className="w-1/12">:</div>
            <div className="font-bold">{user.password}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-medium">Cabang</div>
            <div className="w-1/12">:</div>
            <div className="font-bold">{branchName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUserModal;
