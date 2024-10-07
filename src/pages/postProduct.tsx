import React, { FC, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProtectedRoute from './ProtectedRoute';

const PostProduct: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.description || !formData.price) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/products', formData);
      alert('Product added successfully');
      router.push('/');
    } catch (error) {
      setError('There was an error adding the product.');
    }
  };

  return (
    <ProtectedRoute>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Add Product
        </button>
      </form>
    </div>
    </ProtectedRoute>
  );
};

export default PostProduct;
