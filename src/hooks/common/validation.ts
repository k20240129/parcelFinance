// src/hooks/useMousePosition.ts
interface MousePosition {
  formItemRule: (
    msg: string,
    trigger?: any
  ) => {
    required: boolean;
    trigger: string;
    message: string;
  };
}
function useMousePosition(): MousePosition {
  // 校验是否输入
  const formItemRule = (msg, trigger, string = 'string') => {
    console.log(msg, trigger);

    return { required: true, type: string, trigger: trigger || 'blur', message: msg };
  };

  return { formItemRule };
}

export default useMousePosition;
