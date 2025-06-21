import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedLayout from '~/layouts/ProtectedLayout';
import CourseDetails from '~/pages/CourseDetails';
import CourseForm from '~/pages/CourseForm';
import Dashboard from '~/pages/Dashboard';
import InstructorsManager from '~/pages/InstructorsManager';
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
                    <Route path="courses/new" element={<CourseForm />} />
                    <Route path="courses/:id/edit" element={<CourseForm />} />
                    <Route path="courses/:id/instructors" element={<InstructorsManager />} />
                </Route>

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
