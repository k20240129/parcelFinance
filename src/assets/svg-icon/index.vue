<template>
	<div class="content_box">
		<!-- 123 -->
		<!-- <div id="preview_content_design"></div> -->
		<Search @search="onSearch" ref="update" />
		<!-- 搜索框 -->
		<div class="content_top">
			<div class="content_top_title">
				<svg-icon icon-class="search" /><span>筛选</span>
			</div>
			<div class="tr"></div>
			<el-form
				label-position="top"
				@submit.native.prevent
				size="large"
				:inline="true"
				class="search_box"
			>
				<RouSeach :icon="true">
					<template #header>
						<el-col :span="7">
							<el-form-item label="运单号(多个以一个空格分隔)">
								<el-input
									v-model="searchForm.wayBillNo"
									clearable
									@clear="initList"
									placeholder="请输入运单号"
									@keyup.enter.native="wayBillGet"
								/>
							</el-form-item>

							<!-- <el-form-item>
						<el-button size="large" type="primary" @click="wayBillGet"
							>查询</el-button
						>
					</el-form-item> -->
						</el-col>
						<el-col :span="4">
							<el-form-item label="入仓号">
								<el-input
									v-model="searchForm.inForecastNum"
									clearable
									@clear="initList"
									placeholder="请输入入仓号"
									@keyup.enter.native="wayBillGet"
								/>
							</el-form-item>
						</el-col>

						<el-col :span="4">
							<el-form-item label="拣货开始时间">
								<el-date-picker
									style="width: 100%"
									v-model="searchForm.pickingTimeStart"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									type="date"
									placeholder="请选择拣货开始时间"
									@change="wayBillGet"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="拣货结束时间">
								<el-date-picker
									style="width: 100%"
									v-model="searchForm.pickingTimeEnd"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									type="date"
									placeholder="请选择拣货结束时间"
									@change="wayBillGet"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="4" class="all-t-r all_f_c">
							<el-button size="large" type="primary" @click="wayBillGet"
								>查询</el-button
							>

							<!-- <el-button size="large" type="warning" @click="exportWayList"
								>导出</el-button.
							> -->
							<el-dropdown class="M_left_20">
								<el-button
									:disabled="this.handSelectionList.length == 0 ? true : false"
									@click="getXZHway"
									type="success"
								>
									同步新智慧数据<el-icon class="el-icon--right"
										><arrow-down
									/></el-icon>
								</el-button>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item @click="getXZHTrackng"
											>同步新智慧路由数据</el-dropdown-item
										>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</el-col>
					</template>
					<template #content>
						<el-row>
							<el-col :span="7">
								<el-form-item label="调度单号(多个以一个空格分隔)">
									<el-input
										v-model="searchForm.productSchedulingNum"
										clearable
										@clear="initList"
										placeholder="请输入调度单号"
										@keyup.enter.native="wayBillGet"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item label="用户名称">
									<!-- <el-input
										v-model="searchForm.customerCode"
										clearable
										@clear="initList"
										placeholder="请输入客户编码"
										@keyup.enter.native="wayBillGet"
									/> -->
									<el-select
										clearable
										v-model="searchForm.customerId"
										filterable
										placeholder="请选择用户名称"
										@change="wayBillGet"
										style="width: 100%"
									>
										<el-option
											v-for="item in customerCodeList"
											:key="item.id"
											:label="item.customerName"
											:value="item.id"
										>
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item label="渠道">
									<el-select
										clearable
										v-model="searchForm.channelServiceId"
										filterable
										placeholder="请选择渠道"
										@change="wayBillGet"
										style="width: 100%"
									>
										<el-option
											v-for="item in channelList"
											:key="item.id"
											:label="item.channelChineseName"
											:value="item.id"
										>
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item label="国家">
									<el-input
										v-model="searchForm.country"
										clearable
										@clear="initList"
										placeholder="国家"
										@keyup.enter.native="wayBillGet"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item label="运单审核状态">
									<el-select
										clearable
										v-model="searchForm.isSure"
										filterable
										placeholder="请选择运单审核状态"
										@change="wayBillGet"
										style="width: 100%"
									>
										<el-option
											v-for="item in isSureList"
											:key="item.id"
											:label="item.label"
											:value="item.id"
										>
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</template>
				</RouSeach>
			</el-form>
		</div>

		<!-- 菜单 -->
		<div class="content_table">
			<el-menu
				:default-active="activeIndex"
				class="el-menu-demo"
				mode="horizontal"
				@select="handleSelect"
			>
				<el-menu-item index="1">全部</el-menu-item>
				<el-menu-item index="2">已下单</el-menu-item>
				<el-menu-item index="3">已收货</el-menu-item>
				<el-menu-item index="4"> 转运中</el-menu-item>
				<el-menu-item index="5">已签收</el-menu-item>
				<el-menu-item index="6">退件</el-menu-item>
				<el-menu-item index="7">已取消</el-menu-item>
			</el-menu>
			<div class="priceSum">
				<div class="Price_sum">
					<div class="right">
						<div class="price0">
							<el-tag class="ml-2" type="danger"
								>核算成本:{{ priceSum.costAccountingSum }}</el-tag
							>
						</div>

						<div class="price2">
							<el-tag class="ml-2" type="success"
								>实际运费总和：{{ priceSum.actualPriceSum }}</el-tag
							>
						</div>
						<div class="price3">
							<el-tag class="ml-2" type="warning"
								>成本差值:{{
									priceSum.primecost >= 0
										? "+" + priceSum.primecost
										: priceSum.primecost
								}}</el-tag
							>
						</div>
					</div>
				</div>
				<div class="Price_sum">
					<div class="right">
						<div class="price1">
							<el-tag>系统运费总和：{{ priceSum.systemPriceSum }}</el-tag>
						</div>
						<div class="price2">
							<el-tag class="ml-2" type="success"
								>实际运费总和：{{ priceSum.actualPriceSum }}</el-tag
							>
						</div>
						<div class="price3">
							<el-tag class="ml-2" type="warning"
								>实际运费差值:{{
									priceSum.sifference >= 0
										? "+" + priceSum.sifference
										: priceSum.sifference
								}}</el-tag
							>
						</div>
					</div>
				</div>
			</div>

			<SearchTable @exportList="exportWayList" :exports="true">
				<template #title>
					<div class="Tips">
						<div>双击全选Ctrl+V可复制</div>
					</div>
				</template>
				<template #button>
					<el-button
						:disabled="handSelectionList.length === 0"
						type="primary"
						size="small"
						@click="donlodLabel"
						>打印系统标签<el-icon><Download /></el-icon
					></el-button>
					<el-button
						:disabled="handSelectionList.length === 0"
						type="primary"
						size="small"
						@click="AddWorkOrder"
						>新增工单<el-icon class="M_left_10"><Document /></el-icon
					></el-button>

					<el-button
						:disabled="handSelectionList.length === 0"
						type="primary"
						size="small"
						class="M_right_10"
						@click="allDonlod"
						>批量下载税金单<el-icon class="M_left_10"><Coin /></el-icon
					></el-button>
				</template>
				<el-upload
					style="display: flex"
					class="upload-demo"
					ref="upload"
					action=""
					accept=".xls,.xlsx"
					multiple
					:show-file-list="false"
					:on-change="onUploadChange"
					:auto-upload="false"
				>
					<el-tooltip placement="bottom">
						<template v-slot:content>
							<a
								class="link-template"
								href="http://106.14.254.197:8083/%E5%AE%A2%E6%9C%8D-%E8%BF%90%E5%8D%95%E5%88%97%E8%A1%A8%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
								>查看导入模板</a
							>
						</template>
						<!-- <el-button :loading="uploadLoading" type="warning">导入</el-button> -->

						<div class="all_f_c">
							<el-button type="primary" link>导入</el-button>
							<svg-icon
								style="cursor: pointer"
								class="M_right_10"
								type="warning"
								:loading="uploadLoading"
								icon-class="download"
							/>
						</div>
					</el-tooltip>
				</el-upload>
			</SearchTable>
			<!-- {{ tableData }} -->
			<KYTable
				:loading="loading"
				ref="table"
				:colums="colums"
				:tableData="tableData"
				:total="total"
				:pagination="searchForm"
				:selection="true"
				:serialNumber="false"
				height="calc(100vh - 400px)"
				class="current"
				@handleCurrentChange="handSelect"
				:showAllSelect="multiple"
				@selection-change="handleSelectionChange"
				:pageSizeList="pageSizes"
				@page-change="currentChange($event)"
				@size-change="sizeChange($event)"
				:operationWidth="250"
			>
				<template v-slot:shipmentId="scope">
					<span class="opration" @click.prevent="handleedit(scope.row)">{{
						scope.row.shipmentId
					}}</span>
					<el-tooltip
						class="box-item"
						effect="dark"
						content="复制"
						placement="top"
					>
						<svg-icon
							style="cursor: pointer"
							@click="copy(scope.row.shipmentId)"
							icon-class="fuzhi"
						/>
					</el-tooltip>
				</template>
				<template v-slot:status="scope">
					<el-tag class="ml-2" :type="tagColor[scope.row.status]">{{
						Keystatus[scope.row.status]
					}}</el-tag>
				</template>

				<template v-slot:crossLineStatus="scope">
					<el-tag v-if="scope.row.crossLineStatus == 0" class="ml-2">{{
						CrossLineStatus[scope.row.crossLineStatus]
					}}</el-tag>
					<el-tag
						v-if="scope.row.crossLineStatus == 1"
						class="ml-2"
						type="success"
						>{{ CrossLineStatus[scope.row.crossLineStatus] }}</el-tag
					>
				</template>
				<template v-slot:wayBillPrice="scope">
					<span class="opration">{{ scope.row.wayBillPrice }}</span>
				</template>
				<template v-slot:costAccounting="scoper">
					<div v-if="isEditing(scoper.index, 'costAccounting')" class="all-t-l">
						<el-input-number
							ref="costAccounting"
							v-model="scoper.row.costAccounting"
							size="mini"
						/>
						<el-button type="primary" @click="sbmitCost(scoper.row, 0)" link
							>保存</el-button
						>
						<el-button type="danger" @click="cancel(scoper)" link
							>取消</el-button
						>
					</div>
					<!-- @blur="onEdit(scope.row, 'sort')" -->
					<template v-else>
						<div
							@mouseleave="closePopup"
							@mouseenter="
								scoper.row.forecastType === 1 &&
									handleClick(scoper.index, 'costAccounting')
							"
							style="width: 100%; min-height: 18px; height: 100%"
						>
							{{
								scoper.row.costAccounting == null
									? 0
									: scoper.row.costAccounting
							}}
							<el-icon
								v-if="isSortShow(scoper.index, 'costAccounting')"
								color="rgb(181, 181, 181)"
								@click="toEdit(scoper.index, 'costAccounting')"
								><EditPen
							/></el-icon>
							<el-popover
								placement="top"
								@show="
									scoper.row.forecastType != 1 &&
										popoverCostAccounting(scoper.row)
								"
								:width="scoper.row.forecastType != 1 ? 800 : 0"
								trigger="hover"
							>
								<template #reference>
									<svg-icon icon-class="gth" />
								</template>
								<KYTable
									v-if="scoper.row.forecastType != 1"
									ref="table"
									:colums="priceCostAccounting"
									:tableData="priceCostAccountingTable"
									:selection="false"
									:serialNumber="false"
									:loading="priceCostLoading"
									height="100px"
									class="current"
									:showAllSelect="multiple"
									:pageSizeList="pageSizes"
									:paginationShow="false"
								>
									<template v-slot:SFZ="scope">
										<div style="display: flex">
											<el-tag>{{
												scoper.row.wayBillCprice == "--"
													? 0
													: scoper.row.wayBillCprice
											}}</el-tag>
											<div>
												<svg-icon icon-class="chenghao" />
											</div>
											<el-tag>{{ scope.row.quantity }}</el-tag>

											<div>
												<svg-icon icon-class="dengyu" />
											</div>
											<div>
												<el-tag class="ml-2" type="danger">
													<span>
														{{ getCostAccountingNum(scoper.row, scope.row) }}
													</span>
												</el-tag>
											</div>
										</div>
									</template>
								</KYTable>
								<span v-else>由客服组输入</span>
							</el-popover>
						</div>
					</template>
					<!-- <span class="opration">{{ scoper.row.costAccounting }}</span> -->
				</template>
				<!-- 核算成本 -->
				<template v-slot:wayBillRealityPrice="scope">
					<span class="opration">{{ scope.row.wayBillRealityPrice }}</span>
					<svg-icon v-if="scope.row.isSure === 1" icon-class="sure" />
					<svg-icon v-if="scope.row.isSure === 0" icon-class="nosure" />
					<svg-icon v-if="scope.row.isSure === 2" class="sh" icon-class="sh" />
				</template>

				<template v-slot:declarationType="scope">
					<el-select
						v-model="scope.row.declarationType"
						class="m-2"
						placeholder="请选择报关方式"
						size="small"
						clearable
						@clear="handleClearType(scope.row)"
						@change="handleChangeType(scope.row)"
					>
						<el-option
							v-for="item in DeclarationTypes"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</template>
				<template #operation="scope">
					<!-- <el-button
						type="primary"
						icon="Edit"
						size="small"
						@click.prevent="donlodTax(scope.row)"
					>
						下载税金单
					</el-button> -->

					<el-button
						type="primary"
						icon="Edit"
						size="small"
						@click="handWayPrice(scope.row)"
					>
						调整费用
					</el-button>
					<el-button
						type="success"
						icon="Search"
						size="small"
						@click="handleUpdate(scope.row)"
					>
						查看审批
					</el-button>
					<!-- <el-button
						type="success"
						icon="Search"
						size="small"
						@click="handleUpdate(scope.row)"
					>
						打印标签
					</el-button> -->
				</template>
			</KYTable>
		</div>
		<!-- 运单详情的抽屉 -->
		<WayDrawer
			:seachId="seachId"
			v-if="drawer2"
			v-model:drawer="drawer2"
			:BasicsList="BasicsList"
			:searchRoute="searchRoute"
		/>
		<!-- 抽屉 -->

		<el-dialog
			v-model="allDonlodDialog"
			:title="'批量下载'"
			width="50%"
			:before-close="handleClose"
			:close-on-click-modal="false"
			destroy-on-close
		>
			<el-result v-if="allDonlods.noCanList == null" icon="success">
			</el-result>
			<div class="donlodUrl" v-if="allDonlods.canList != null">
				<el-button type="primary" @click="donlodTaxUrl">下载税金单</el-button>
			</div>
			<el-result v-else icon="error"> </el-result>
			<div class="content_top">
				<div>无法下载明细</div>
				<KYTable
					ref="table"
					:colums="allDonlodError"
					:tableData="allDonlods.noCanList"
					:total="total"
					:pagination="searchForm"
					:selection="false"
					:serialNumber="false"
					height="400px"
					class="current"
					:showAllSelect="multiple"
					:pageSizeList="pageSizes"
					:paginationShow="false"
				></KYTable>
			</div>
		</el-dialog>
		<el-dialog
			v-model="WorkOrderDialog"
			:title="'新增工单'"
			width="50%"
			:before-close="handleClose"
			:close-on-click-modal="false"
			destroy-on-close
			fullscreen
		>
			<AddWorkOrderList
				@routeGo="routeGo"
				:WayBillList="handSelectionList"
				:componentIf="true"
			/>
		</el-dialog>
		<!-- 完成工单 -->
		<el-dialog
			v-model="routeGoDialog"
			:title="'完成工单'"
			width="40%"
			:before-close="handleClose"
			:close-on-click-modal="false"
			destroy-on-close
		>
			<el-result icon="success" title="提交工单成功">
				<template #extra>
					<el-button type="primary" @click="goWorkOrder()"
						>跳转到工单列表页面</el-button
					>
				</template>
			</el-result>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="routeGoDialog = false"
						>确认</el-button
					>
				</span>
			</template>
			<!-- <AddWorkOrderList @routeGo="routeGo" :WayBillList="handSelectionList" :componentIf="true" /> -->
		</el-dialog>
		<!-- 弹出框 -->
		<el-dialog
			v-model="dialogVisibleWayPrice"
			:title="'费用详情'"
			width="80%"
			:before-close="handleClose"
			:close-on-click-modal="false"
			destroy-on-close
			fullscreen
		>
			<!-- style="padding: 20px" -->
			<PriceDetailAdjust
				ref="PriceDetailAdjust"
				@update="update"
				:actualWayPriceDateManualFlag="actualWayPriceDateManualFlag"
				:actualWayPriceDate="actualWayPriceDate"
				:systemWayPriceDate="systemWayPriceDate"
				:shipmentId="shipmentId"
			/>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitPrice()">确认费用</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog
			draggable
			v-model="dialogVisible"
			:title="dialogType == 2 ? '新增出库单' : '新增外配'"
			width="40%"
			:before-close="handleClose"
			:close-on-click-modal="false"
			destroy-on-close
		>
			<dialog-type-2
				v-model:dialogVisible="dialogVisible"
				v-if="dialogType == 2"
			></dialog-type-2>
			<dialog-type-3
				:addPredictFormData="addPredictFormData"
				v-model:dialogVisible="dialogVisible"
				v-if="dialogType == 3"
			></dialog-type-3>
		</el-dialog>
		<print-preview ref="preView" />
	</div>
</template>

<script>
import {
	QueryApplyBasicEntity,
	QueryApplyFlowEntities,
} from "@/api/billLad.js";
import printPreview from "./components/preview.vue";
import { menu } from "@/mixins/menu";
import { donlodLabel } from "@/mixins/donlodLabel";
import Search from "./components/search.vue";
import SearchTable from "@/components/searchTable/SearchTable.vue";
import { queryCustomerAccount } from "@/api/productForcast";
import { queryChannelServiceList } from "@/api/productForcast";
import PriceDetailAdjust from "@/components/corstPriceDetail/PriceDetailAdjust.vue";
import RouSeach from "@/components/rowSeach/Row-seach.vue";
import useClipboard from "vue-clipboard3";
import { ElMessage, ElMessageBox } from "element-plus";
import { pageSizes1 } from "@/utils/table-config";
import DialogType3 from "./components/dialogType3.vue";
import DialogType2 from "./components/dialogType2.vue";
import BasicInformation from "./components/BasicInformation.vue";
import AddWorkOrderList from "@/components/addWorkOrderList/addWorkOrderList.vue";
import DetailWrokOder from "./components/detailWrokOder.vue";
import Route from "./components/route.vue";
import WayDrawer from "@/components/wayDrawer/wayDrawer.vue";
import KYTable from "@/components/KY-table/KY-table.vue";
import moment from "moment";
import {
	UploadTaxUrl,
	IsCanDownTax,
	ExportWayBillData,
	QueryWayBillCostByShipmentId,
	UpdateWaybillCostAccount,
	QueryWayBillBasicCostAllList,
	SyncXZHWayBillData,
	ExportWayBill,
	QueryWayBillViewList,
	queryWayBillParceViewList,
	QueryWayBillDeclarationViewList,
	QueryXZHWayBillTracking,
	ImportWayBill,
	UpdateWayBill,
	SyncWayBillTrackng,
	PrinterWaybillTemplate,
	PrinterWaybillTemplateHtml,
} from "@/api/billLad.js";
export default {
	name: "predictNo",
	components: {
		Search,
		DialogType3,
		DialogType2,
		KYTable,
		PriceDetailAdjust,
		RouSeach,
		SearchTable,
		AddWorkOrderList,
		WayDrawer,
		printPreview,
	},
	data() {
		return {
			activeNames: [],
			allDonlodError: [
				{
					prop: "shipmentId",
					label: "KY单号",
				},
				{
					prop: "errorMessage",
					label: "原因",
				},
			],
			// 右击菜单所用
			colums: [
				{
					prop: "shipmentId",
					label: "运单号",
					fixed: true,
					minWidth: "140",
					slot: "shipmentId",
				},
				{
					prop: "status",
					label: "运单状态",
					slot: "status",
					minWidth: "90",
				},

				{
					prop: "customerCode",
					label: "用户编码",
					minWidth: "90",
				},
				{
					prop: "customerName",
					label: "用户名称",
					minWidth: "180",
				},

				{
					prop: "saleName",
					label: "销售负责人",
					minWidth: "100",
				},
				{
					prop: "systemDepartMentName",
					label: "客服组名称",
					minWidth: "100",
				},
				{
					prop: "billNo",
					label: "提单号",
					minWidth: "130",
				},
				{
					prop: "inForecastNum",
					label: "入仓号",
					minWidth: "130",
				},
				{
					prop: "channelServiceName",
					label: "渠道",
					minWidth: "130",
				},
				{
					prop: "productChineseName",
					label: "产品服务名称",
					minWidth: "180",
				},
				{
					prop: "parcelCount",
					label: "箱数",
					width: "60",
				},
				{
					prop: "crossLineStatus",
					label: "过线状态",
					slot: "crossLineStatus",
					minWidth: "110",
				},
				{
					prop: "chargeableWeight",
					label: "收费重",
					minWidth: "80",
				},
				{
					prop: "wayBillCprice",
					label: "C价",
					minWidth: "80",
				},
				{
					prop: "costAccounting",
					label: "核算成本",
					slot: "costAccounting",

					minWidth: "250",
				},
				{
					prop: "wayBillPrice",
					label: "应收费用",

					colums: [
						{
							prop: "wayBillPrice",
							label: "系统应收费用",
							minWidth: "110",
							slot: "wayBillPrice",
						},
						{
							prop: "wayBillRealityPrice",
							label: "实际应收费用",
							minWidth: "110",
							slot: "wayBillRealityPrice",
						},
					],
				},

				{
					prop: "pickTimeString",
					label: "拣货时间",
					minWidth: "110",
				},
				{
					prop: "country",
					label: "国家",
					minWidth: "80",
				},
				{
					prop: "declarationType",
					label: "报关方式",
					slot: "declarationType",
					minWidth: "180",
				},
			],
			channelList: [],
			DeclarationTypes: [
				{
					value: 1,
					label: "买单报关",
				},
				{
					value: 2,
					label: "退税报关",
				},
			],
			Keystatus: {
				ready: "已下单",
				picked: "已收货",
				in_transit: "转运中",
				delivered: "已签收",
				returned: "退件",
				cancelled: "已取消",
			},
			allDonlodDialog: false, //批量下载弹窗
			WorkOrderDialog: false, //批量新增工单弹窗
			routeGoDialog: false, //成功调整工单页面弹窗
			loading: true,

			tagColor: {
				ready: "",
				picked: "success",
				in_transit: "info",
				delivered: "warning",
				returned: "danger",
				cancelled: "",
			},
			isSureList: [
				{
					id: 0,
					label: "未申请",
				},
				{
					id: 1,
					label: "审核完成",
				},
				{
					id: 2,
					label: "审核中",
				},
			],
			CrossLineStatus: {
				0: "未全部过线",
				1: "全部过线",
			},

			CargoTabe: [],
			drawer2: false,

			pageSizes1,
			addPredictFormData: {
				inForecastNum: "",
				name: "",
				arr: [
					{
						ddgys: "",
						ddfylx: "",
						ddfy: "",
						ddfybz: "",
					},
				],
			},
			tableColums1: [
				{
					prop: "number",
					label: "箱号",
					width: "180",
					// fixed: true,
				},
				{
					prop: "extNumber",
					label: "扩展箱号",
					width: "120",
				},
				{
					prop: "trackingNumber",
					label: "客户箱号",
					width: "120",
				},
				{
					prop: "extNumber",
					label: "扩展箱号",
					width: "120",
				},
				{
					prop: "clientWeight",
					label: "客户重量",
					width: "120",
				},
				{
					prop: "clientLength",
					label: "客户长度",
					width: "120",
				},
				{
					prop: "clientWidth",
					label: "客户宽度",
					width: "120",
				},
				{
					prop: "clientHeight",
					label: "客户高度",
					width: "120",
				},
				{
					prop: "actualWeight",
					label: "实际重量",
					width: "120",
				},
				{
					prop: "chargeableWeight",
					label: "过线重量",
					width: "120",
				},
				{
					prop: "chargeableLength",
					label: "过线长度",
					width: "120",
				},
				{
					prop: "chargeableWidth",
					label: "过线宽度",
					width: "120",
				},
				{
					prop: "chargeableHeight",
					label: "过线高度",
					width: "120",
				},
				{
					prop: "carrierCode",
					label: "承运商编码",
					width: "120",
				},
			],
			tableData1: [],
			tableColums2: [
				{
					prop: "number",
					label: "箱号",
					width: "180",
					// fixed: true,
				},
				{
					prop: "extNumber",
					label: "扩展箱号",
					width: "120",
				},
				{
					prop: "sku",
					label: "Sku",
					width: "120",
				},
				{
					prop: "nameZh",
					label: "中文品名",
					width: "120",
				},
				{
					prop: "nameEn",
					label: "英文品名",
					width: "120",
				},
				{
					prop: "unitValue",
					label: "申报单价",
					width: "120",
				},
				{
					prop: "qty",
					label: "重量",
					width: "120",
				},
				{
					prop: "material",
					label: "材质",
					width: "120",
				},
				{
					prop: "usage",
					label: "用途",
					width: "120",
				},
				{
					prop: "brand",
					label: "品牌名称",
					width: "120",
				},
				{
					prop: "model",
					label: "型号",
					width: "120",
				},
				{
					prop: "salePrice",
					label: "销售价格",
					width: "120",
				},
				{
					prop: "saleUrl",
					label: "销售链接",
					width: "120",
				},
				{
					prop: "asin",
					label: "Asin",
					width: "120",
				},
				{
					prop: "fnsku",
					label: "fnsku",
					width: "120",
				},
				{
					prop: "weight",
					label: "单个产品重量",
					width: "120",
				},
				{
					prop: "size",
					label: "尺寸",
					width: "120",
				},
				{
					prop: "hscode",
					label: "海关编码",
					width: "120",
				},
				{
					prop: "photos",
					label: "照片",
					width: "120",
				},
				{
					prop: "dutyRate",
					label: "税率",
					width: "120",
				},
				{
					prop: "isBattery",
					label: "产品是否带电",
					width: "120",
				},
			],
			tableData2: [],
			seachId: "",
			dialogVisible: false,

			activeIndex: "1",
			billladingNo: "",
			// form: {
			// 	// waybillNo: undefined,
			// },
			uploadLoading: false,
			form: {
				type: 1,
				pageIndex: 1,
				pageSize: 10,
			},
			tableData: [],
			tableDataDetail: [], //表格原始值
			total: 0,
			pageSize: 10,
			pageIndex: 1,
			searchForm: {
				id: 0,
			},

			dialogType: 1, // 1 关联提单 2 新增出库单 3 新增外配
			searchRoute: {
				shipmentId: "",
				customerAccessToken: "",
			},
			BasicsList: [],
			Status: "",
			dialogVisibleWayPrice: false,
			// wayPricCloms: [],
			systemWayPriceDate: [{}],
			actualWayPriceDate: [{}],
			actualWayPriceDateManualFlag: [{}], // 传入对比值
			handSelectionList: [],
			priceSum: {
				costAccountingSum: 0,
				systemPriceSum: 0,
				actualPriceSum: 0,
				sifference: 0,
				primecost: 0,
			},
			exportLoading: false,
			customerCodeList: [],
			allDonlods: {}, //批量下载集合
			open: false,
			priceCostAccounting: [],
			priceCostAccountingTable: [{}],
			priceCostLoading: false,
			sort: "", //
			curEditItem: "",
		};
	},
	mixins: [menu, donlodLabel],
	mounted() {
		this.initList();
		this.getChannelList();
		this.getCustomerCodeList(); //获取用户名称
	},
	created() {
		this.getPickingTime();
	},
	computed: {},
	methods: {
		// 打印系统标签
		async donlodLabel() {
			// console.log(this.handSelectionList);
			let res = await PrinterWaybillTemplate({
				waybillId: this.handSelectionList[0].id,
			});
			// 			let res = await PrinterWaybillTemplateHtml({
			// 	waybillId: this.handSelectionList[0].id,
			// });
			this.lableLoad(res);
		},
		// 点击进行编辑
		toEdit(index, key) {
			this.curEditItem = key + "-" + index;
			this.$nextTick(() => {
				this.$refs[key].focus();
			});
		},
		// 取消修改
		cancel(scoper) {
			console.log(this.tableDataDetail);
			console.log(scoper);
			this.tableData[scoper.index].costAccounting =
				this.tableDataDetail[scoper.index].costAccounting;
			this.curEditItem = "";
		},
		handleClick(index, key) {
			console.log(key);

			this.sort = key + "-" + index;
		},
		// 保存费用
		async sbmitCost(row, type) {
			console.log(row);
			let { code, message } = await UpdateWaybillCostAccount({
				id: row.id,
				costAccounting: row.costAccounting,
			});

			this.$message({ type: code == 200 ? "success" : "error", message });
			if (code === 200) {
				this.curEditItem = "";
			}
			// this.getCorstData();
		},
		isSortShow(index, key) {
			console.log(key, index);
			return this.sort === key + "-" + index;
		},
		isEditing(index, key) {
			return this.curEditItem === key + "-" + index;
		},
		// 计算费用 row:主页面的表格  row1：核算成本弹出表格的数据
		getCostAccountingNum(row, row1) {
			return (
				(row.wayBillCprice == "--" ? 0 : row.wayBillCprice) * row1.quantity
			).toFixed(2);
		},
		// 核算成本查询费用明细
		async popoverCostAccounting(row) {
			this.priceCostLoading = true;
			// this.priceCostAccounting = []
			// 获取表头
			let tableColums = [];
			let res = await QueryWayBillBasicCostAllList({
				type: 0,
			});
			res.forEach((item) => {
				if (item.costCode === "SFZ") {
					tableColums.push({
						prop: item.costCode,
						label: item.costName,
						slot: item.costCode,
						minWidth: 230,
					});
				} else {
					tableColums.push({
						prop: item.costCode,
						label: item.costName,
						minWidth: 180,
					});
				}
			});
			// 获取费用数据
			let ret = await QueryWayBillCostByShipmentId({
				shipmentId: row.shipmentId,
			});
			ret.wayBillRealityCostEntitieList.forEach((item) => {
				// costPrice
				this.priceCostAccountingTable[0][item.costCode] = item.costPrice;
			});
			ret.wayBillCostViewModelList.forEach((item) => {
				// this.priceCostAccountingTable[0][item.costCode] = item.costPrice;
				for (const key in this.priceCostAccountingTable[0]) {
					if (item.costCode === "QGF" && key === "QGF") {
						this.priceCostAccountingTable[0][key] = item.costPrice;
					}
					if (item.costCode === "CPMF" && key === "CPMF") {
						this.priceCostAccountingTable[0][key] = item.costPrice;
					}
					if (item.costCode === "BGF" && key === "BGF") {
						this.priceCostAccountingTable[0][key] = item.costPrice;
					}
					if (item.costCode === "SFZ" && key === "SFZ") {
						// 收费重
						this.priceCostAccountingTable[0].quantity =
							item.quantity == null ? 0 : item.quantity;
					}
				}
			});

			this.priceCostAccounting = tableColums;
			this.priceCostLoading = false;
			console.log(this.priceCostAccountingTable);
		},
		routeGo() {
			this.routeGoDialog = true;
			this.WorkOrderDialog = false;
		},
		goWorkOrder() {
			this.$router.push({
				path: "/workOrder/workList/workOrderList",
				query: {
					type: 2,
				},
			});
		},
		// 批量新增工单
		AddWorkOrder() {
			console.log(this.handSelectionList);
			this.WorkOrderDialog = true;
		},
		async handleUpdate(row) {
			this.$router.push({
				path: "/customerManagement/singleAndtransport/bpmCorstHistoryWay",
				query: row,
			});
		},
		async donlodTaxUrl() {
			let arr = [];
			this.allDonlods.canList.forEach((item) => {
				arr.push(item.waybillId);
			});
			let res = await UploadTaxUrl({
				waybillIdList: arr,
			});
			res.forEach((item) => {
				this.$Utils.donlod(item);
			});
			this.allDonlods = {};
			this.$refs.table.clearSelection();
			this.allDonlodDialog = false;
		},
		async allDonlod() {
			let arr = [];
			this.handSelectionList.forEach((item) => {
				arr.push(item.id);
			});
			let res = await IsCanDownTax({
				waybillIdList: arr,
			});
			this.allDonlods = res;
			this.allDonlodDialog = true;
		},
		async donlodTax(row) {
			let { code, message } = await IsCanDownTax({
				id: row.id,
			});
			let res = await UploadTaxUrl({
				wayBillId: row.id,
			});
			this.$message({ type: code == 200 ? "success" : "error", message });
			if (code === 200) {
				res.forEach((item1) => {
					if (item1 != null) {
						this.$Utils.donlod(item1);
					}
				});
			}
		},
		goCompensate(row) {
			this.$router.push({
				path: "/customerManagement/singleAndtransport/compensate",
				query: row,
			});
		},
		// 获取拣货时间
		getPickingTime() {
			var date1 = new Date();
			var date2 = new Date(date1);
			//-30为30天前，+30可以获得30天后的日期
			date2.setDate(date1.getDate() - 7);

			this.searchForm.pickingTimeStart = this.$Utils.dateFormat(
				date2,
				"yyyy-MM-dd"
			);

			this.searchForm.pickingTimeEnd = this.$Utils.dateFormat(
				new Date(),
				"yyyy-MM-dd"
			);
		},
		// 导入
		async onUploadChange(file) {
			try {
				if (this.uploadLoading) return;
				var loading = this.$loading({
					lock: true,
					text: "正在导入...",
					background: "rgba(0, 0, 0, 0.7)",
				});
				const formdata = new FormData();
				formdata.append("file", file.raw);
				const res = await ImportWayBill(formdata);
				console.log(res);
				const { code, message, state } = res;
				if (code === 200) {
					this.$message({
						message: message,
						type: state ? "success" : "warning",
					});
					if (state) this.onSearch();
				}
				loading.close();
			} catch (error) {
				loading.close();
				console.log(error);
			}
		},
		async getCustomerCodeList() {
			try {
				const res = await queryCustomerAccount();
				console.log(res);
				this.customerCodeList = res;
				this.customerCodeList.forEach(
					(item) =>
						(item.customerName = `${item.customerName}(${item.customerCode})`)
				);
			} catch (err) {
				console.log(err);
			}
		},
		// 导出运单
		exportWayList() {
			this.$Utils.exportsPost(
				"/api/WayBill/ExportWayBillData",
				{
					pageSize: this.form.pageSize,
					pageIndex: this.form.pageIndex,
					...this.searchForm,
					Status: this.Status,
				},
				"运单_"
			);
		},
		// 费用确认
		async submitPrice() {
			console.log(
				this.actualWayPriceDateManualFlag,
				this.actualWayPriceDate,
				this.systemWayPriceDate
			);
			var loading = this.$loading({
				lock: true,
				text: "正在提交...",
				background: "rgba(0, 0, 0, 0.7)",
			});
			this.$refs.PriceDetailAdjust.submitPrice().then((res) => {
				this.dialogVisibleWayPrice = false;
				loading.close();
			});
		},
		async getChannelList(val) {
			const res = await queryChannelServiceList();
			this.channelList = res;
		},
		async copy(item) {
			const { toClipboard } = useClipboard();
			console.log(item);
			try {
				await toClipboard(item);
				this.$message.success("复制成功");
			} catch (e) {
				console.error(e);
			}
		},
		handleSelectionChange(item) {
			console.log(item);
			this.handSelectionList = item;
		},
		async handWayPrice(row, i = 0) {
			console.log(row);
			// i判断为防止更新抖动
			i == 0 && (this.systemWayPriceDate = [{}]);
			i == 0 && (this.actualWayPriceDate = [{}]);
			this.shipmentId = row.shipmentId;
			let res = await QueryWayBillBasicCostAllList({
				type: 0,
			});
			let ret = await QueryWayBillCostByShipmentId({
				shipmentId: row.shipmentId,
			});
			this.systemWayPriceDate = JSON.parse(JSON.stringify(res));
			this.actualWayPriceDate = JSON.parse(JSON.stringify(res));
			if (
				ret.wayBillCostViewModelList !== null &&
				ret.wayBillCostViewModelList.length > 0
			) {
				this.systemWayPriceDate.forEach((item1, index1) => {
					ret.wayBillCostViewModelList.forEach((item, index) => {
						if (item1.costCode === item.costCode) {
							this.systemWayPriceDate[index1].costPrice = item.costPrice;
							this.systemWayPriceDate[index1].wayBillId = row.id;
							this.systemWayPriceDate[index1].quantity = item.quantity;
							this.systemWayPriceDate[index1].unitPrice = item.unitPrice;
						}
					});
				});
			}
			if (
				ret.wayBillRealityCostEntitieList != null &&
				ret.wayBillRealityCostEntitieList.length > 0
			) {
				this.actualWayPriceDate.forEach((item1, index1) => {
					ret.wayBillRealityCostEntitieList.forEach((item, index) => {
						if (item1.costCode === item.costCode) {
							this.actualWayPriceDate[index1].costPrice = item.costPrice;
							this.actualWayPriceDate[index1].remark = item.remark;
							this.actualWayPriceDate[index1].quantity = item.quantity;
							this.actualWayPriceDate[index1].unitPrice = item.unitPrice;
							this.actualWayPriceDate[index1].id = item.id;
							this.actualWayPriceDate[index1].shipmentId = row.shipmentId;
							this.actualWayPriceDate[index1].manualFlag = item.manualFlag;
							this.actualWayPriceDate[index1].verificationStatus =
								item.verificationStatus;
							this.actualWayPriceDate[index1].costCode = item.costCode;
						}
					});
				});
			} else {
				this.actualWayPriceDate.forEach((item1, index1) => {
					this.actualWayPriceDate[index1].costPrice = 0;
					this.actualWayPriceDate[index1].quantity = 0;
					this.actualWayPriceDate[index1].unitPrice = 0;
					this.actualWayPriceDate[index1].remark = "";
					this.actualWayPriceDate[index1].id = 0;
					this.actualWayPriceDate[index1].shipmentId = row.shipmentId;
					this.actualWayPriceDate[index1].manualFlag = 0;
				});
			}
			this.actualWayPriceDateManualFlag = JSON.parse(
				JSON.stringify(this.actualWayPriceDate)
			);
			i == 0 && (this.dialogVisibleWayPrice = true);

			console.log(this.actualWayPriceDate);
		},
		update(row) {
			this.handWayPrice(row, 1);
		},

		setSteps(index) {
			this.active = index;
			index == 1 && this.getQueryWayBillParceViewList();
			index == 2 && this.GetQueryWayBillDeclarationViewList();
			index == 3 && this.getQueryXZHWayBillTracking();
		},

		async getXZHway() {
			ElMessageBox.confirm("是否同步新智慧数据?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					var loading = this.$loading({
						lock: true,
						text: "正在同步...",
						background: "rgba(0, 0, 0, 0.7)",
					});
					let shipmentId = [];
					this.handSelectionList.forEach((item) => {
						shipmentId.push(item.shipmentId);
					});
					// shipmentId.join(",");
					try {
						let res = await SyncXZHWayBillData({
							shipmentId: shipmentId.join(","),
						});
						this.$message({
							message: res.message,
							type: "success",
						});
						loading.close();
						this.initList();
					} catch (error) {
						loading.close();
					}
				})
				.catch(() => {
					ElMessage({
						type: "info",
						message: "已取消",
					});
					this.initList();
				});
		},
		async getXZHTrackng() {
			ElMessageBox.confirm("是否同步新智慧数据?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					const loading = this.$loading({
						lock: true,
						text: "正在同步...",
						background: "rgba(0, 0, 0, 0.7)",
					});
					let shipmentId = [];
					this.handSelectionList.forEach((item) => {
						shipmentId.push(item.shipmentId);
					});
					try {
						let res = await SyncWayBillTrackng({
							shipmentId: shipmentId.join(","),
						});
						this.$message({
							message: res.message,
							type: "success",
						});
						loading.close();
						this.initList();
					} catch (error) {
						loading.close();
					}
				})
				.catch(() => {
					ElMessage({
						type: "info",
						message: "已取消",
					});
					this.initList();
				});
		},
		handleedit(row) {
			this.BasicsList = row;
			this.searchRoute.shipmentId = row.shipmentId;
			this.searchRoute.customerAccessToken = row.customerAccessToken;
			this.seachId = row.id;
			this.active = 1;
			console.log(row, this.drawer2);
			// this.activeNames = [1];
			this.drawer2 = true;
			// this.dialogType = 2;
			// this.addPredictFormData = row;
		},

		showDialog(type) {
			// type 1关联提单 2新增出库单 3新增外配
			this.dialogType = type;
			if (type == 1) {
				this.getQueryWayBillParceViewList();

				this.dialogVisible = true;
			}

			if (type == 2) {
				this.dialogVisible = true;
			}
			if (type == 3) {
				this.dialogVisible = true;
			}
		},

		handleSelect(index) {
			console.log(index);
			this.activeIndex = index;
			this.pageIndex = 1;
			this.form.pageIndex = 1;
			let Status = "";
			index == 2 && (Status = "ready");
			index == 3 && (Status = "picked");
			index == 4 && (Status = "in_transit");
			index == 5 && (Status = "delivered");
			index == 6 && (Status = "returned");
			index == 7 && (Status = "cancelled");
			this.Status = Status;
			this.initList(this.searchForm, this.form.pageSize, this.form.pageIndex);
		},
		wayBillGet() {
			// this.activeIndex = 7;
			// this.Status = "";
			this.priceSum = {
				costAccountingSum: 0,
				systemPriceSum: 0,
				actualPriceSum: 0,
				sifference: 0,
				primecost: 0,
			};

			this.searchForm.channelServiceId =
				this.searchForm.channelServiceId == ""
					? -1
					: this.searchForm.channelServiceId;
			this.searchForm.isSure =
				this.searchForm.isSure === "" ? -1 : this.searchForm.isSure;
			this.initList(
				this.searchForm.wayBillNo,
				this.form.pageSize,
				this.form.pageIndex
			);
			this.searchForm.channelServiceId == -1 &&
				delete this.searchForm.channelServiceId;
			this.searchForm.isSure == -1 && delete this.searchForm.isSure;
		},

		Export() {
			ExportWayBill({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				...this.searchForm,
				Status: this.Status,
			})
				.then((res) => {
					this.exportLoading = false;
					const currTime = moment().format("YYYYMMDDHHmmss");
					let blob = new Blob([res], { type: res.type });
					if (window.navigator && window.navigator.msSaveOrOpenBlob) {
						window.navigator.msSaveOrOpenBlob(res, `运单数据${currTime}.xls`);
					} else {
						let downloadElement = document.createElement("a");
						let href = window.URL.createObjectURL(blob);
						downloadElement.href = href;
						downloadElement.download = `运单数据${currTime}.xls`;
						document.body.appendChild(downloadElement);
						downloadElement.click();
						document.body.removeChild(downloadElement);
						window.URL.revokeObjectURL(href);
					}
				})
				.catch(function (err) {
					this.exportLoading = false;
					console.log(err);
				});
		},
		async handleChangeType(val) {
			console.log(val);
			if (val.declarationType != "") {
				let res = await UpdateWayBill({
					id: val.id,
					declarationType: val.declarationType,
				});
				console.log(res);
				if (res.code === 200) {
					this.$message({
						message: res.message,
						type: "success",
					});
					this.initList();
				} else {
					this.$message({
						message: res.message,
						type: "warning",
					});
				}
			}
			// this.initList();
		},
		async handleClearType(val) {
			console.log(val);
			let res = await UpdateWayBill({
				id: val.id,
				declarationType: 0,
			});
			console.log(res);
			if (res.code === 200) {
				this.$message({
					message: res.message,
					type: "success",
				});
				this.initList();
			} else {
				this.$message({
					message: res.message,
					type: "warning",
				});
			}
			// this.initList();
		},
		async initList(search, pageSize = 10, pageIndex = 1) {
			this.tableData = [];
			// 全局loading
			// const loading = this.$loading({
			// 	lock: true,
			// 	text: "正在查询...",
			// 	background: "rgba(0, 0, 0, 0.7)",
			// });
			this.loading = true;
			try {
				console.log(search);
				// search.clearanceType = 0;
				const res = await QueryWayBillViewList({
					pageIndex,
					pageSize,
					...this.searchForm,
					customerId:
						this.searchForm.customerId === "" ? 0 : this.searchForm.customerId,
					Status: this.Status,
				});

				console.log(res);
				this.loading = false;
				if (res.code === 200) {
					// loading.close();
					this.loading = false;
					const { data, total } = res;
					this.tableData = data;
					this.priceSum = {
						costAccountingSum: 0,
						systemPriceSum: 0,
						actualPriceSum: 0,
						sifference: 0,
						primecost: 0,
					};
					if (this.tableData !== null) {
						this.tableData = this.$Utils.placeholder(this.tableData);
						this.tableDataDetail = JSON.parse(
							JSON.stringify(this.$Utils.placeholder(this.tableData))
						);

						// 计算运费差值
						this.tableData.forEach((item) => {
							item.wayBillPrice =
								item.wayBillPrice === "--" ? 0 : item.wayBillPrice;
							item.wayBillRealityPrice =
								item.wayBillRealityPrice === "--"
									? 0
									: item.wayBillRealityPrice;
							this.priceSum.systemPriceSum += item.wayBillPrice;
							this.priceSum.actualPriceSum += item.wayBillRealityPrice;
							this.priceSum.costAccountingSum += item.costAccounting;

							this.priceSum.sifference =
								this.priceSum.actualPriceSum - this.priceSum.systemPriceSum;
							this.priceSum.primecost =
								this.priceSum.actualPriceSum - this.priceSum.costAccountingSum;
						});
						this.priceSum = {
							costAccountingSum: this.priceSum.costAccountingSum.toFixed(2),
							systemPriceSum: this.priceSum.systemPriceSum.toFixed(2),
							actualPriceSum: this.priceSum.actualPriceSum.toFixed(2),
							sifference: this.priceSum.sifference.toFixed(2),
							primecost: this.priceSum.primecost.toFixed(2),
						};
						this.total = total;
						console.log(this.tableData);
					} else {
						this.tableData = [];
						this.total = total;
					}
				}
			} catch (error) {
				this.loading = false;
				console.log(error);
			}
		},
		// 列表翻页
		pageChange(pageIndex) {
			this.pageIndex = pageIndex;
			this.initList(this.searchForm, this.pageSize, pageIndex);
		},
		// 列表翻页
		// onSearch(form) {
		// 	this.searchForm = form;
		// 	this.initList(this.searchForm, this.pageSize, this.pageIndex);
		// },
		// 列表翻页
		sizeChange(i) {
			console.log(i);
			// this.pageIndex = i.pageIndex;
			this.form.pageSize = i.pageSize;
			this.initList(this.searchForm, this.form.pageSize, this.form.pageIndex);
		},
		currentChange(i) {
			this.form.pageIndex = i.pageIndex;
			this.initList(this.searchForm, this.form.pageSize, this.form.pageIndex);
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .content_top {
	background: #fff;
	margin-bottom: 10px;
	padding: 10px 0px 10px 20px;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 3px 6px #eaf1fc;
	.el-form-item__label {
		font-weight: 400 !important;
	}
	.content_top_title {
		width: 88px;
		height: 23px;
		font-size: 14px;
		font-weight: 500;
		line-height: 27px;
		color: #1e1e1e;
		letter-spacing: 5px;
		opacity: 1;
		margin-bottom: 5px;
	}
	svg {
		width: 14px;
		vertical-align: middle;
	}
	.tr {
		width: 100%;
		height: 1px;
		background: rgba(242, 242, 242, 1);
		opacity: 1;
		margin-bottom: 20px;
	}
}
.content_table {
	background-color: #fff;

	box-shadow: 0px 3px 6px #eaf1fc;
	padding: 10px 10px 30px 10px;
}
::v-deep .el-drawer__header {
	align-items: center;
	color: #72767b;
	display: flex;
	margin-bottom: -30px;
	padding: var(--el-drawer-padding-primary);
	padding-bottom: 0;
}
.search_box {
	position: relative;

	.rt_box {
		position: absolute;
		right: 0;
		top: 0;
		.mr10 {
			margin-right: 0;
		}
	}
}
.link-template {
	color: #409eff;
	&:hover {
		text-decoration: underline;
	}
}
::v-deep .el-dialog__body {
	padding: 0 20px 50px 20px !important;
}
.content_box {
	padding: 10px 30px 30px 30px;
	overflow: auto;
	.pagination_box {
		display: flex;
		margin-top: 30px;
		flex-direction: row;
		justify-content: center;
	}
}
#sum_box {
	width: 100%;
	height: 100px;
	// background-color: red;
	display: flex;
	padding: 10px;
	justify-content: space-between;
	.state {
		margin-right: 10px;
		width: 340px;
		height: 80px;
		background-color: #f0f2f5;
		display: flex;
		justify-content: space-evenly;
		.text {
			width: 80%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			div {
				margin-left: 15px;
				width: 100%;
			}
			.top {
				font-weight: bold;
				color: #777777;
			}
			.bottom {
				font-size: 12px;
				color: #777777;
				margin-top: 10px;
			}
		}
		.svg {
			width: 20%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
.el-steps {
	// 移入变手
	cursor: pointer !important;
}
.Tips {
	color: #ff4343;
	font-size: 12px;
	// transform: scale(0.8);
	div {
		width: 130px;
		transform: scale(0.9);
	}
}
.opration {
	color: #409eff;
	margin-right: 12px;
	font-size: 14px;
	cursor: pointer;
}
.el-dialog__body {
	padding-bottom: 20px !important;
}
.priceSum {
	margin: 5px 0 5px 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	.Price_sum {
		.right {
			flex: 1;
			display: flex;
			justify-content: space-between;
			div {
				margin: 0 5px;
			}
		}
	}
}
::v-deep .donlodUrl {
	padding: 20px;
	.el-button {
		width: 100%;
	}
}
::v-deep .sh {
	width: 1.2em !important;
	height: 1.2em !important;
}
::v-deep .el-collapse-item__header {
	color: var(--el-text-color-primary);
	font-size: 16px;
	font-weight: 700;
}
.priceContent {
	margin-bottom: 5px;
	display: flex;
	align-items: center;
}
</style>
