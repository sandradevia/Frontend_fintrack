import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Input
} from '@roketid/windmill-react-ui';
import { EyeIcon, PlusIcon, PencilIcon as EditIcon, TrashIcon } from '@heroicons/react/24/solid';
import Layout from 'example/containers/Layout';
import PageTitle from 'example/components/Typography/PageTitle';

const userList = [
  { id: 1, username: 'Admin1', password: 'cabang1klojen' },
  { id: 2, username: 'Admin2', password: 'cabang2lowokwaru' },
  { id: 3, username: 'Admin3', password: 'cabang3junrejo' },
  { id: 4, username: 'Admin4', password: 'cabang4blimbing' },
];

const branches = [
  { id: 1, name: 'Klojen', fullName: 'Gacor Sport Center Klojen', password: 'cabang1klojen' },
  { id: 2, name: 'Lowokwaru', fullName: 'Gacor Sport Center Lowokwaru', password: 'cabang2lowokwaru' },
  { id: 3, name: 'Junrejo', fullName: 'Gacor Sport Center Junrejo', password: 'cabang3junrejo' },
  { id: 4, name: 'Blimbing', fullName: 'Gacor Sport Center Blimbing', password: 'cabang4blimbing' },
];

function UserTable() {
  const [data, setData] = useState(userList);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userList);
  const [selectedUser, setSelectedUser] = useState<{ id: number; username: string; password: string } | null>(null);
  const [editingUser, setEditingUser] = useState<{ id: number; username: string; password: string } | null>(null);
  const [deletingUser, setDeletingUser] = useState<{ id: number; username: string } | null>(null);
  const [addingUser, setAddingUser] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<{ username: string, password: string, branchId: number }>({
    username: '',
    password: '',
    branchId: 0
  });

  const resultsPerPage = 10;

  useEffect(() => {
    const filtered = userList.filter((user) =>
      user.username.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredUsers(filtered);

    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    setData(filtered.slice(startIndex, endIndex));
  }, [searchKeyword, page]);

  const cancelEdit = () => { setEditingUser(null); };
  const saveEdit = () => {
    if (!editingUser) return;
    const updatedList = userList.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setData(updatedList.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    setEditingUser(null);
  };

  const viewUserDetails = (user: { id: number; username: string; password: string }) => {
    setSelectedUser(user);
  };

  const closeUserDetails = () => {
    setSelectedUser(null);
  };

  const handleEditClick = (user: { id: number; username: string; password: string }) => {
    setEditingUser({ ...user });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingUser) return;
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const confirmDeleteUser = (user: { id: number; username: string }) => { setDeletingUser(user); };
  const cancelDelete = () => { setDeletingUser(null); };
  const deleteUser = () => {
    if (!deletingUser) return;
    const filtered = userList.filter((user) => user.id !== deletingUser.id);
    setData(filtered.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    setDeletingUser(null);
  };

  const handleAddUser = () => {
    if (newUser.username && newUser.password && newUser.branchId !== 0) {
      const newUserId = userList.length + 1;
      const branch = branches.find((b) => b.id === newUser.branchId);
      const newUserData = {
        ...newUser,
        id: newUserId,
        username: `Admin${newUserId}`,
        password: branch ? branch.password : '',
      };
      userList.push(newUserData);
      setData(userList.slice((page - 1) * resultsPerPage, page * resultsPerPage));
      setAddingUser(false);
      setNewUser({ username: '', password: '', branchId: 0 });
    }
  };

  return (
    <Layout>
      <PageTitle>Manajemen User</PageTitle>

      <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">List User</h3>
        <Button
          size="small"
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-2"
          onClick={() => setAddingUser(true)}
        >
          <PlusIcon className="w-4 h-4" /> <span>Tambah User</span>
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-b-lg overflow-x-auto">
        <div className="p-4">
          <Input
            placeholder="🔍 Search User"
            className="w-1/3 mb-4"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <tr className="bg-indigo-100">
                <TableCell>ID</TableCell>
                <TableCell>USERNAME</TableCell>
                <TableCell>PASSWORD</TableCell>
                <TableCell>NAMA CABANG</TableCell>
                <TableCell>AKSI</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((user) => {
                const branch = branches.find(b => b.password === user.password);
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{branch ? branch.fullName : 'Tidak Ditemukan'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="small"
                          className="bg-blue-700 text-white"
                          onClick={() => viewUserDetails(user)}
                        >
                          <EyeIcon className="w-4 h-4 mr-1" /> Lihat
                        </Button>
                        <Button
                          size="small"
                          className="bg-yellow-400 text-black hover:bg-yellow-500"
                          onClick={() => handleEditClick(user)}
                        >
                          <EditIcon className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="small"
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => confirmDeleteUser(user)}
                        >
                          <TrashIcon className="w-4 h-4 mr-1" /> Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={filteredUsers.length}
              resultsPerPage={resultsPerPage}
              onChange={setPage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      </div>

      {/* Pop-up Add User */}
      {addingUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px]">
            <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
              <h3 className="text-lg font-bold">Tambah User</h3>
              <Button
                className="bg-transparent text-white hover:bg-transparent hover:text-white"
                onClick={() => setAddingUser(false)}
              >
                <span className="text-xl">×</span>
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block font-medium">Cabang</label>
                <select
                  className="w-full mt-1 border-gray-300 rounded-md"
                  value={newUser.branchId}
                  onChange={(e) => setNewUser({ ...newUser, branchId: Number(e.target.value) })}
                >
                  <option value={0}>-- Pilih Cabang --</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium">Username</label>
                <Input
                  name="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-medium">Password</label>
                <Input
                  name="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 p-4 border-t">
              <Button
                className="bg-red-700 text-black hover:bg-[#FF0404]"
                onClick={() => setAddingUser(false)}
              >
                Batal
              </Button>
              <Button
                className="bg-[#2B3674] text-white hover:bg-blue-700"
                onClick={handleAddUser}
              >
                Tambah
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Detail User */}
      {selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px]">
            <div className="flex justify-between items-center bg-[#2B3674] text-white p-1 rounded-t-lg">
              <h3 className="text-xl font-semibold">Detail User</h3>
              <Button
                className="bg-transparent text-white hover:bg-transparent hover:text-white"
                onClick={closeUserDetails}
              >
                <span className="text-white text-xl">×</span>
              </Button>
            </div>
            <div className="space-y-2 mt-4 p-3">
              <div className="flex">
                <div className="w-1/3 font-medium">Username</div>
                <div className="w-1/12">:</div>
                <div className="font-bold">{selectedUser.username}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 font-medium">Password</div>
                <div className="w-1/12">:</div>
                <div className="font-bold">{selectedUser.password}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 font-medium">Nama Cabang</div>
                <div className="w-1/12">:</div>
                <div className="font-bold">
                  {branches.find(b => b.password === selectedUser.password)?.fullName || 'Tidak Ditemukan'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Edit User */}
      {editingUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px]">
            <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
              <h3 className="text-lg font-bold">Edit User</h3>
              <Button
                className="bg-transparent text-white hover:bg-transparent hover:text-white"
                onClick={cancelEdit}
              >
                <span className="text-xl">×</span>
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block font-medium">Cabang</label>
                <select
                  className="w-full mt-1 border-gray-300 rounded-md"
                  value={newUser.branchId}
                  onChange={(e) => setNewUser({ ...newUser, branchId: Number(e.target.value) })}
                >
                  <option value={0}>-- Pilih Cabang --</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.fullName}
                    </option>
                  ))}
                  <option value="">-- Pilih Cabang --</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium">Username</label>
                <Input
                  name="username"
                  value={editingUser.username}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label className="block font-medium">Password</label>
                <Input
                  name="password"
                  value={editingUser.password}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 p-4 border-t">
              <Button
                className="bg-red-700 text-black hover:bg-[#FF0404]"
                onClick={cancelEdit}
              >
                Batal
              </Button>
              <Button
                className="bg-[#2B3674] text-white hover:bg-blue-700"
                onClick={saveEdit}
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Delete User */}
      {deletingUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px]">
            <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
              <h3 className="text-lg font-bold">Hapus User</h3>
              <Button
                className="bg-transparent text-white hover:bg-transparent hover:text-white"
                onClick={cancelDelete}
              >
                <span className="text-xl">×</span>
              </Button>
            </div>
            <div className="p-4">
              <p>Apakah Anda yakin ingin menghapus pengguna {deletingUser.username}?</p>
            </div>
            <div className="flex justify-end space-x-2 p-4 border-t">
              <Button
                className="bg-gray-500 text-white hover:bg-gray-700"
                onClick={cancelDelete}
              >
                Batal
              </Button>
              <Button
                className="bg-red-700 text-white hover:bg-red-800"
                onClick={deleteUser}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default UserTable;
