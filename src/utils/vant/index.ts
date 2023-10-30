// 1. 引入你需要的组件
import { Button, Field, CellGroup, TreeSelect, Popup } from 'vant';
// 3. 注册你需要的组件

const vnatRegister = app => {
  app.use(Button);
  app.use(Field);
  app.use(CellGroup);
  app.use(TreeSelect);
  app.use(Popup);
};

export default vnatRegister;
