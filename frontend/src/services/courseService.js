import { request } from './apiClient';

export const getCourses = () => request('/courses');

export const getCourseById = id => request(`/courses/${id}`);

export const createCourse = data => request('/courses', { method: 'POST', body: data });

export const updateCourse = (id, data) =>
    request(`/courses/${id}`, { method: 'PUT', body: data });

export const deleteCourse = id => request(`/courses/${id}`, { method: 'DELETE' });

export const getInstructors = id => request(`/courses/${id}/instructors`);

export const addInstructor = (courseId, data) =>
    request(`/courses/${courseId}/instructors`, { method: 'POST', body: data });

export const removeInstructor = (courseId, userId) =>
    request(`/courses/${courseId}/instructors`, { method: 'DELETE', body: { userId } });
