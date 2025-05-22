import React, { useState } from "react";
import { Button, Input, Label, Select } from "@roketid/windmill-react-ui";


type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  branch_id: number;
  role: string;
};

type Branch = {
  id: number;
  branch_name: string;
  branch_code: string;
};

type EditUserModalProps = {
  user: User;
  branches: Branch[];
  onChange: (user: User) => void;
  onSave: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

const roleOptions = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "staff", label: "Staff" },
];

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  branches,
  onChange,
  onSave,
  onClose,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (name === "branch_id") newValue = parseInt(value);

    onChange({
      ...user,
      [name]: newValue,
    });
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isFormValid = user.name && user.email && user.branch_id && user.role;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-4 rounded-t-lg sticky top-0 z-10">
          <h3 className="text-lg font-bold">Edit User</h3>
          <button
            className="text-white hover:text-gray-300 text-xl"
            onClick={onClose}
            disabled={isLoading}
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Role */}
          <div>
            <Label className="block font-medium mb-1">Role</Label>
            <Select
              name="role"
              value={user.role}
              onChange={handleInputChange}
              className="mt-1 w-full"
              disabled={isLoading}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Branch */}
          <div>
            <Label className="block font-medium mb-1">Branch</Label>
            <Select
              name="branch_id"
              value={user.branch_id}
              onChange={handleInputChange}
              className="mt-1 w-full"
              disabled={isLoading}
            >
              <option value={0}>Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.branch_name} ({branch.branch_code})
                </option>
              ))}
            </Select>
          </div>

          {/* Name */}
          <div>
            <Label className="block font-medium mb-1">Name</Label>
            <Input
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="mt-1 w-full"
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div>
            <Label className="block font-medium mb-1">Email</Label>
            <Input
              name="email"
              type="email"
              value={user.email}
              onChange={handleInputChange}
              className="mt-1 w-full"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <Label className="block font-medium mb-1">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleInputChange}
                className="mt-1 w-full pr-10"
                disabled={isLoading}
                placeholder="Leave blank to keep current password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? (
                  <span className="text-sm">Hide</span>
                ) : (
                  <span className="text-sm">Show</span>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 8 characters. Leave blank to keep current password.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-4 border-t sticky bottom-0 bg-white">
          <Button
            layout="outline"
            className="border-red-600 text-red-600 hover:border-red-700 hover:text-red-700"
            onClick={onClose}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            className="bg-[#2B3674] hover:bg-[#1e2a5a] text-white"
            onClick={onSave}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
