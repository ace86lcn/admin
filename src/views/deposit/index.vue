<template>
    <div>
		<div class="detail">
			<search placeholder="请输入公司名称、财务名称搜索"
					@search="handleSearch"
					@reset="handleReset"/>
			<!-- table -->
			<div class="table-wrap">
				<el-table :data="tableData"
							tooltip-effect="dark"
							style="width: 100%; margin-top: 20px">
					<el-table-column prop="company_name"
									label="企业名称"/>
					<el-table-column prop="company_code"
									label="社会统一信用代码"/>
					<el-table-column prop="name"
									label="财务姓名"/>
					<el-table-column prop="phone"
									label="登录手机号"/>
					<el-table-column prop="account"
									label="财务账号"/>
					<el-table-column prop="balance"
									label="保证金余额"/>
				</el-table>
				<!-- 分页 -->
				<pages :page.sync="page" :total="total"/>
			</div>
		</div>
    </div>
</template>

<script>
 import { getList } from '../../api/deposit'
    export default {
        data() {
			return {
                content: '',                 // 搜索
				page: 1,                    // 当前页数
                total: 0,                   // 总条数
				tableData: [],
				id: '',                    // id
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
			handleSearch(val) {
                this.content = val
				this.page = 1
				this.getList()
            },
            handleReset() {
                this.content = ''
				this.page = 1
				this.getList()
            },
		},
		created() {
			this.getList()
		}
    }
</script>

<style lang="scss" scoped>
	.select-title {
		font-size: 18px;
		padding-right: 26px;
		color: #666;
		font-weight: 600;
	}
    .search, .table-wrap {
		padding: 0 !important;
	}
</style>