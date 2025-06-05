import React from 'react';

interface Props {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Succès</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
