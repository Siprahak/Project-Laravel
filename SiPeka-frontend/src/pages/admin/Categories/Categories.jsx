import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { deleteCategory, getCategories, createCategory, updateCategory } from "../../../_services/category"; 

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(""); // Unified state for category name
  const [updateMode, setUpdateMode] = useState(false);
  const [updateCategoryId, setUpdateCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (category_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      try {
        await deleteCategory(category_id);
        setCategories(categories.filter((category) => category.category_id !== category_id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (updateMode) {
      // Update category
      if (updateCategoryId !== null) {
        try {
          const updatedCategory = await updateCategory(updateCategoryId, { name: categoryName });
          setCategories(categories.map(category =>
            category.category_id === updateCategoryId ? updatedCategory : category
          ));
          resetForm(); // Reset form and clear search
        } catch (error) {
          console.error("Error updating category:", error);
        }
      }
    } else {
      // Create new category
      if (categoryName) {
        try {
          const createdCategory = await createCategory({ name: categoryName });
          setCategories([...categories, createdCategory]);
          resetForm(); // Reset form and clear search
        } catch (error) {
          console.error("Error creating category:", error);
        }
      }
    }
  };

  const resetForm = () => {
    setCategoryName(""); // Reset the input field
    setUpdateMode(false); // Exit update mode
    setUpdateCategoryId(null); // Reset update ID
    setSearchTerm(""); // Clear search term to show all categories
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categories Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <form className="mb-4 flex" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value); // Update the category name
              setSearchTerm(e.target.value); // Update search term in real-time
            }} 
            className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <button
            type="submit"
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            {updateMode ? (
              <>
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Update
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Create
              </>
            )}
          </button>
        </form>
        
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.category_id} className="border-b hover:bg-gray-100">
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        setUpdateMode(true);
                        setUpdateCategoryId(category.category_id);
                        setCategoryName(category.name); // Set the name for updating
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.category_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}