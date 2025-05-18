// pages/example/superadmin/m-cabang/tambah.tsx
import React from 'react';
import { Button, Input } from '@roketid/windmill-react-ui';

type TambahModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newBranch: { name: string; address: string; image?: File | null };
  setNewBranch: React.Dispatch<React.SetStateAction<{ name: string; address: string; image?: File | null }>>;
};

const AddBranch: React.FC<TambahModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  newBranch,
  setNewBranch,
}) => {
  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewBranch({ ...newBranch, image: file });
  };

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
            <label className="block font-medium">Nama Cabang</label>
            <Input
              value={newBranch.name}
              onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium">Alamat</label>
            <Input
              value={newBranch.address}
              onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium">Gambar Cabang</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 p-4 border-t">
          <Button className="bg-red-700 text-black hover:bg-[#FF0404]" onClick={onClose}>
            Batal
          </Button>
          <Button className="bg-[#2B3674] text-white hover:bg-blue-700" onClick={onSubmit}>
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBranch;
