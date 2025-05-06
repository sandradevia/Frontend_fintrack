import React from 'react';
import { Button } from '@roketid/windmill-react-ui';

const UserDeletePopup = ({
  user,
  onCancel,
  onDelete
}: {
  user: { id: number; username: string };
  onCancel: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[500px] rounded-lg shadow-lg border-2 border-blue-800">
        <div className="bg-blue-900 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
          <h3 className="font-bold text-lg">Hapus User</h3>
          <button onClick={onCancel} className="text-xl">×</button>
        </div>
        <div className="px-6 py-4 text-center">
          <p className="font-semibold text-lg">Apakah Anda Yakin Akan Menghapus Data User?</p>
          <p className="mt-2 font-bold">Hapus Data ID: {user.id}</p>
        </div>
        <div className="flex justify-center gap-4 px-6 pb-4">
          <Button className="bg-blue-800 hover:bg-blue-900 text-white" onClick={onCancel}>Batal</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onDelete}>Hapus</Button>
        </div>
      </div>
    </div>
  );
};

export default UserDeletePopup;
