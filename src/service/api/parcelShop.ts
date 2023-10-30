import { mockRequest } from '../request';
/**
 * 查询包裹店信息
 */
export function QueryBackstageParcelShopList(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryBackstageParcelShopList',
    method: 'post',
    data
  });
}
/**
 * 新增包裹店信息
 */
export function AddAndUpdateParcelShop(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/AddAndUpdateParcelShop',
    method: 'post',
    data
  });
}
/**
 * 查询货架码信息
 */
export function QueryParcelShopInternalCategoryShelf(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopInternalCategoryShelf',
    method: 'get',
    params: data
  });
}
/**
 * 修改包裹店货架码
 */
export function UpdateParcelShopInternalCategoryShelf(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/UpdateParcelShopInternalCategoryShelf',
    method: 'post',
    data
  });
}
// 下载包裹店货架码
export function DowmParcelShopInternalCategoryShelf(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/DowmParcelShopInternalCategoryShelf',
    method: 'post',
    data
  });
}

// 新增出库单
export function AddCustomerOutbound(data: any) {
  return mockRequest({
    url: '/api/CustomerOutbound/AddCustomerOutbound',
    method: 'post',
    data
  });
}
// 出库单列表查询
export function QueryCustomerOutBoundList(data: any) {
  return mockRequest({
    url: '/api/CustomerOutbound/QueryCustomerOutBoundList',
    method: 'post',
    data
  });
}
// 更新出库单
export function UpdateCustomerOutbound(data: any) {
  return mockRequest({
    url: '/api/CustomerOutbound/UpdateCustomerOutbound',
    method: 'post',
    data
  });
}
// 生成大包面单
export function GenerateCustomerOutBound(data: any) {
  return mockRequest({
    url: '/api/CustomerOutbound/GenerateCustomerOutBound',
    method: 'post',
    data
  });
}
// 删除出库单中运单
export function DelCustomerOutBoundDetail(data: any) {
  return mockRequest({
    url: '/api/CustomerOutbound/DelCustomerOutBoundDetail',
    method: 'get',
    params: data
  });
}
// 查询包裹店联系人
export function QueryParcelShopmShopLinkList(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopmShopLinkList',
    method: 'post',
    data
  });
}
// 新增修改包裹店联系人
export function AddAndUpdateParcelShopLinkEntity(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/AddAndUpdateParcelShopLinkEntity',
    method: 'post',
    data
  });
}
// 查询包裹店国外货架码
export function QueryParcelShopForeignShelfList(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopForeignShelfList',
    method: 'get',
    params: data
  });
}
// 新增包裹店国外货架码
export function AddAndUpdateParcelShopForeignShelf(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/AddAndUpdateParcelShopForeignShelf',
    method: 'post',
    data
  });
}

// 新增货架层
export function AddAndUpdateParcelShopForeignShelfFloor(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/AddAndUpdateParcelShopForeignShelfFloor',
    method: 'post',
    data
  });
}
// 查询货架层
export function QueryParcelShopForeignShelfFloorList(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopForeignShelfFloorList',
    method: 'get',
    params: data
  });
}
// 查询包裹店在中转站中的入库数据
export function QueryTransferStationInStorageByParcelShop(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryTransferStationInStorageByParcelShop',
    method: 'post',
    data
  });
}
// 新增包裹店预报
export function AddParcelShopForecast(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/AddParcelShopForecast',
    method: 'post',
    data
  });
}
// 查询包裹店首页报表
export function QueryParcelShopFirstReportModel(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopFirstReportModel',
    method: 'get',
    params: data
  });
}
// 查询中转站近七天提货数据
export function QueryTransferStationSevenTakeUp(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryTransferStationSevenTakeUp',
    method: 'get',
    params: data
  });
}
// 查询中转站近七日用户取件数据
export function QueryUserPickUpSevenTakeUp(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryUserPickUpSevenTakeUp',
    method: 'get',
    params: data
  });
}
// 查询近七日上架数据
export function QueryPickOnShelves(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryPickOnShelves',
    method: 'get',
    params: data
  });
}
// 查询近七日上架数据
export function QueryOverFiveDayNoPickUpViewModel(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryOverFiveDayNoPickUpViewModel',
    method: 'get',
    params: data
  });
}
// 查询包裹店结算集合
export function QueryParcelShopSettlementCustomerList(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopSettlementCustomerList',
    method: 'post',
    data
  });
}
// 查询包裹店结算天的维度
export function QueryParcelShopSettlementChartByDay(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopSettlementChartByDay',
    method: 'post',
    data
  });
}
// 查询包裹店结算月的维度
export function QueryParcelShopSettlementChartByMonth(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopSettlementChartByMonth',
    method: 'post',
    data
  });
}
// 包裹店开关店铺
export function OpenOrCloseParcelShop(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/OpenOrCloseParcelShop',
    method: 'get',
    params: data
  });
}
// 包裹店消息查询
export function QuerySystemMessageList(data: any) {
  return mockRequest({
    url: '/api/SystemMessageTemplate/QuerySystemMessageList',
    method: 'post',
    data
  });
}

// 查询消息未读数
export function QuerySystemMessageNoReadCount(data: any) {
  return mockRequest({
    url: '/api/SystemMessageTemplate/QuerySystemMessageNoReadCount',
    method: 'post',
    data
  });
}
// 批量已读信息
export function BatchUpdateSystemMessage(data: any) {
  return mockRequest({
    url: '/api/SystemMessageTemplate/BatchUpdateSystemMessage',
    method: 'post',
    data
  });
}
// 修改信息状态
export function UpdateSystemMessage(data: any) {
  return mockRequest({
    url: '/api/SystemMessageTemplate/UpdateSystemMessage',
    method: 'post',
    data
  });
}
// 查询包裹店付款信息
export function QueryParcelShopPaymentInformationList(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopPaymentInformationList',
    method: 'post',
    data
  });
}
// 新增修改付款信息
export function AddAndUpdateParcelShopPaymentInformation(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/AddAndUpdateParcelShopPaymentInformation',
    method: 'post',
    data
  });
}
// 新增包裹店合同
export function AddAndUpdateParcelShopContract(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/AddAndUpdateParcelShopContract',
    method: 'post',
    data
  });
}
// 查询包裹店合同
export function QueryParcelShopContractList(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/QueryParcelShopContractList',
    method: 'post',
    data
  });
}
// 删除包裹店付款信息
export function DeteleParcelShopPaymentInformation(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/DeteleParcelShopPaymentInformation',
    method: 'get',
    params: data
  });
}
// 删除包裹店合同信息
export function DeteleParcelShopContract(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/DeteleParcelShopContract',
    method: 'get',
    params: data
  });
}
// 删除包裹店联系人信息
export function DeteleParcelShopmShopLink(data: any) {
  return mockRequest({
    url: '/api/ParcelShop/DeteleParcelShopmShopLink',
    method: 'get',
    params: data
  });
}
