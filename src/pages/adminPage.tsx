import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './rolebasedRoute';

const AdminPage = () => {
    return (
        <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['admin']}>
                <div>
                    <h1>Admin Dashboard</h1>
                    {/* Admin-specific content goes here */}
                </div>
            </RoleBasedRoute>
        </ProtectedRoute>
    );
};

export default AdminPage;
