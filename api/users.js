import request from '@/utils/request.js';

export function getUsers(params) {
  return request({
    url: '/api/users',
    method: 'get',
    params,
  });
}

export function updUsers({ id, ...data }) {
  return request({
    url: '/api/users/' + id,
    method: 'put',
    data,
  });
}
