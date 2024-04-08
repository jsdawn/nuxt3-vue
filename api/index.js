import request from '@/utils/request.js';

export function getHomeData(params) {
  return request({
    url: '/api/v1/wx/channelData',
    method: 'get',
    params,
  });
}
