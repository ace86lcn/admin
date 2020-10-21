<template>
    <div>
        <!-- 客服电话 -->
		<div class="detail">
			<search placeholder="请输入SIM卡号、设备号搜索"
					@search="handleSearch"
					@reset="handleReset"/>
			<div class="btn">
				<el-button type="primary" @click="add">新增绑定</el-button>
			</div>
			<!-- table -->
			<div class="table-wrap">
				<el-table :data="tableData"
							tooltip-effect="dark"
							style="width: 100%; margin-top: 20px">
					<el-table-column prop="sim_number"
									label="SIM卡号"/>
					<el-table-column prop="hand_code"
									label="设备号"/>
					<el-table-column
						label="操作"
						width="120">
						<template slot-scope="scope">
							<p class="table-handle">
								<span @click="edit(scope.row.id)">编辑</span>
								<span @click="del1(scope.row.id)">删除</span>
							</p>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<pages :page.sync="page" :total="total"/>
			</div>
			<!-- 删除弹窗 -->
			<handle-dialog  :show="del_show"
							content="删除后将不能恢复，确认删除？"
							@close="del_show = false"
							@confirm="del2"/>
			<!-- 编辑弹窗 -->
			<form-dialog :show="input_show"
						 :id="id"
						 @close="input_show = false"
						 @confirm="handleConfirm"/>
		</div>
    </div>
</template>

<script>
	import { getList, handleDelete } from '../../api/sim'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog'),
			'FormDialog': () => import('./components/FormDialog')
        },
        data() {
			return {
                content: '',                   // 搜索
				page: 1,                       // 当前页数
                total: 0,                      // 总条数
				tableData: [],
				id: '',
				del_show: false,              // 删除弹窗
				input_show: false             // 编辑弹窗
			}
		},
		watch: {
            'page'(val) {
                this.getList()
            }
        },
		methods: {
			getList() {
                this.$http(getList, {
						page: this.page,
						content: this.content
				})
				.then(res => {
					if(res.data.code === 200) {
						this.total = res.data.data.total
						this.tableData = res.data.data.data
					}
				})
			},
			// 搜索
			handleSearch(val) {
                this.content = val
				this.page = 1
				this.getList()
			},
			// 重置
            handleReset() {
                this.content = ''
				this.page = 1
				this.getList()
			},
			// 新增
			add() {
				this.id = ''
				this.input_show = true
			},
			// 编辑
			edit(id) {
				this.id = id+''
				this.input_show = true
			},
			// 删除
			del1(id) {
				this.id = id
				this.del_show = true
			},
			// 确认删除
			del2() {
				this.$http(handleDelete, {
						id: this.id
				})
				.then(res => {
					if(res.data.code === 200) {
						this.$msg.Success('删除成功')
						this.del_show = false
						this.getList()
					}
				})
			},
			handleConfirm() {
				this.input_show = false
				this.getList()
			}
		}, 
		created() {
			this.getList()
		}
    }
</script>

<style lang="scss" scoped>
    .search, .table-wrap {
		padding: 0 !important;
	}
	.btn {
		text-align: right;
	}
</style>