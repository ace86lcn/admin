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
			<search placeholder="请输入服务费单编号、关联工资单编号搜索"
					@search="handleSearch"
					@reset="handleReset"/>
			<!-- table -->
			<div class="table-wrap">
				<el-table :data="tableData"
							tooltip-effect="dark"
							style="width: 100%; margin-top: 20px">
					<el-table-column prop="detail_code"
									label="服务费单编号"/>
					<el-table-column prop="order_code"
									label="关联工资单编号"/>
					<el-table-column prop="payroll_amount"
									label="工资单金额"/>
					<el-table-column prop="rate"
									label="服务费率%"/>
					<el-table-column prop="amount"
									label="服务费金额（元）"/>
					<el-table-column prop="create_time_text"
									label="缴费时间"/>
				</el-table>
				<div class="bottom_box">
					<div class="left">共计：{{sum.amount}}元</div>
				<!-- 分页 -->
					<pages :page.sync="page" :total="total"/>
				</div>
				
			</div>
		</div>
    </div>
</template>

<script>
	import { serve } from '../../api/serve'
    export default {
        data() {
			return {
                content: '',           // 搜索
				page: 1,               // 当前页数
				total: 0,              // 总条数
				tableData: [],
				start_time: '',        // 开始时间
				end_time: '',          // 结束时间
				sum: ''                // 共计
			}
		},
		watch: {
            'page'(val) {
                this.getList()
            }
        },
		methods: {
			getList() {
                this.$http(serve, {
						page: this.page,
						content: this.content,
						startTime: this.start_time,
						endTime: this.end_time
				})
				.then(res => {
					if(res.data.code === 200) {
						this.total = res.data.data.total
						this.sum = res.data.data.sum
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
			// 下拉框事件
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
				date = date.toString().padStart(2, "0");
				var defaultDate1 = `${year}-${month}-${date}`;
				this.start_time = defaultDate1
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