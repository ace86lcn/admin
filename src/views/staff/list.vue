<template>
    <div>
        <!-- table -->
		<div class="table-wrap">
			<search placeholder="请输入姓名、身份证号搜索"
					@search="handleSearch"
					@reset="handleReset"/>
			<el-table :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%; margin-top: 20px">
				<el-table-column prop="name" label="姓名"/>
				<el-table-column prop="card_number" label="身份证号"/>
				<el-table-column prop="edit_time" label="审核通过时间"/>
				<el-table-column
					label="操作"
					width="120">
					<template slot-scope="scope">
						<p class="table-handle">
							<span @click="detail(scope.row.id)">查看详情</span>
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
	import { getList } from '../../api/staff'
    export default {
        data() {
			return {
                content: '',            // 搜索
				page: 1,                // 当前页数
                total: 0,               // 总条数
				tableData: []
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
						type: 1
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
			// 详情
            detail(id) {
                this.$router.push(`/staff/detail/${id}?type=2`)
            }
		},
		created() {
			this.getList()
		}
    }
</script>

<style lang="scss" scoped>
</style>