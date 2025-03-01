// "use client";

// import { useEffect, useState } from "react";
// import { DataTable } from "./data-table";
// import { Users, columns } from "./columns";


// const TableComponent = () => {
//   const [users, setUsers] = useState<Users[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUsers = async () => {
//     try {
//       //   const response = await authClient.admin.listUsers({
//       //     query: { limit: 10 },
//       //   });

    
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Failed to fetch users. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <DataTable columns={columns} data={users} />
//     </div>
//   );
// };

// export default TableComponent;
