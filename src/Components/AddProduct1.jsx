import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddProduct1() {
  const categories = ["cat1", "cat2", "cat3"];
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get  file 1
    const reader = new FileReader();
    
    // Convert the image file to a base64 string 2
    reader.onloadend = () => {
      setPhoto(reader.result); // Store the base64 string in state 3
    };
    
    if (file) {
      reader.readAsDataURL(file); // Read the file and trigger onloadend 4
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      img: photo, 
      title: title,
      description: desc,
      category: category,
      price: price
    };

   //return the data in the local storge 1
    const products = JSON.parse(localStorage.getItem('products')) ;

    // Add new product 2
    products.push(productData);
//save the updated array again in the local storage 3
    localStorage.setItem('products', JSON.stringify(products));

    // alert('Product saved successfully!');

    // Clear form after submission
    setPhoto('');
    setTitle('');
    setDesc('');
    setCategory(categories[0]);
    setPrice('');
  };

  return (
    <div className="mx-auto mt-8 w-3/4">
      <Link to='/home'>
    <button
              className="bg-lime-200  hover:bg-lime-300 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline "
              type="button"
              
            >
              
              Go To Product List
            </button>
          </Link>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mx-auto max-w-xs">
          <label htmlFor="img" className="mb-1 block text-sm font-medium text-gray-700">Upload Photo</label>
          <input
            id="img"
            type="file"
            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none"
            onChange={handleImageUpload}
            required
          />
        </div>

       
        {photo && <img src={photo} alt="Product Preview" className="w-1/2 h-40 object-cover mt-4" />}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button
          className="bg-lime-200 hover:bg-lime-300 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          Add!
        </button>
      </form>
    </div>
  );
}
