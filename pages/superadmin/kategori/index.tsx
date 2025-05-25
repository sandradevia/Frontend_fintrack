// File: pages/superadmin/kategori/page.tsx
import React, { useEffect, useState } from "react";
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
} from "@roketid/windmill-react-ui";
import {
  EyeIcon,
  PlusIcon,
  PencilIcon as EditIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Layout from "example/containers/Layout";
import PageTitle from "example/components/Typography/PageTitle";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "utils/superadmin/categoryData";
import AddCategoryModal from "./tambah";
import EditCategoryModal from "./edit";
import DetailCategoryModal from "./detail";
import DeleteCategoryModal from "./delete";

type Category = {
  id: number;
  category_name: string;
  category_type: string;
};

function ManajemenKategori() {
  const [data, setData] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [addingCategory, setAddingCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState({
    category_name: "",
    category_type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const resultsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getCategories();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = data.filter((c) =>
    c.category_name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const startIndex = (page - 1) * resultsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + resultsPerPage);

  const handleAddCategory = async () => {
    try {
      await createCategory(newCategory);
      await fetchData();
      setAddingCategory(false);
      setNewCategory({ category_name: "", category_type: "" });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingCategory) return;
    setIsLoading(true);
    try {
      await updateCategory(editingCategory.id, editingCategory);
      await fetchData();
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;
    try {
      await deleteCategory(deletingCategory.id);
      await fetchData();
      setDeletingCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Layout>
      <PageTitle>Manajemen Kategori</PageTitle>

      <div className="flex justify-between items-center bg-indigo-900 text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">List Kategori</h3>
        <Button
          size="small"
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-2"
          onClick={() => setAddingCategory(true)}
        >
          <PlusIcon className="w-4 h-4" /> <span>Tambah Kategori</span>
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-b-lg overflow-x-auto">
        <div className="p-4">
          <Input
            placeholder="🔍 Cari Kategori"
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
                <TableCell>Nama Kategori</TableCell>
                <TableCell>Tipe</TableCell>
                <TableCell>Aksi</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {paginatedData.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.category_name}</TableCell>
                  <TableCell>{category.category_type}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="small"
                        className="bg-blue-700 text-white"
                        onClick={() => setSelectedCategory(category)}
                      >
                        <EyeIcon className="w-4 h-4 mr-1" /> Lihat
                      </Button>
                      <Button
                        size="small"
                        className="bg-yellow-400 text-black hover:bg-yellow-500"
                        onClick={() => setEditingCategory(category)}
                      >
                        <EditIcon className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        size="small"
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => setDeletingCategory(category)}
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
              totalResults={filtered.length}
              resultsPerPage={resultsPerPage}
              onChange={setPage}
              label="Navigasi Tabel"
            />
          </TableFooter>
        </TableContainer>
      </div>

      {addingCategory && (
        <AddCategoryModal
          category={newCategory}
          onChange={setNewCategory}
          onAdd={handleAddCategory}
          onClose={() => setAddingCategory(false)}
        />
      )}

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onChange={setEditingCategory}
          onSave={handleSaveEdit}
          onClose={() => setEditingCategory(null)}
        />
      )}

      {selectedCategory && (
        <DetailCategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryModal
          category={deletingCategory}
          onClose={() => setDeletingCategory(null)}
          onDelete={handleDeleteCategory}
        />
      )}
    </Layout>
  );
}

export default ManajemenKategori;
