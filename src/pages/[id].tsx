import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

type Products = {
    id  : number
    name : string 
    description : string 
    price : string 
  }

const ProductPage:FC = () => {
    const router = useRouter()
    const {id} = router.query

    const [products, setProducts] = useState<Products>()

    useEffect(() => {
      const fetchProducts = async() => {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`)
        setProducts(response.data)
      }
  
      fetchProducts()
    },[])

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '40px',
    }}
  >
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        width: '300px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <h3 style={{ marginBottom: '10px', color: '#333' }}>{products?.name}</h3>
      <p style={{ fontStyle: 'italic', color: '#777', marginBottom: '15px' }}>
        {products?.description}
      </p>
      <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
        $ {products?.price}
      </p>
      <button
        style={{
          backgroundColor: '#0070f3',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Buy Now
      </button>
    </div>
  </div>
  
  )
}

export default ProductPage