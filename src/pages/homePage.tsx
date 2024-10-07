import React, { FC, useEffect, useState, MouseEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProtectedRoute from "./ProtectedRoute";

type Products = {
  id: number;
  name: string;
  description: string;
  price: string;
};

const HomePage: FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [productDeleted, setProductDeleted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
      setProductDeleted(false);
    };

    if (productDeleted) {
      fetchProducts();
    }
  }, [productDeleted]);

  const handleEdit = (event: MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation();
    setEditProductId(id);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    event.stopPropagation();
    const { name, value } = event.target;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [name]: value } : product
      )
    );
  };

  const handleUpdate = async (
    event: MouseEvent,
    id: number,
    data: Products
  ) => {
    event.stopPropagation();
    const editeddata = {
      name: data.name,
      description: data.description,
      price: data.price,
    };
    await axios
      .put(`http://localhost:3000/api/products/${id}`, editeddata)
      .then(() => {
        setEditProductId(null);
      });
  };

  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleDelete = async (event: MouseEvent, id: number) => {
    event.stopPropagation();
    await axios.delete(`http://localhost:3000/api/products/${id}`).then(() => {
      setProductDeleted(true);
    });
  };

  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    router.push("/login");
  };

  return (

     <ProtectedRoute>
      <>
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <button
        style={{
          margin: 10,
          padding: 10,
          borderRadius: 30,
          border: "1px solid green",
          backgroundColor: "green",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => router.push("/postProduct")}
      >
        add Product
      </button>
      <button
            onClick={logout}
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 30,
              border: "1px solid #ff4d4d",
              backgroundColor: "#ff4d4d",
              color: "#fff",
              cursor: "pointer",
            }}
        >
            Logout
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
              flexBasis: "23%",
              maxWidth: "23%",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/${item.id}`)}
          >
            {editProductId === item.id ? (
              <input
                name="name"
                value={item.name}
                onChange={(e) => handleChange(e, item.id)}
                onClick={handleInputClick}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            ) : (
              <h3 style={{ marginBottom: "10px", color: "#333" }}>
                {item.name}
              </h3>
            )}
            {editProductId === item.id ? (
              <input
                name="description"
                value={item.description}
                onChange={(e) => handleChange(e, item.id)}
                onClick={handleInputClick}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            ) : (
              <p style={{ color: "#777", lineHeight: "1.5" }}>
                {item.description}
              </p>
            )}
            {editProductId === item.id ? (
              <input
                name="price"
                value={item.price}
                onChange={(e) => handleChange(e, item.id)}
                onClick={handleInputClick}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            ) : (
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                $ {item.price}
              </p>
            )}

            {editProductId === item.id ? (
              <button
              style={{
                margin: 10,
                padding: 10,
                width:'100px',
                borderRadius: 30,
                border: "1px solid green",
                backgroundColor: "green",
                color: "#fff",
                cursor: "pointer",
              }}
                onClick={(e) => handleUpdate(e, item.id, item)}
              >
                Update
              </button>
            ) : (
              <button
              style={{
                margin: 10,
                padding: 10,
                width:'100px',
                borderRadius: 30,
                border: "1px solid skyblue",
                backgroundColor: "skyblue",
                color: "#fff",
                cursor: "pointer",
              }}
                onClick={(e) => handleEdit(e, item.id)}
              >
                Edit
              </button>
            )}
            <button 
            style={{
              margin: 10,
              padding: 10,
              width:'100px',
              borderRadius: 30,
              border: "1px solid red",
              backgroundColor: "red",
              color: "#fff",
              cursor: "pointer",
            }} onClick={(e) => handleDelete(e, item.id)}>Delete</button>
          </div>
        ))}
        
      </div>
      </>
     </ProtectedRoute>
  );
};

export default HomePage;
