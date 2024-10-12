import request from '@/utils/request.js';

export function listArticles(params) {
  return request({
    url: '/api/articles',
    method: 'get',
    params,
  });
}

export function getArticles(id) {
  return request({
    url: '/api/articles/' + id,
    method: 'get',
  });
}

export function updArticles(data) {
  return request({
    url: data.id ? `/api/articles/${data.id}` : '/api/articles',
    method: data.id ? 'put' : 'post',
    data,
  });
}

export function delArticles(id) {
  return request({
    url: '/api/articles/' + id,
    method: 'delete',
  });
}

