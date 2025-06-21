import { request } from './apiClient';

export const getLessons = ({ title, status, course_id, page = 1, limit = 10 } = {}) => {
  const params = new URLSearchParams();

  if (title) params.append('title', title);
  if (status) params.append('status', status);
  if (course_id) params.append('course_id', course_id);
  params.append('page', page);
  params.append('limit', limit);

  return request(`/lessons?${params.toString()}`);
};

export const getLessonById = id => request(`/lessons/${id}`);

export const createLesson = data => request('/lessons', { method: 'POST', body: data });

export const updateLesson = (id, data) => request(`/lessons/${id}`, { method: 'PUT', body: data });

export const deleteLesson = id => request(`/lessons/${id}`, { method: 'DELETE' });
