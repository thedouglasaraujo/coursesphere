import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedLayout from '~/layouts/ProtectedLayout';
import CourseDetails from '~/pages/CourseDetails';
import Dashboard from '~/pages/Dashboard';
import Login from '~/pages/Login';

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

function PrivateRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <ProtectedLayout />
                        </PrivateRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="courses/:id" element={<CourseDetails />} />
                </Route>

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
