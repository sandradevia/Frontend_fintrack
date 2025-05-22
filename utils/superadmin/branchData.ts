import axios from "lib/axios"; // atau sesuaikan dengan path axios kamu

// branchData.ts
export type Cabang = {
  id: number;
  branch_code: string;
  branch_name: string;
  branch_address: string;
};
// GET all branches
export const getBranches = async (): Promise<Cabang[]> => {
  const {data} = await axios.get("/branch");
  return data;
};

// GET single branch
export const getBranchById = async (id: number): Promise<Cabang> => {
  const {data} = await axios.get(`/branch/${id}`);
  return data;
};

// CREATE new branch
export const createBranch = async (branch: {
  branch_code: string;
  branch_name: string;
  branch_address: string;
}): Promise<Cabang> => {
  const { data } = await axios.post("/branch", branch);
  return data;
};

// UPDATE branch
export const updateBranch = async (
  id: number,
  branch: {
    branch_code: string;
    branch_name: string;
    branch_address: string;
  }
): Promise<Cabang> => {
  const { data } = await axios.put(`/branch/${id}`, branch, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Branch dari updateBranch updated:", data);
  return data;
};


// DELETE branch
export const deleteBranch = async (id: number): Promise<void> => {
  await axios.delete(`/branch/${id}`);
};
