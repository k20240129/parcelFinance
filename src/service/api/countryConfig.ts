import { mockRequest } from '../request';

/**
 * 查询国家配置表
 */
export function QueryCountryConfigList(data: any) {
  return mockRequest({
    url: '/api/CountryConfig/QueryCountryConfigList',
    method: 'post',
    data
  });
}
/**
 * 新增修改国家配置表
 */
export function AddAndUpdateCountryConfig(data: any) {
  return mockRequest({
    url: '/api/CountryConfig/AddAndUpdateCountryConfig',
    method: 'post',
    data
  });
}
/**
 * 查询城市配置表
 */
export function QueryCityConfigList(data: any) {
  return mockRequest({
    url: '/api/CountryConfig/QueryCityConfigList',
    method: 'post',
    data
  });
}
/**
 * 新增修改城市配置表
 */
export function AddAndUpdateCityConfig(data: any) {
  return mockRequest({
    url: '/api/CountryConfig/AddAndUpdateCityConfig',
    method: 'post',
    data
  });
}
/**
 * 查询区域配置表
 */
export function QueryDistrictConfigList(data: any) {
  return mockRequest({
    url: '/api/CountryConfig/QueryDistrictConfigList',
    method: 'post',
    data
  });
}
/**
 * 新增修改区域配置表
 */
export function AddAndUpdateDistrictConfig(data: any) {
  return mockRequest({
    url: '/api/CountryConfig/AddAndUpdateDistrictConfig',
    method: 'post',
    data
  });
}
// 查询洲配置表
export function QueryProvinceConfigList(data: any) {
  return mockRequest({
    url: '/api/CountryConfig/QueryProvinceConfigList',
    method: 'post',
    data
  });
}
// 新增修改洲配置表
export function AddAndProvinceConfigEntiy(data: any) {
  return mockRequest({
    url: '/api/CountryConfig/AddAndProvinceConfigEntiy',
    method: 'post',
    data
  });
}
// 上传图片
export function ImportData(data: any) {
  return mockRequest({
    url: '/api/Upload/ImportData',
    method: 'post',
    data
  });
}
