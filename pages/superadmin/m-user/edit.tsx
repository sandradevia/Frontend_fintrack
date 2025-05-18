import React, { useState } from 'react';
import { Button, Input, Label } from '@roketid/windmill-react-ui';

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

type EditUserModalProps = {
  user: User;
  branches: Branch[];
  onChange: (user: User) => void;
  onSave: () => void;
  onClose: () => void;
};

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  branches,
  onChange,
  onSave,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Tetap sertakan branchId lama jika tidak sedang mengubahnya
    onChange({
      ...user,
      [name]: name === 'branchId' ? Number(value) : value,
      branchId: user.branchId ?? 0,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const selectedBranch = branches.find((b) => b.id === user.branchId);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
          <h3 className="text-lg font-bold">Edit User</h3>
          <Button
            className="bg-transparent text-white hover:bg-transparent hover:text-white"
            onClick={onClose}
          >
            <span className="text-xl">×</span>
          </Button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          {/* Cabang */}
          <div>
            <Label className="block font-medium">Cabang</Label>
            <Input
              value={selectedBranch?.name}
              disabled
              className="mt-1 bg-gray-100"
            />
            {/* hidden input untuk menjaga branchId tetap tersimpan */}
            <input
              type="hidden"
              name="branchId"
              value={user.branchId ?? 0}
            />
          </div>

          {/* Username */}
          <div>
            <Label className="block font-medium">Username</Label>
            <Input
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div>
            <Label className="block font-medium">Password</Label>
            <div className="relative">
              <Input
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="mt-1"
                type={showPassword ? 'text' : 'password'}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t">
          <Button
            className="bg-red-700 text-black hover:bg-[#FF0404]"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            className="bg-[#2B3674] text-white hover:bg-blue-700"
            onClick={onSave}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
