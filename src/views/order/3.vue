<template>
    <div>
        <!-- table -->
		<div class="table-wrap">
			<search placeholder="请输入工资单编号、企业名称、工人姓名搜索" @search="handleSearch" @reset="handleReset"/>
			<el-table :data="tableData" tooltip-effect="dark" style="width: 100%; margin-top: 20px">
				<el-table-column prop="order_code" label="工资单编号"/>
				<el-table-column prop="pay_amount" label="共计金额（元）" />
				<el-table-column prop="company_name" label="企业名称"/>
				<el-table-column prop="employee_name" label="财务名称"/>
				<el-table-column prop="worker_name" label="工人姓名"/>
				<el-table-column prop="card_number" label="身份证号"/>
				<el-table-column label="操作" width="170">
					<template slot-scope="scope">
						<p class="table-handle">
							<span @click="detail(scope.row.payroll_id)">查看详情</span>
						</p>
					</template>
				</el-table-column>
			</el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
    </div>
</template>

<script>
	import { getList } from '../../api/order'
    export default {
        components: {
        },
        data() {
			return {
                content: '',          // 搜索
				page: 1,              // 当前页数
                total: 0,            // 总条数
                tableData: [],
                id: '',
				img: [],              // 相对路径
				img_detail: []        // 绝对路径
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
						content: this.content,
						status: 3
				})
				.then(res => {
					if(res.data.code === 200) {
						this.total = res.data.data.total
						this.tableData = res.data.data.data
					}
				})
			},
			// 搜素
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
			// 详情
            detail(id) {
                this.$router.push(`/order/detail/${id}`)
            },
		},
		created() {
			this.getList()
		}
    }
</script>

<style lang="scss" scoped>

</style>