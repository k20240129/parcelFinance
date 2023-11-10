// src/hooks/useMousePosition.ts
interface MousePosition {
	formItemRule: (
		msg: string,
		trigger?: Array<string>,
		string?: string
	) => {
		required: boolean;
		trigger: string;
		message: string;
	};
}
function useMousePosition(): MousePosition {
	// 校验是否输入
	const formItemRule = (msg, trigger, string = "string") => {
		return {
			required: true,
			type: string,
			trigger: trigger || "blur",
			message: msg,
		};
	};

	return { formItemRule };
}

export default useMousePosition;
