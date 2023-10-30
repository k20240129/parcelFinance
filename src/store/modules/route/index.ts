import { defineStore } from "pinia";
import {
	ROOT_ROUTE,
	constantRoutes,
	router,
	routes as staticRoutes,
} from "@/router";
// import { QuerySystemMenuByUserId } from '@/service';
import {
	localStg,
	filterAuthRoutesByUserPermission,
	getCacheRoutes,
	getConstantRouteNames,
	transformAuthRouteToVueRoutes,
	transformAuthRouteToVueRoute,
	transformAuthRouteToMenu,
	transformAuthRouteToSearchMenus,
	transformRouteNameToRoutePath,
	transformRoutePathToRouteName,
} from "@/utils";
import routerJson from "@/json/router";
import { useAuthStore } from "../auth";
import { useTabStore } from "../tab";
interface RouteState {
	/**
	 * 权限路由模式:
	 * - static - 前端声明的静态
	 * - dynamic - 后端返回的动态
	 */
	authRouteMode: ImportMetaEnv["VITE_AUTH_ROUTE_MODE"];
	/** 是否初始化了权限路由 */
	isInitAuthRoute: boolean;
	/** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
	routeHomeName: AuthRoute.AllRouteKey;
	/** 菜单 */
	menus: App.GlobalMenuOption[];
	/** 搜索的菜单 */
	searchMenus: AuthRoute.Route[];
	/** 缓存的路由名称 */
	cacheRoutes: string[];
}
interface Route {
	menuName?: string;
	menuParentId?: number;
	menuPath?: string | null;
	menuRoute?: string;
	menuShow?: number;
	menuSort?: number;
	menuType?: number;
	systemMenuViewModelChild: Array<any>;
}
export const useRouteStore = defineStore("route-store", {
	state: (): RouteState => ({
		authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
		isInitAuthRoute: false,
		routeHomeName: transformRoutePathToRouteName(
			import.meta.env.VITE_ROUTE_HOME_PATH
		),
		menus: [],
		searchMenus: [],
		cacheRoutes: [],
	}),
	actions: {
		/** 重置路由的store */
		resetRouteStore() {
			this.resetRoutes();
			this.$reset();
		},
		/** 重置路由数据，保留固定路由 */
		resetRoutes() {
			const routes = router.getRoutes();
			routes.forEach((route) => {
				const name = (route.name || "root") as AuthRoute.AllRouteKey;
				if (!this.isConstantRoute(name)) {
					router.removeRoute(name);
				}
			});
		},
		/**
		 * 是否是固定路由
		 * @param name 路由名称
		 */
		isConstantRoute(name: AuthRoute.AllRouteKey) {
			const constantRouteNames = getConstantRouteNames(constantRoutes);
			return constantRouteNames.includes(name);
		},
		/**
		 * 是否是有效的固定路由
		 * @param name 路由名称
		 */
		isValidConstantRoute(name: AuthRoute.AllRouteKey) {
			const NOT_FOUND_PAGE_NAME: AuthRoute.NotFoundRouteKey = "not-found";
			const constantRouteNames = getConstantRouteNames(constantRoutes);
			return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME;
		},
		/**
		 * 处理权限路由
		 * @param routes - 权限路由
		 */
		handleAuthRoute(routes: AuthRoute.Route[]) {
			(this.menus as App.GlobalMenuOption[]) = transformAuthRouteToMenu(routes);
			this.searchMenus = transformAuthRouteToSearchMenus(routes);

			const vueRoutes = transformAuthRouteToVueRoutes(routes);

			vueRoutes.forEach((route) => {
				router.addRoute(route);
			});

			this.cacheRoutes = getCacheRoutes(vueRoutes);
		},
		/** 动态路由模式下：更新根路由的重定向 */
		handleUpdateRootRedirect(routeKey: AuthRoute.AllRouteKey) {
			if (routeKey === "root" || routeKey === "not-found") {
				throw new Error("routeKey的值不能为root或者not-found");
			}
			const rootRoute: AuthRoute.Route = {
				...ROOT_ROUTE,
				redirect: transformRouteNameToRoutePath(routeKey),
			};
			const rootRouteName: AuthRoute.AllRouteKey = "root";
			router.removeRoute(rootRouteName);
			const rootVueRoute = transformAuthRouteToVueRoute(rootRoute)[0];
			router.addRoute(rootVueRoute);
		},
		/** 初始化动态路由 */
		async initDynamicRoute() {
			const { initHomeTab } = useTabStore();

			const { userId } = localStg.get("userInfo") || {};

			// try {
			if (!userId) {
				localStorage.removeItem("token");
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("userInfo");
				localStorage.removeItem("themeColor");
				router.push("/home/LadingBillhome");
				throw new Error("userId 不能为空!");
			}
			const routArr: Array<Route> = [
				{
					systemMenuViewModelChild: [],
				},
			];

			// const { data } = await QuerySystemMenuByUserId({ systemType: 7 });
			// // 固定路由
			// const routArr: Array<Route> = data;
			// // 处理路由数据
			// for (const item of routArr) {
			//   for (const item1 of item.systemMenuViewModelChild) {
			//     item1.path = item1.menuPath;
			//     item1.name = item1.menuRoute;
			//     item1.component = 'basic';
			//     item1.meta = {
			//       title: item1.menuName,
			//       localIcon: item1.menuIcon,
			//       order: 1
			//       // keepAlive: true
			//     };
			//     item1.children = item1.systemMenuViewModelChild;
			//     delete item1.systemMenuViewModelChild;
			//     for (const item2 of item1.children) {
			//       item2.path = item2.menuPath;
			//       item2.name = item2.menuRoute;
			//       item2.component = 'self';
			//       item2.meta = {
			//         title: item2.menuName,
			//         localIcon: item2.menuIcon,
			//         requiresAuth: true,
			//         hide: item2.menuShow !== 0,
			//         keepAlive: item2.menuShow !== 0
			//       };
			//     }
			//   }
			// }
			routArr[0].systemMenuViewModelChild = [
				...routerJson,
				...routArr[0].systemMenuViewModelChild,
			];
			const rout = routArr[0].systemMenuViewModelChild; // 需要push的路由

			this.handleAuthRoute(rout);

			initHomeTab("home_LadingBillhome", router);

			this.isInitAuthRoute = true;
			// } catch (error) {
			//   localStorage.removeItem('token');
			//   localStorage.removeItem('refreshToken');
			//   localStorage.removeItem('userInfo');
			//   localStorage.removeItem('themeColor');
			//   window.location.reload();
			// }
			// }
		},
		/** 初始化静态路由 */
		async initStaticRoute() {
			const { initHomeTab } = useTabStore();
			const auth = useAuthStore();

			const routes = filterAuthRoutesByUserPermission(
				staticRoutes,
				auth.userInfo.userRole
			);
			this.handleAuthRoute(routes);

			initHomeTab(this.routeHomeName, router);

			this.isInitAuthRoute = true;
		},
		/** 初始化权限路由 */
		async initAuthRoute() {
			if (this.authRouteMode === "dynamic") {
				await this.initDynamicRoute();
			} else {
				await this.initStaticRoute();
			}
		},
	},
});
