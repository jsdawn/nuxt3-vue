import request from '@/utils/request.js';

export function addArticleComments(data) {
  if (!data.article_id) {
    console.error('[API addArticleComments]: no article id');
    return;
  }
  return request({
    url: `/api/article/${data.article_id}/comments`,
    method: 'post',
    data,
  });
}

export function delComments(id) {
  return request({
    url: '/api/comments/' + id,
    method: 'delete',
  });
}
