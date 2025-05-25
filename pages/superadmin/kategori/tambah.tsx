import React from "react";
import { Button, Input } from "@roketid/windmill-react-ui";

type Category = {
  category_name: string;
  category_type: string;
};

type AddCategoryModalProps = {
  category: Category;
  onChange: (category: Category) => void;
  onAdd: () => void;
  onClose: () => void;
};

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  category,
  onChange,
  onAdd,
  onClose,
}) => {
  const isDisabled = !category.category_name || !category.category_type;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-3 rounded-t-lg">
          <h3 className="text-lg font-bold">Tambah Kategori</h3>
          <button className="text-white text-xl hover:text-red-300" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block font-medium">Nama Kategori</label>
            <Input
              name="category_name"
              value={category.category_name}
              onChange={(e) => onChange({ ...category, category_name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Tipe</label>
            <Input
              name="category_type"
              value={category.category_type}
              onChange={(e) => onChange({ ...category, category_type: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 p-4 border-t">
          <Button className="bg-red-700 text-white hover:bg-red-800" onClick={onClose}>
            Batal
          </Button>
          <Button className="bg-[#2B3674] text-white hover:bg-blue-700" onClick={onAdd} disabled={isDisabled}>
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;