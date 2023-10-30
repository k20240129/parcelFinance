import { mockRequest } from '../request';
/**
 * 新增提单
 */
export function AddAndUpdateProductPlanBillBasic(data: any) {
  return mockRequest({
    url: '/api/ProductPlanBillBasic/AddAndUpdateProductPlanBillBasic',
    method: 'post',
    data
  });
}
/**
 * 查询提单信息
 */
export function QueryProductPlanBillBasicList(data: any) {
  return mockRequest({
    url: '/api/ProductPlanBillBasic/QueryProductPlanBillBasicList',
    method: 'post',
    data
  });
}
/**
 * 新增提单详情
 */
export function AddProductPlanBillBasicDetail(data: any) {
  return mockRequest({
    url: '/api/ProductPlanBillBasic/AddProductPlanBillBasicDetail',
    method: 'post',
    data
  });
}
// 查询提单详情
export function QueryProductPlanBillDetailList(data: any) {
  return mockRequest({
    url: '/api/ProductPlanBillBasic/QueryProductPlanBillDetailList',
    method: 'post',
    data
  });
}
