<template>
  <div class="table-wrap">
      <el-table :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%; margin-top: 20px">
				<el-table-column prop="name"
                                 width="150"
								label="用户名"/>
				<el-table-column prop="mobile"
								label="注册手机号"
                                width="300"
                                />
				<el-table-column prop="create_time"
								label="提交时间"
                                width="300"
                                />
				<el-table-column prop="content"
                                
								label="反馈内容"/>
			</el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
  </div>
</template>

<script>
import { getList } from '../../api/feed'
export default {
    data () {
        return {
            page: 1,
            total: 0,
            tableData:[]
        }
    },
    watch: {
        'page'(val) {
            this.getList()
        }
    },
    methods: {
        getList () {
            this.$http(getList, {
                    page: this.page
            })
            .then(res => {
                if (res.data.code == 200) {
                    this.tableData = res.data.data.data
                    this.total = res.data.data.total
                }
            })
        }
    },
    created () {
        this.getList()
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .el-table__header-wrapper{
        font-size:14px;
        color:#666;
        font-weight:bold;
    }
</style>