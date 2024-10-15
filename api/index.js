import request from '@/utils/request.js';

export function loginUser(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data,
  });
}
