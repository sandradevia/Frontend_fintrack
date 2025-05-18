import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Label } from '@roketid/windmill-react-ui';

type Cabang = {
  id: number;
  name: string;
  address: string;
  image?: File | null;
};

type EditModalProps = {
  branch: Cabang | null;
  onChange: (updatedBranch: Cabang) => void;
  onSave: () => void;
  onClose: () => void;
};

const EditBranchModal: React.FC<EditModalProps> = ({
  branch,
  onChange,
  onSave,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (branch?.image instanceof File) {
      const url = URL.createObjectURL(branch.image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [branch?.image]);

  if (!branch) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...branch, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange({ ...branch, image: file });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
          <h3 className="text-lg font-bold">Edit Cabang</h3>
          <Button
            className="bg-transparent text-white hover:bg-transparent hover:text-white"
            onClick={onClose}
          >
            <span className="text-xl">×</span>
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <Label className="block font-medium">Nama Cabang</Label>
            <Input
              name="name"
              value={branch.name}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="block font-medium">Alamat</Label>
            <Input
              name="address"
              value={branch.address}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="block font-medium">Foto Cabang</Label>
            <input
              type="file"
              accept="image/*"
              className="mt-1"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 rounded border h-32 object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 p-4 border-t">
          <Button className="bg-red-700 text-black hover:bg-[#FF0404]" onClick={onClose}>
            Batal
          </Button>
          <Button className="bg-[#2B3674] text-white hover:bg-blue-700" onClick={onSave}>
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBranchModal;
