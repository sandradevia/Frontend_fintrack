import React, { useState } from "react";
import { Button } from "@roketid/windmill-react-ui";
import { User, Branch } from "utils/superadmin/userData"; // sesuaikan path impor

type DetailUserModalProps = {
  user: User;
  branches: Branch[];
  onClose: () => void;
};

const DetailUserModal: React.FC<DetailUserModalProps> = ({
  user,
  branches,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Cari branch sesuai branch_id user
  const userBranch = branches.find((b) => b.id === user.branch_id);

  // Password ditampilkan dengan simbol atau bintang
  const displayPassword = showPassword ? "********" : "••••••••";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-w-[95vw]">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-4 rounded-t-lg">
          <h3 className="text-xl font-semibold">Detail Pengguna</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl"
            aria-label="Tutup modal"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          {[
            { label: "ID", value: user.id },
            { label: "Nama", value: user.name },
            { label: "Email", value: user.email },
            {
              label: "Role",
              value: user.role.replace("_", " ").toUpperCase(),
            },
            {
              label: "Cabang",
              value: userBranch ? (
                <>
                  {userBranch.branch_name}
                  {userBranch.branch_code && (
                    <span className="text-gray-500 ml-2">
                      ({userBranch.branch_code})
                    </span>
                  )}
                </>
              ) : (
                "Tidak Ditemukan"
              ),
            },
          ].map(({ label, value }) => (
            <div key={label} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3 font-medium text-gray-700">
                {label}
              </div>
              <div className="col-span-1">:</div>
              <div className="col-span-8 font-semibold">{value}</div>
            </div>
          ))}

          {/* Password */}
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-3 font-medium text-gray-700">Password</div>
            <div className="col-span-1">:</div>
            <div className="col-span-8 flex items-center gap-2">
              <span className="font-semibold">{displayPassword}</span>
              <Button
                size="small"
                layout="outline"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-xs py-1 px-2"
              >
                {showPassword ? "Sembunyikan" : "Tampilkan"}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t">
          <Button
            className="bg-[#2B3674] hover:bg-[#1e2a5a] text-white"
            onClick={onClose}
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserModal;
