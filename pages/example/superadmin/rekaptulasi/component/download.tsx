import React from 'react';
import { Button } from '@roketid/windmill-react-ui';

interface DownloadModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ title, message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end">
        <Button className="bg-gray-400 hover:bg-gray-500 text-white" onClick={onClose}>
          Tutup
        </Button>
      </div>
    </div>
  </div>
);

export default DownloadModal;
