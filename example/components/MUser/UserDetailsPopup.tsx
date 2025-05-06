import React from 'react';
import { Button } from '@roketid/windmill-react-ui';

const UserDetailsPopup = ({ user, onClose }: { user: { username: string; password: string }; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-1 rounded-t-lg">
          <h3 className="text-xl font-semibold">Detail User</h3>
          <Button
            className="bg-transparent text-white hover:bg-transparent hover:text-white"
            onClick={onClose}
          >
            <span className="text-white text-xl">×</span>
          </Button>
        </div>
        <div className="space-y-2 mt-4 p-3">
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
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
