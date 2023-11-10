export default [
	{
		name: "home",
		path: "/home",
		component: "basic",
		meta: {
			title: "应付管理",
			localIcon: "circum_crop",
			order: 1,
		},
		children: [
			{
				name: "home_LadingBillhome",
				path: "/home/LadingBillhome",
				component: "self",
				meta: {
					title: "应付帐单",
					localIcon: "dot",
					requiresAuth: true,
					hide: false,
					keepAlive: false,
				},
			},
			{
				name: "home_edit",
				path: "/home/edit",
				component: "self",
				meta: {
					title: "对账详情",
					localIcon: "dot",
					requiresAuth: true,
					hide: true,
					keepAlive: false,
				},
			},
			{
				name: "home_message",
				path: "/home/message",
				component: "self",
				meta: {
					title: "服务费列表",
					localIcon: "dot",
					requiresAuth: false,
					hide: false,
					keepAlive: false,
				},
			},
		],
	},
];
