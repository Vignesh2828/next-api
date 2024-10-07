import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login'); 
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return <>{children}</>;
};

export default ProtectedRoute;
