import { unref, nextTick } from "vue";
import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { router } from "@/router";
import { fetchLogin, fetchUserInfo } from "@/service";
import { useRouterPush } from "@/composables";
import { localStg } from "@/utils";
import { useTabStore } from "../tab";
import { useRouteStore } from "../route";
import { getToken, getUserInfo, clearAuthStorage } from "./helpers";
interface AuthState {
	/** 用户信息 */
	userInfo: any;
	/** 用户token */
	token: string;
	/** 登录的加载状态 */
	loginLoading: boolean;
}
// const message = useMessage();

export const useAuthStore = defineStore("auth-store", {
	state: (): AuthState => ({
		userInfo: getUserInfo(),
		token: getToken(),
		loginLoading: false,
	}),
	getters: {
		/** 是否登录 */
		isLogin(state) {
			return Boolean(state.token);
		},
	},
	actions: {
		/** 重置auth状态 */
		resetAuthStore() {
			const { toLogin } = useRouterPush(false);
			const { resetTabStore } = useTabStore();
			const { resetRouteStore } = useRouteStore();
			const route = unref(router.currentRoute);

			clearAuthStorage();
			this.$reset();

			if (route.meta.requiresAuth) {
				toLogin();
			}

			nextTick(() => {
				resetTabStore();
				resetRouteStore();
			});
		},
		/**
		 * 处理登录后成功或失败的逻辑
		 * @param backendToken - 返回的token
		 */
		async handleActionAfterLogin(backendToken: any) {
			const route = useRouteStore();
			const { toLoginRedirect } = useRouterPush(false);

			const loginSuccess = await this.loginByToken(backendToken);

			if (loginSuccess) {
				await route.initAuthRoute();
				const langObj = {
					zh: {
						successful: "登录成功",
						welcome: "欢迎回来",
					},
					rs: {
						successful: "Успешный вход в систему",
						welcome: "Добро пожаловать",
					},
					kh: { successful: "кіру сәтті", welcome: "Қайта келуінмен" },
				};

				console.log();

				// 跳转登录后的地址
				toLoginRedirect();
				// const { t } = useI18n();
				// 登录成功弹出欢迎提示
				if (route.isInitAuthRoute) {
					window.$notification?.success({
						title: "登录成功!",
						content: `欢迎回来，${this.userInfo.userName}!`,
						duration: 3000,
					});
				}

				return;
			}

			// 不成功则重置状态
			this.resetAuthStore();
		},
		/**
		 * 根据token进行登录
		 * @param backendToken - 返回的token
		 */
		async loginByToken(backendToken: any) {
			let successFlag = false;
			console.log(backendToken);

			// 先把token存储到缓存中(后面接口的请求头需要token)
			// const { token, refreshToken } = backendToken;
			localStg.set("token", backendToken);
			localStg.set("refreshToken", "refreshToken");

			// 获取用户信息
			const res = await fetchUserInfo();
			if (res) {
				res.data.userId = res.data.id;
				// 成功后把用户信息存储到缓存中
				console.log(res.data);

				localStg.set("userInfo", res.data);

				// 更新状态
				this.userInfo = res.data;
				this.token = backendToken;

				successFlag = true;
			}

			return successFlag;
		},
		/**
		 * 登录
		 * @param userName - 用户名
		 * @param password - 密码
		 */
		async login(userName: string, password: string) {
			this.loginLoading = true;
			fetchLogin(userName, password)
				.then(async (data) => {
					if (data.data.data) {
						await this.handleActionAfterLogin(data.data.data);
					} else {
						// console.log(useMessage());
						window.$message?.error("账户或密码错误");
						// message.error('!');
					}
					this.loginLoading = false;
				})
				.catch(() => {
					this.loginLoading = false;
				});
			// console.log(data);
		},
		/**
		 * 更换用户权限(切换账号)
		 * @param userRole
		 */
		async updateUserRole(userRole: Auth.RoleType) {
			const { resetRouteStore, initAuthRoute } = useRouteStore();

			const accounts: Record<
				Auth.RoleType,
				{ userName: string; password: string }
			> = {
				super: {
					userName: "Super",
					password: "super123",
				},
				admin: {
					userName: "Admin",
					password: "admin123",
				},
				user: {
					userName: "User01",
					password: "user01123",
				},
			};
			const { userName, password } = accounts[userRole];
			const { data } = await fetchLogin(userName, password);
			if (data) {
				await this.loginByToken(data);
				resetRouteStore();
				initAuthRoute();
			}
		},
	},
});
