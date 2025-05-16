import React, { useState } from 'react';
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
import EditBranchModal from './edit';
import DetailBranchModal from './detail';
import DeleteBranchModal from './delete';
import TambahBranchModal from './tambah'; // rename agar tidak clash/confuse

type Cabang = {
  id: number;
  name: string;
  address: string;
};

const branchList: Cabang[] = [
  { id: 1, name: 'Klojen', address: 'Jl. Raya Klojen No.1' },
  { id: 2, name: 'Lowokwaru', address: 'Jl. Raya Lowokwaru No.2' },
  { id: 3, name: 'Junrejo', address: 'Jl. Raya Junrejo No.3' },
  { id: 4, name: 'Blimbing', address: 'Jl. Raya Blimbing No.4' },
];

const ManajemenCabang = () => {
  const [branches, setBranches] = useState<Cabang[]>(branchList);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<Cabang | null>(null);
  const [editingBranch, setEditingBranch] = useState<Cabang | null>(null);
  const [deletingBranch, setDeletingBranch] = useState<Cabang | null>(null);
  const [addingBranch, setAddingBranch] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', address: '' });

  const resultsPerPage = 10;

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.address) {
      const newBranchId = branches.length + 1;
      const newBranchData = { id: newBranchId, ...newBranch };
      setBranches([...branches, newBranchData]);
      setAddingBranch(false);
      setNewBranch({ name: '', address: '' });
    }
  };

  const handleEditClick = (branch: Cabang) => {
    setEditingBranch({ ...branch });
  };

  const saveEdit = () => {
    if (!editingBranch) return;
    const updatedList = branches.map((branch) =>
      branch.id === editingBranch.id ? editingBranch : branch
    );
    setBranches(updatedList);
    setEditingBranch(null);
  };

  const handleDeleteBranch = () => {
    if (!deletingBranch) return;
    const updatedList = branches.filter((branch) => branch.id !== deletingBranch.id);
    setBranches(updatedList);
    setDeletingBranch(null);
  };

  const handleViewBranch = (branch: Cabang) => {
    setSelectedBranch(branch);
  };

  return (
    <Layout>
      <PageTitle>Manajemen Cabang</PageTitle>

      <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">List Cabang</h3>
        <Button
          size="small"
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-2"
          onClick={() => setAddingBranch(true)}
        >
          <PlusIcon className="w-4 h-4" /> <span>Tambah Cabang</span>
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-b-lg overflow-x-auto">
        <div className="p-4">
          <Input
            placeholder="🔍 Search Cabang"
            className="w-1/3 mb-4"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <TableContainer className="max-w-[1400px] mx-auto overflow-x-auto mb-10">
          <Table>
            <TableHeader>
              <tr className="bg-indigo-100">
                <TableCell>ID</TableCell>
                <TableCell>NAMA CABANG</TableCell>
                <TableCell>ALAMAT</TableCell>
                <TableCell>AKSI</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {branches
                .filter((branch) =>
                  branch.name.toLowerCase().includes(searchKeyword.toLowerCase())
                )
                .map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell>{branch.id}</TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.address}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="small"
                          className="bg-blue-700 text-white"
                          onClick={() => handleViewBranch(branch)}
                        >
                          <EyeIcon className="w-4 h-4 mr-1" /> Lihat
                        </Button>
                        <Button
                          size="small"
                          className="bg-yellow-400 text-black hover:bg-yellow-500"
                          onClick={() => handleEditClick(branch)}
                        >
                          <EditIcon className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="small"
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => setDeletingBranch(branch)}
                        >
                          <TrashIcon className="w-4 h-4 mr-1" /> Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={branches.length}
              resultsPerPage={resultsPerPage}
              onChange={setPage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      </div>

      {/* Tambah */}
      <TambahBranchModal
        isOpen={addingBranch}
        onClose={() => setAddingBranch(false)}
        onSubmit={handleAddBranch}
        newBranch={newBranch}
        setNewBranch={setNewBranch}
      />

      {/* Edit */}
      {editingBranch && (
        <EditBranchModal
          branch={editingBranch}
          onChange={setEditingBranch}
          onSave={saveEdit}
          onClose={() => setEditingBranch(null)}
        />
      )}

      {/* Detail */}
      {selectedBranch && (
        <DetailBranchModal
          isOpen={!!selectedBranch}
          branch={selectedBranch}
          onClose={() => setSelectedBranch(null)}
        />
      )}

      {/* Hapus */}
      {deletingBranch && (
        <DeleteBranchModal
          isOpen={!!deletingBranch}
          onClose={() => setDeletingBranch(null)}
          onDelete={handleDeleteBranch}
          deletingBranch={deletingBranch}
        />
      )}
    </Layout>
  );
};

export default ManajemenCabang;
