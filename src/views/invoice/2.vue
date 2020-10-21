<template>
    <div>
		<div class="detail">
			 <div class="screen">
            <p>筛选:</p>
            <div class="block">
                <span class="demonstration">日期：</span>
                <el-date-picker
                    v-model="start_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    >
                </el-date-picker>
                至
                <el-date-picker
                    v-model="end_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                   >
                </el-date-picker>
            </div>
        </div>
			<search placeholder="请输入发票抬头搜索"
					@search="handleSearch"
					@reset="handleReset"/>
			<!-- table -->
			<div class="table-wrap">
				<el-table :data="tableData"
							tooltip-effect="dark"
							style="width: 100%; margin-top: 20px">
					<el-table-column prop="detail_code"
									label="开具时间"/>
					<el-table-column prop="order_code"
									label="发票抬头"/>
					<el-table-column prop="name"
									label="发票总金额（元）"/>
					<el-table-column prop="card_number"
									label="发票明细"/>
					<el-table-column
                        label="操作"
                        width="170">
                        <template >
                            <p class="table-handle">
                                <span @click="detail()">详情</span>
                            </p>
                        </template>
                    </el-table-column>
				</el-table>
				<!-- 分页 -->
				<pages :page.sync="page" :total="total"/>
			</div>
		</div>
    </div>
</template>

<script>
  import { getList } from '../../api/invoice'
    export default {
        data() {
			return {
                content: '',                    // 搜索
				page: 1,                        // 当前页数
				total: 0,                       // 列表总数
				tableData: [],
				start_time: '',                 // 开始时间
                end_time: '',                   // 结束时间
			}
		},
		watch: {
            'page'(val) {
                this.getList()
            }
        },
		methods: {
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
			radioChange() {
				this.page = 1
				this.getList()
			},
			getdatatime(someday){//默认显示前三个月
				someday = someday || new Date;
				// this.start_time= new Date(someday.getTime() - 3600 *24 *1000);
				var now = new Date();
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(someday.getTime() - 3600 *24 *1000) ; //得到日期
				month = month + 1;
				month = month.toString().padStart(2, "0") - 3;
				date = date.toString().padStart(2, "0") ;
				var defaultDate1 = `${year}-${month}-${date}`;
				this.start_time = defaultDate1
				console.log(this.start_time)
			},
			getdatatime1(){//默认显示今天
				var now = new Date();
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(); //得到日期
				month = month + 1;
				month = month.toString().padStart(2, "0");
				date = date.toString().padStart(2, "0");
				var defaultDate = `${year}-${month}-${date}`;
				this.end_time = defaultDate
			},
			getList() {
                this.$http(getList, {
						page: this.page,
						content: this.content,
						startTime: this.start_time,
						endTime: this.end_time
				})
				.then(res => {
					if(res.data.code === 200) {
						this.total = res.data.data.total
						this.tableData = res.data.data.data
						this.total = res.data.data.total

					}
				})
            },
		},
		mounted () {
			this.getdatatime()
			this.getdatatime1()
			this.getList()
		},
		created() {
		}
    }
</script>

<style lang="scss" scoped>
	.screen{
		display: flex;
		align-items:center;
		p {
		font-size: 18px;
		padding-right: 26px;
		font-weight:bold;
		color: #666;
		}
		.block{
			font-size: 16px;
			color:#666;
			margin-left: 30px;
			.demonstration{
				margin-right: 18px;
			}
		}
		.title{
			font-weight: 100;
			font-size: 16px;
			color:#666;
			padding: 0 60px;
		}
	}
	.select-title {
		font-size: 18px;
		padding-right: 26px;
		color: #666;
		font-weight: 600;
	}
    .search, .table-wrap {
		padding: 0 !important;
	}
	.bottom_box{
		display: flex;
		justify-content: space-between;
		.left{
			padding-top:40px;
			font-size: 14px;
		}
	}
</style>