import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const ProductList = () => {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const response = await axios.get("https://test-backend-production-80b1.up.railway.app/products");
    return response.data;
  };

  const { data } = useSWR("products", fetcher);
  if (!data) return <h1>Loading...</h1>;

  const deleteProduct = async (id) => {
    await axios.delete(`https://test-backend-production-80b1.up.railway.app/products/${id}`);
    mutate("products");
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <div className="relative shadow rounded-lg mt-3">
          <Link
            to="/add"
            className="bg-blue-300 hover:bg-blue-500 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add New
          </Link>
          <table className="w-full text-sm text-left text-pink-500 mt-2">
            <thead className="text-xs text-pink-700 uppercase bg-pink-200">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr className="bg-white border-b" key={product.id}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6 font-medium text-pink-900">
                    {product.name}
                  </td>
                  <td className="py-3 px-6">{product.price}</td>
                  <td className="py-3 px-1 text-center">
                    <Link
                      to={`/edit/${product.id}`}
                      className="font-medium bg-purple-300 hover:bg-purple-500 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="font-medium bg-red-300 hover:bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
