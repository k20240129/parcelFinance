import { mockRequest } from "../request";

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
	return mockRequest.post<boolean>("/getSmsCode", { phone });
}

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(userName: string, password: string) {
	return mockRequest.post("/api/Login/Login", { userName, password });
}

/** 获取用户信息 */
export function fetchUserInfo() {
	return mockRequest.get("/api/Login/QuerySystemUserEntity");
}
// 修改密码
export function UpdateParcelShopPassword(data) {
	return mockRequest({
		url: "/api/ParcelShop/UpdateParcelShopPassword",
		method: "post",
		data,
	});
}

/**
 * 查询客户订单
 */
export function QueryCustomerOrderAllList(data: any) {
	return mockRequest({
		url: "/api/CustomerOrder/QueryCustomerOrderAllList",
		method: "post",
		data,
	});
}
/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function QuerySystemMenuByUserId(data: any) {
	return mockRequest({
		url: "/api/Login/QuerySystemMenuByUserId",
		method: "get",
		params: data,
	});
}
/**
 * 查询系统字典服务
 */
export function QuerySystemDictionaryList(data: any) {
	return mockRequest({
		url: "/api/SystemDictionary/QuerySystemDictionaryList",
		method: "post",
		data,
	});
}
/**
 * 新增修改系统字典服务
 */
export function AddAndUpdateSystemDictionaryModel(data: any) {
	return mockRequest({
		url: "/api/SystemDictionary/AddAndUpdateSystemDictionaryModel",
		method: "post",
		data,
	});
}
/**
 * 新增修改字典详情
 */
export function AddAndUpdateSystemDictionaryDetailModel(data: any) {
	return mockRequest({
		url: "/api/SystemDictionary/AddAndUpdateSystemDictionaryDetailModel",
		method: "post",
		data,
	});
}

/**
 * 查询字典详情
 */
export function QuerySystemDictionaryDetailList(data: any) {
	return mockRequest({
		url: "/api/SystemDictionary/QuerySystemDictionaryDetailList",
		method: "post",
		data,
	});
}
/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
	return mockRequest.post<ApiAuth.Token>("/updateToken", { refreshToken });
}

/**
 * 查询字典详情
 */
export function UpdateCustomerOrder(data: any) {
	return mockRequest({
		url: "/api/CustomerOrder/UpdateCustomerOrder",
		method: "post",
		data,
	});
}
export function CustomerPutOnShelves(data: any) {
	return mockRequest({
		url: "/api/Warehouse/CustomerPutOnShelves",
		method: "post",
		data,
	});
}
