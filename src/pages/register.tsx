import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        console.log(username,password,role)

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', { username, password, role }); 
            setMessage('Registration successful!');
            router.push('/login'); // Redirect to login page
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Error during registration');
            } else {
                setMessage('Error during registration');
            }
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleRegister}>
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
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
