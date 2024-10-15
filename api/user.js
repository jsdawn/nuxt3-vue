import request from '@/utils/request.js';

export function getUser(params) {
  return request({
    url: '/api/users',
    method: 'get',
    params,
  });
}
