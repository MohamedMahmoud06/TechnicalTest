import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3); // عدد ال cards اللي هتظهر في صفحة واحدة
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Retrive the data from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
      setFilteredProducts(storedProducts); // Initialize filteredProducts with all products
    }
  }, []);

  // Filter products based on category and search query
  useEffect(() => {
    let filtered = products;

    // Filter by category if selected
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search by name or category
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  // Sort products based on sortOrder
  useEffect(() => {
    let sortedProducts = [...filteredProducts];

    if (sortOrder === 'name-asc') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'name-desc') {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === 'price-asc') {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === 'price-desc') {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredProducts(sortedProducts);
  }, [sortOrder, filteredProducts]);

  // Get current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-8">
        <div className="flex justify-between mb-4">
          <Link to='/add'>
            <button className="bg-lime-500 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline">
              Add New Product
            </button>
          </Link>

          {/* Search Products by Name or Category */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or category"
            className="bg-white shadow-sm p-2 rounded-md border border-gray-300"
          />

          {/* Filter by Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white shadow-sm p-2 rounded-md border border-gray-300"
          >
            <option value="All">All Categories</option>
            <option value="cat1">cat1</option>
            <option value="cat2">cat2</option>
            <option value="cat3">cat3</option>
          </select>

          {/* Sort by Name or Price */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white shadow-sm p-2 rounded-md border border-gray-300"
          >
            <option value="">Sort by</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>

        <h2 className="text-3xl font-semibold mb-4 text-center">Product List</h2>
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-40 w-2/3 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-medium">{product.title}</h3>
                <p className="text-gray-700">Price: ${product.price}</p>
                <p className="text-gray-500">{product.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No products available.</p>
        )}

        {filteredProducts.length > productsPerPage && (
          <div className="flex justify-center mt-6">
            <ul className="inline-flex items-center -space-x-px">
              {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-2 border rounded ${
                      currentPage === i + 1
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-blue-500 border-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
