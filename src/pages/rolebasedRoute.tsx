import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {jwtDecode} from 'jwt-decode';

interface RoleBasedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                const userRole = decodedToken.role;
                console.log('userrole', userRole)

                if (allowedRoles.includes(userRole)) {
                    setIsAuthorized(true);
                } else {
                    router.push('/unauthorized'); 
                }
            } catch (error) {
                router.push('/login'); 
            }
        } else {
            router.push('/login');
        }
    }, [allowedRoles, router]);

    return isAuthorized ? <>{children}</> : null;
};

export default RoleBasedRoute;
