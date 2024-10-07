// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        console.log({email: username,password})

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {  username, password });
            const {token} = response.data
            console.log('f', token)
            localStorage.setItem('token',token); 
            setMessage('Login successful!');
            router.push('/homePage'); 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Invalid credentials');
            } else {
                setMessage('Error during login');
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
