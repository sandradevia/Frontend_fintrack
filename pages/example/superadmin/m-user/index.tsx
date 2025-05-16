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
  Input,
} from '@roketid/windmill-react-ui';
import {
  EyeIcon,
  PlusIcon,
  PencilIcon as EditIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import Layout from 'example/containers/Layout';
import PageTitle from 'example/components/Typography/PageTitle';

import AddUserModal from '../m-user/tambah';
import EditUserModal from '../m-user/edit';
import DetailUserModal from '../m-user/detail';
import DeleteUserModal from '../m-user/delete';

type User = {
  id: number;
  username: string;
  password: string;
  branchId?: number;
};

const branches = [
  { id: 1, name: 'Klojen', password: 'cabang1klojen' },
  { id: 2, name: 'Lowokwaru', password: 'cabang2lowokwaru' },
  { id: 3, name: 'Junrejo', password: 'cabang3junrejo' },
  { id: 4, name: 'Blimbing',password: 'cabang4blimbing' },
];

const userList: User[] = [
  { id: 1, username: 'Admin1', password: 'cabang1klojen', branchId: 1 },
  { id: 2, username: 'Admin2', password: 'cabang2lowokwaru', branchId: 2 },
  { id: 3, username: 'Admin3', password: 'cabang3junrejo', branchId: 3 },
  { id: 4, username: 'Admin4', password: 'cabang4blimbing', branchId: 4 },
];

function ManajemenUser() {
  const [data, setData] = useState<User[]>(userList);
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(userList);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [addingUser, setAddingUser] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    username: '',
    password: '',
    branchId: 0,
  });

  const resultsPerPage = 10;

  useEffect(() => {
    const filtered = data.filter((user) =>
      user.username.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchKeyword, data]);
  const startIndex = (page - 1) * resultsPerPage;
  const paginatedData = filteredUsers.slice(startIndex, startIndex + resultsPerPage);

  const handleAddUser = () => {
    if (newUser.username && newUser.password && newUser.branchId !== 0) {
      const newUserId = userList.length + 1;
      const branch = branches.find((b) => b.id === newUser.branchId);
      const newUserData: User = {
        ...newUser,
        id: newUserId,
        username: newUser.username, 
        password: newUser.password, 
      };
      userList.push(newUserData);
  
      setFilteredUsers(userList); 
      setData(userList.slice((page - 1) * resultsPerPage, page * resultsPerPage));
      setAddingUser(false);
      setNewUser({ id: 0, username: '', password: '', branchId: 0 });
      setSearchKeyword('');
    }
  };  
  

  const handleSaveEdit = () => {
    if (!editingUser) return;
    const updatedList = userList.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setData(updatedList.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    setEditingUser(null);
  };

  const handleDeleteUser = () => {
    if (!deletingUser) return;
    const filtered = userList.filter((user) => user.id !== deletingUser.id);
    setData(filtered.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    setDeletingUser(null);
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

        <TableContainer className="max-w-[1400px] mx-auto overflow-x-[1400px] mb-10">
          <Table>
            <TableHeader>
              <tr className="bg-indigo-100">
                <TableCell>ID</TableCell>
                <TableCell>USERNAME</TableCell>
                <TableCell>PASSWORD</TableCell>
                <TableCell>CABANG</TableCell>
                <TableCell>AKSI</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((user) => {
                const branch = branches.find((b) => b.password === user.password);
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{branch ? branch.name : 'Tidak Ditemukan'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="small"
                          className="bg-blue-700 text-white"
                          onClick={() => setSelectedUser(user)}
                        >
                          <EyeIcon className="w-4 h-4 mr-1" /> Lihat
                        </Button>
                        <Button
                          size="small"
                          className="bg-yellow-400 text-black hover:bg-yellow-500"
                          onClick={() => setEditingUser(user)}
                        >
                          <EditIcon className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="small"
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => setDeletingUser(user)}
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

      {/* Pop-up Tambah User */}
      {addingUser && (
        <AddUserModal
          user={newUser}
          branches={branches}
          onChange={(user) => setNewUser(user)}
          onClose={() => setAddingUser(false)}
          onAdd={handleAddUser}
        />
      )}

      {/* Pop-up Edit User */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          branches={branches}
          onChange={setEditingUser}
          onSave={handleSaveEdit}
          onClose={() => setEditingUser(null)}
        />
      )}

      {/* Pop-up Detail User */}
      {selectedUser && (
        <DetailUserModal
          user={selectedUser}
          branches={branches}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Pop-up Hapus User */}
      {deletingUser && (
        <DeleteUserModal
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onDelete={handleDeleteUser}
        />
      )}
    </Layout>
  );
}

export default ManajemenUser;
