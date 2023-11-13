<!-- eslint-disable vue/no-mutating-props -->
<template>
  <!-- 基础表格组件 -->
  <div class="KY-table">
    <el-row :gutter="0">
      <el-col :span="24" class="table-main">
        <!-- 表格区域 start -->
        <!-- height="500px" -->
        <slot name="top_title"></slot>
        <el-table ref="table" v-loading="loading" :default-sort="defaultSort" :row-style="{ height: '37px' }" stripe
          :cell-style="{ padding: '0' }" :data="tableData" :header-cell-class-name="cellClass"
          :span-method="objectSpanMethod" v-bind="$attrs" :expand-row-keys="expands" :row-key="rowKey" :tooltip-options="{
            effect: 'dark',
            placement: 'top',
            hideAfter: 200
          }" :header-cell-style="{
  'background': '#F6F6F6'
}" :max-height="max_height" @row-contextmenu="rightClick" @select-all="selectAll" @sort-change="sortChange"
          @select="handSelect" @selection-change="handleSelectionChange" @getSelectionRows="getSelectionRows"
          @current-change="handleCurrentChange" @chikAll="chikAll" @row-click="RowClick">
          <el-table-column v-if="selection" type="selection" :reserve-selection="true" :width="55" />
          <el-table-column v-if="serialNumber.show" type="index" :width="serialNumber.width || 'auto'"
            :label="serialNumber.label" :index="indexMethod" />
          <el-table-column v-for="item in colums" :key="item.id" :prop="item.prop" :label="item.label"
            :align="item.align || 'left'" :width="item.width || 'auto'"
            :min-width="item.minWidth ? item.minWidth : minWidth" :fixed="item.fixed || false"
            :show-overflow-tooltip="item.tooltip === undefined ? tooltip : item.tooltip" :tooltip-options="{
              effect: 'dark',
              placement: 'top',
              hideAfter: 200
            }" :sortable="item.sortable == true ? true : false" :formatter="item.formatter" :type="item.type">
            <!-- 表格头部标题 -->
            <template v-if="item?.header?.is === true" #header="{ column, $index }">
              <slot v-if="item?.header.slot" :name="item?.header.slot" :row="column" :index="$index" />
              <!-- :row="row"
									:index="$index" -->
            </template>
            <template v-if="item.colums === undefined" #default="{ row, $index }">
              <span v-if="item.formatter">{{ item.formatter(row, dictList) }}</span>
              <slot v-else-if="item.slot" :name="item.slot" :row="row" :index="$index" />
              <span v-else>{{ row[item.prop] }}</span>
            </template>
            <el-table-column v-for="item1 in item.colums" :key="item1.id" :prop="item.prop" :label="item1.label"
              :align="item1.align || 'left'" :width="item1.width || 'auto'"
              :min-width="item1.minWidth ? item1.minWidth : minWidth" :fixed="item1.fixed || false"
              :show-overflow-tooltip="item1.tooltip === undefined ? tooltip : item1.tooltip"
              :sortable="item.sortable == true ? true : false" :formatter="item1.formatter" :type="item1.type">
              <template v-if="item1?.header?.is === true" #header="{ column, $index }">
                <slot v-if="item1?.header.slot" :name="item1?.header.slot" :row="column" :index="$index" />
                <!-- :row="row"
									:index="$index" -->
              </template>
              <template #default="{ row, $index }">
                <span v-if="item1.formatter">{{ item1.formatter(row, dictList) }}</span>
                <slot v-else-if="item1.slot" :name="item1.slot" :row="row" :index="$index" />
                <span v-else>{{ row[item1.prop] }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column v-if="Object.keys(operationData).length || $slots.operation || $slots.operation" :label="label"
            :width="operationWidth" :align="center" fixed="right">
            <!-- <div class="operation-row" :scope="scope"></div> -->
            <template #default="scope">
              <el-button v-if="operationData.edit && operationData.edit.show" icon="Edit" size="small" type="primary"
                @click.stop="edit(scope)">{{ operationData.edit.text || '编辑' }}</el-button>
              <el-button v-if="operationData.view && operationData.view.show" type="text" size="small"
                @click.stop="view(scope)">{{ operationData.view.text || '查看' }}</el-button>
              <el-button v-if="operationData.del && operationData.del.show" type="danger" size="small" icon="DeleteFilled"
                @click.stop="del(scope)">{{ operationData.del.text || '删除' }}</el-button>
              <slot name="operation" :row="scope.row" :index="scope.$index"></slot>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部增加区域 -->
        <slot name="bottom_add"></slot>
        <!-- 表格区域 end -->
        <!-- 分页区域 start -->
        <!-- 分页区域 end -->
      </el-col>
    </el-row>
  </div>
  <div v-if="menusShow && menusIf" id="menu" class="menuDiv" @mouseleave="displayMenuNone">
    <ul class="menuUl">
      <li v-for="(item, index) in menus" :key="index" @click.stop="infoClick(index)">
        <i :class="item.icon"></i> {{ item.name }}
      </li>
    </ul>
  </div>
  <div class="pagination_box">
    <div v-if="paginationShow" class="pagination all-t-r">
      <el-pagination v-model:current-page="pagination.pageIndex" v-model:page-size="pagination.pageSize" :small="small"
        :page-sizes="pageSizes" :layout="layout" :total="total" :background="background"
        @current-change="$currentChange($event)" @size-change="$sizeChange($event)">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { ElPagination, ElTable, ElRow, ElCol, ElTableColumn, ElButton } from 'element-plus';
import useClipboard from 'vue-clipboard3'; // 复制插件

// import { pageSizes } from '@/utils/table-config';
export default {
  name: 'KYTable',
  components: {
    ElPagination,
    ElTable,
    ElRow,
    ElCol,
    ElTableColumn,
    ElButton
  },
  props: {
    // 分页的底色
    background: {
      type: Boolean,
      default: true
    },
    // 是否使用小型分页
    small: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 分页的类型
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    max_height: {
      type: String,
      default: '10000px'
    },
    // 操作栏目显示字段
    label: {
      type: String,
      default: '操作'
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    // 表头
    colums: {
      type: Array,
      default: () => []
    },
    // 是否显示新建按钮
    showAddButton: {
      type: Boolean,
      default: true
    },
    // table是否显示tooltip
    tooltip: {
      type: Boolean,
      default: true
    },
    // 数据项最小宽度
    minWidth: {
      type: String,
      default: ''
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 排序对象
    defaultSort: {
      type: Object,

      default: () => ({})
    },
    // 表格前方单选按钮
    selection: {
      type: [Boolean, String],
      default: false
    },
    // 表格前方序号信息
    serialNumber: {
      type: Object,
      default: () => ({
        show: true,
        width: '55',
        label: '序号'
      })
    },
    // 总页数
    total: {
      type: Number,
      default: 0
    },
    // 操作按钮
    operationData: {
      type: Object,
      default: () => ({})
    },
    // 是否显示分页区域
    paginationShow: {
      type: Boolean,
      default: true
    },
    // 是否显示表头全选
    showAllSelect: {
      type: Boolean,
      default: true
    },
    // 操作栏宽度
    operationWidth: {
      type: [String, Number],
      default: 180
    },
    // 分页参数
    pagination: {
      type: Object,
      default: () => {
        return {
          pageIndex: 1,
          pageSize: 10
        };
      }
    },
    // 操作栏浮动值
    operationFixed: {
      type: [String, Boolean],
      default: false
    },
    // 字典对象
    dictList: {
      type: Object,
      default: () => ({})
    },
    // 是否禁止点击行选中事件
    noHandleRowClick: {
      type: Boolean,
      default: false
    },
    // 分页显示行数列表
    pageSizeList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // // 多选保持状态
    // expands: {
    // 	type: Array,
    // 	default: () => {
    // 		return [];
    // 	},
    // },
    cellList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 开始的合并
    firstRow: {
      type: Number,
      default: 0
    },
    // 末尾的合并
    lastRow: {
      type: Number,
      default: 0
    },
    // 中间的合并
    centerRow1: {
      type: Number,
      default: 10000
    },
    // 是否把表格多选合并
    columnIndexIs: {
      type: Number,
      default: 10000
    },
    centerRow2: {
      type: Number,
      default: 10000
    },
    menusShow: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'page-change',
    'size-change',
    'handleCurrentChange',
    'getSelectionRows',
    'getSelectAll',
    'handleSelectionChange',
    'getSelectRows',
    'sortChange',
    'rowClick',
    'edit',
    'view',
    'del'
  ],
  data() {
    return {
      menusIf: false,
      menus: [
        { name: '复制当前数据', operType: 1, icon: 'el-icon-upload2' },
        { name: '复制一行', operType: 2, icon: 'el-icon-upload2' },
        { name: '复制一列', operType: 3, icon: 'el-icon-upload2' }
      ], // 右键菜单栏
      cacheRow: null, // 初始化选定行
      cacheColumn: null, // 初始化选定当前单元格
      indexMethod: 1,
      tatl: 10
    };
  },
  computed: {
    // 如果传入分页显示列表则使用传入的，如果没有，使用公共参数
    pageSizes() {
      if (this.pageSizeList && this.pageSizeList.length > 0) {
        return this.pageSizeList;
      }
      return [10, 50, 100];
    }
  },
  created() {
    console.log(this.pagination.page);
  },
  methods: {
    // selected(row, index) {
    // 	if (row.selectType == 1) {
    // 		return true; //不可勾选
    // 	} else {
    // 		return false; //可勾选
    // 	}
    // },
    // 表格单选
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val);
    },
    // 表格右击的功能
    rightClick(row, column, event) {
      this.menusIf = true;
      this.$nextTick(() => {
        if (this.menusShow) {
          this.cacheRow = row;
          this.cacheColumn = column;
          console.log(this.cacheRow, this.cacheColumn);
          event.preventDefault();
          const menu = document.querySelector('#menu');
          // 根据事件对象中鼠标点击的位置，进行定位
          menu.style.left = `${event.clientX + 0}px`;
          menu.style.top = `${event.clientY + -15}px`;
          // 改变自定义菜单的隐藏与显示
          menu.style.display = 'block';
          menu.style.zIndex = 1000;
        }
      });
    },
    displayMenuNone() {
      setTimeout(() => {
        const menu = document.querySelector('#menu');
        menu.style.display = 'none';
        this.menusIf = false;
      }, 500);
    },
    // table的左键点击当前行事件
    clickRow(row, column, event) {
      console.log(row);
      const menu = document.querySelector('#menu');
      menu.style.display = 'none';
      this.menusIf = false;
    },
    ddd() {
      console.log(this.cacheRow, this.cacheColumn, this.colums);
    },
    // 右击自定义菜单的点击事件
    async infoClick(index) {
      console.log(this.cacheRow, this.cacheColumn, this.colums);

      // 要做的事情，根据index下标来判断
      const { toClipboard } = useClipboard();
      if (index === 0) {
        let pxy = '';
        this.colums.forEach(item => {
          if (item.label == this.cacheColumn.label) {
            // eslint-disable-next-line guard-for-in
            for (const key in this.cacheRow) {
              pxy = this.cacheRow[item.prop];
            }
          }
          if (item?.colums?.length > 0) {
            item.colums.forEach(item1 => {
              if (item1.label == this.cacheColumn.label) {
                // eslint-disable-next-line guard-for-in
                for (const key in this.cacheRow) {
                  pxy = this.cacheRow[item1.prop];
                }
              }
            });
          }
        });
        console.log(pxy);
        try {
          console.log(typeof pxy === 'number');
          if (typeof pxy === 'number') {
            await toClipboard(JSON.stringify(pxy));
            window.$message.success('复制成功');
          } else {
            await toClipboard(pxy);
            window.$message.success('复制成功');
          }
        } catch (e) {
          console.error(e);
        }
      }
      if (index === 1) {
        // 要做的事情
        let copyString = '';
        this.colums.forEach(item => {
          // eslint-disable-next-line guard-for-in
          for (const key in this.cacheRow) {
            if (item.prop == key) {
              copyString += `${item.label}-${this.cacheRow[key]} `;
            }
            if (item?.colums?.length > 0) {
              // eslint-disable-next-line no-loop-func
              item.colums.forEach(item1 => {
                if (item1.prop == key) {
                  copyString += `${item1.label}-${this.cacheRow[key]} `;
                }
              });
            }
          }
        });

        try {
          await toClipboard(JSON.stringify(copyString));
          window.$message.success('复制成功');
        } catch (e) {
          console.error(e);
        }
        console.log(copyString);
      }
      if (index === 2) {
        console.log(this.tableData, this.cacheColumn, this.colums);
        let keys = '';
        let copyString = '';
        this.colums.forEach(item => {
          if (item.label == this.cacheColumn.label) {
            keys = item.prop;
          }
          if (item?.colums?.length > 0) {
            item.colums.forEach(item1 => {
              if (item1.label == this.cacheColumn.label) {
                keys = item1.prop;
              }
            });
          }
        });
        this.tableData.forEach(item => {
          for (const key in item) {
            if (key == keys) {
              copyString += `${item[key]} `;
            }
          }
        });
        try {
          await toClipboard(copyString);
          window.$message.success('复制成功');
        } catch (e) {
          console.error(e);
        }
      }

      const menu = document.querySelector('#menu');
      menu.style.display = 'none';
    },
    // eslint-disable-next-line consistent-return
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.cellList.length > 0 && columnIndex !== this.columnIndexIs) {
        if (
          columnIndex < this.firstRow ||
          columnIndex === this.lastRow ||
          (columnIndex >= this.centerRow1 && columnIndex <= this.centerRow2)
        ) {
          // eslint-disable-next-line no-underscore-dangle
          const _row = this.cellList[rowIndex];
          // eslint-disable-next-line no-underscore-dangle
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          };
        }
      }
    },
    getSelectionRows(row) {
      console.log(row);
      this.$emit('getSelectionRows', row);
    },
    // 全选返回值
    selectAll(selection) {
      this.$emit('getSelectAll', selection);
    },
    // 多选返回值
    handleSelectionChange(item) {
      console.log('勾选', item);
      this.$emit('handleSelectionChange', item);
    },
    // 页码发生改变
    $currentChange(e) {
      this.indexMethod = 1;
      this.indexMethod = e * this.tatl - this.tatl + 1;
      this.$emit('page-change', { ...this.pagination });
    },
    // 每页条数发生改变
    $sizeChange(e) {
      this.indexMethod = 1;
      this.tatl = e;
      this.$emit('size-change', { ...this.pagination });
    },
    // 重置 分页
    // reset() {
    //   this.pagination.page = 1;
    //   this.pagination.rows = 10;
    // },
    // 清空事件QueryCustomerBillDetailList
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    // 设置选中
    toggleRowSelection(val, item) {
      if (item != undefined) {
        this.$refs.table.toggleRowSelection(val, item);
      } else {
        this.$refs.table.toggleRowSelection(val);
      }
      console.log(val);
    },
    // 手动选中
    handSelect(item, row) {
      this.$emit('getSelectRows', item, row);
    },
    // 点击行选中
    handleRowClick(val) {
      if (!this.noHandleRowClick) {
        this.$refs.table.toggleRowSelection(val);
      }
    },
    // 单机行选中
    setCurrent(val) {
      if (!this.noHandleRowClick) {
        this.$refs.table.setCurrentRow(val);
      }
    },
    // 排序后
    sortChange(item) {
      this.$emit('sortChange', item);
    },
    // 点击行
    RowClick(row) {
      this.$emit('rowClick', row);
    },
    // 全选
    chikAll() {
      this.$refs.table.toggleAllSelection();
    },
    // 编辑
    edit(scope) {
      this.$emit('edit', scope);
    },
    // 查看
    view(scope) {
      this.$emit('view', scope);
    },
    // 修改
    del(scope) {
      this.$emit('del', scope);
    },
    cellClass(row) {
      if (row.columnIndex === 0 && !this.showAllSelect) {
        return 'disabledCheck';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-tooltip__popper {
  max-width: 80px;
}

#menu {
  position: fixed;
}

.content_table {
  background-color: #fff;

  box-shadow: 0px 3px 6px #eaf1fc;
  padding: 10px 10px 10px 10px;
}

/* 去掉全选按钮 */
::v-deep.el-table .disabledCheck .cell .el-checkbox__inner {
  display: none !important;
}

/* 去掉全选按钮 */
::v-deep.el-table .disabledCheck .cell::before {
  content: '';
  text-align: center;
}

.pagination_box {
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  justify-content: flex-end;
}

// 菜单样式
.menuDiv {
  position: absolute;

  .menuUl {
    height: auto;
    width: 120px;
    font-size: 14px;
    text-align: left;
    border-radius: 4px;
    border: none;
    background-color: #ffffff;
    color: #606266;
    list-style: none;
    border: 1px solid #ebeef5;
    display: flex;
    padding: 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    li {
      width: 120px;
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      cursor: pointer;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.47);

      &:hover {
        display: block;
        background-color: #ecf5ff;
        color: #7abbff;
      }
    }
  }
}

::v-deep .is-active {
  background-color: #FB4A4C !important;
}

::v-deep .el-table__header>thead>tr>th {
  background: #F5F7FA !important;
}
</style>
