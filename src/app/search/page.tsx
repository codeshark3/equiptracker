// import { searchUsers } from './action';
// import { useState } from 'react';

// export default function SearchPage() {
//   const [results, setResults] = useState([]);

//   async function handleSearch(formData: FormData) {
//     const searchResults = await searchUsers(formData); // Server action call
//     setResults(searchResults); // Update local state with search results
//   }

//   return (
//     <main className="p-8">
//       <h1 className="text-2xl font-bold">Search Users</h1>

//       {/* Search Form */}
//       <form action={handleSearch} className="mt-4 space-y-4">
//         <div>
//           <label htmlFor="query" className="block text-sm font-medium">
//             Search Query
//           </label>
//           <input
//             type="text"
//             id="query"
//             name="query"
//             required
//             placeholder="Enter name or email"
//             className="w-full border rounded px-2 py-1"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </form>

//       {/* Search Results */}
//       <section className="mt-6">
//         <h2 className="text-xl font-semibold">Results</h2>
//         {results.length > 0 ? (
//           <ul className="mt-4 space-y-2">
//             {results.map((user: any) => (
//               <li
//                 key={user.id}
//                 className="p-4 border rounded shadow-sm bg-gray-50"
//               >
//                 <p>
//                   <strong>Name:</strong> {user.name}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {user.email}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-4 text-gray-500">No results found.</p>
//         )}
//       </section>
//     </main>
//   );
// }
"use client";
import { searchUsers } from "./action";
import { useState } from "react";

export default function SearchPage() {
  const [results, setResults] = useState([]);

  async function handleSearch(formData: FormData) {
    const searchResults = await searchUsers(formData); // Server action call
    setResults(searchResults); // Update local state with search results
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Search Datasets</h1>

      {/* Search Form */}
      <form action={handleSearch} className="mt-4 space-y-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium">
            Search Query
          </label>
          <input
            type="text"
            id="query"
            name="query"
            required
            placeholder="Enter name or email"
            className="w-full rounded border px-2 py-1 text-black"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Search Results */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Results</h2>
        {results.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {results.map((user: any) => (
              <li
                key={user.id}
                className="rounded border bg-gray-50 p-4 text-black shadow-sm"
              >
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No results found.</p>
        )}
      </section>
    </main>
  );
}
