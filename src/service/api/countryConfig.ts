import { mockRequest } from '../request';

// 上传图片
export function ImportData(data: any) {
  return mockRequest({
    url: '/api/Upload/ImportData',
    method: 'post',
    data
  });
}
