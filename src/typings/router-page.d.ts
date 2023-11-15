declare namespace RouterPage {
  /** 根路由 */
  type RootRouteKey = 'root';

  /** 未找到路由(捕获无效路径的路由) */
  type NotFoundRouteKey = 'not-found';

  /** 页面路由 */
  type RouteKey =
    | '403'
    | '404'
    | '500'
    | 'appH5'
    | 'constant-page'
    | 'home'
    | 'home_LadingBillhome'
    | 'home_edit'
    | 'home_message'
    | 'login'
    | 'not-found'
    | 'orderforgoods'
    | 'orderforgoods_detail';

  /** 最后一级路由(该级路有对应的vue文件) */
  type LastDegreeRouteKey = Extract<RouteKey, '403' | '404' | '500' | 'appH5' | 'constant-page' | 'home_LadingBillhome' | 'home_edit' | 'home_message' | 'login' | 'not-found' | 'orderforgoods' | 'orderforgoods_detail'>
}
