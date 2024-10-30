import request from '@/utils/request.js';

export function loginUser(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data,
  });
}

export function uploadImage(data) {
  return request({
    url: '/api/common/upload/image',
    method: 'post',
    data,
  });
}
