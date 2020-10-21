<template>
    <div>
        <!-- 详情 -->
        <div class="detail">
            <!-- 订单信息 -->
            <div class="order">
                <div class="order-header">
                    <p class="title">工资单详情</p>
                    <p class="title" style="color:#3A62D7;" v-if="detail.status === 1">待支付</p>
                    <p class="title" style="color:#3A62D7;" v-if="detail.status === 2">发放中</p>
                    <p class="title" style="color:#3A62D7;" v-if="detail.status === 3">已完成</p>
                    <p class="title" style="color:#3A62D7;" v-if="detail.status === 4">发放异常</p>
                    <p class="title" style="color:#3A62D7;" v-if="detail.status === 5">发放失败</p>
                </div>
                <div class="abnormal">
                    <p  v-if="detail.status === 4" style="font-size:14px;font-weight:bold;color:#666;margin-bottom:-15px;width:1143px;line-height:30px;">
                        异常原因：{{detail.objection_describe}}
                    </p>
                    <p  v-if="detail.status === 5" style="font-size:14px;font-weight:bold;color:#666;margin-bottom:15px;width:1143px;line-height:30px;">失败原因：{{detail.privide_fail}}</p>
                    <div class="btn left">
				        <el-button type="primary" @click="manage" v-if="detail.status === 4">重新处理</el-button>
				        <el-button type="primary" @click="final" v-if="detail.status === 4">发放失败</el-button>
			        </div>
                </div>
                <div class="order-item">
                    <span>工资单编号：<em style="margin-left:35px">{{detail.order_code}}</em></span>
                    <div class="btn">
				        <el-button type="primary" @click="remind" v-if="detail.status === 1">提醒支付</el-button>
			        </div>
                </div>
                <div class="order-item">
                    <span>打款企业：<em>{{detail.company_name}}</em></span>
                    <span>打款财务：<em>{{detail.employee_name}}</em></span>
                </div>
                <div class="order-item ">
                    <span>收款工人：<em>{{detail.worker_name}}</em></span>
                    <span>身份证号：<em>{{detail.card_number}}</em></span>
                </div>
                <div class="order-item ">
                    <span>所属项目：<em>{{detail.project_name}}</em></span>
                    <span>发放日期/月份：<em style="margin-left:10px">{{detail.provide_time}}</em></span>
                </div>
                <div class="order-item ">
                    <span>生成时间：<em>{{detail.create_time}}</em></span>
                    <span v-if="detail.status !== 1">支付时间：<em>{{detail.pay_time}}</em></span>
                </div>
                <div class="order-item ">
                    <span v-if="detail.status !== 1">银行开始处理时间：<em style="margin-left:20px">{{detail.update_time}}</em></span>
                    <span v-if="detail.status !== 2">银行处理完成时间：<em>{{detail.update_time}}</em></span>
                </div>
                <div class="order-item ">
                    <span v-if="detail.status == 3">发放完成时间：<em>{{detail.update_time}}</em></span>
                    <span v-if="detail.status === 4">发放异常时间：<em>{{detail.update_time}}</em></span>
                    <span v-if="detail.status === 5">发放失败时间：<em>{{detail.update_time}}</em></span>
                </div>      
            </div>
             <!-- table1 -->
            <el-table :data="tableData1"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        >
				<el-table-column prop="type"
								label="生成方式">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type === 0">自动生成</span>
                                    <span v-if="scope.row.type === 1">手动添加</span>
                                </template>
				</el-table-column>
				<el-table-column prop="pay_amount"
								label="应发工资"/>
				<el-table-column prop="actual_salary"
								label="实发工资（元）"
                                />
				<el-table-column prop="personal_socia_amount"
								label="代缴工人个税（元）"
                                />
				<el-table-column prop="social_person_amount"
								label="代缴工人社保（元）"/>
				<el-table-column prop="withhold_socia_amount"
								label="代缴企业社保（元）"/>
                <el-table-column prop="fee"
								label="服务费（元）"/>
                <el-table-column prop="total_amount"
								label="共计金额（元）"/>
			</el-table>
             <div class="hour">
                 <p class="title">工时统计</p>
                 <el-table :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        >
                    <el-table-column prop="create_time"
                                    label="日期"/>
                    <el-table-column prop="working_hours"
                                    label="本日工时"/>
                    <el-table-column prop="pay_amount"
                                    label="应发工资（元）"
                                    />
			</el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/> 
             </div>
        </div>
        <handle-dialog1
			:show="show"
			:title="title"
			:index="1"
			@close="show = false"
			@confirm="handleDialog"
      	/>
    </div>
</template>

<script>
    import { pay } from '../../api/order'
    export default {
        components: {
            HandleDialog1: () => import("@/components/HandleDialog1")
        },
        data() {
			return {
                page: 1,                       // 当前页数
                total: 0,                      // 总条数
                tableData1: [],                // 列表展示数据
                tableData: [],
                detail: {},
                show: false,                   // 弹窗显示
                title: '请填写失败原因（50字以内）'        //弹窗标题
            }
		},
		computed: {
			id() {
				return this.$route.params.id
            },
        },
        methods: { 
            getList() {
                let id = this.$route.params.id
                this.$axios.get(`/operate/Payroll/detail/${id}`)
                .then(res => {
                    if(res.data.code === 200) {
                        this.detail = res.data.data.payrollInfo
                        this.tableData = res.data.data.attendance_list.data
                        this.total = res.data.data.attendance_list.total
                        let arr = []
                        for (let i in this.detail) {
                            arr.push(this.detail)
                        }
                        this.tableData1 = [arr[0]]
                    }
                })
            },
            // 发放失败
            final () {
                this.show = true    
            },
            // 弹窗
            handleDialog () {

            },
            // 提醒支付
            remind () {
                let id = this.$route.params.id
                this.$http(pay, {
                    id: id
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.$msg.Success(res.data.data)
                    }
                })
            },
            // 重新处理
            manage () {

            }
        },
        created() {
            this.getList()
            
        }
    }
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__title{
    color: #fff;
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
    padding-top:7px;
}
    .detail{
        .order-header{
            display: flex;
            justify-content:space-between;
        }
        .title{
            font-size: 20px;
            margin-bottom: 20px;
            font-weight:500;
        }
        .hour{
            .title{
                margin-top:20px;
            }
        }
        em{
            font-weight:bold;
            margin-left: 45px;
        }
        .left{
            display: flex;
            justify-content: flex-end;
        }
        .bill-title {
        margin-top: 20px;
        display: flex;
        span {
            flex: 1;
        }
    }
    .order-title {
        font-size: 16px;
        color: #666;
        padding-left: 50px;
    }
    .export-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-right: 30px;
    }
    .order {
        padding: 10px 30px;
        margin-bottom: 20px;
        .order-item {
            display: flex;
            margin-bottom: 20px;
            font-size: 14px;
            color: #666;
            font-weight: bold;
            span {
                flex: 1;
                
            }
        }
        .float{
            color:#3A62D7;
            text-align: right;
        }
    }
    .page {
        display: flex;
        justify-content: flex-end;
        margin-top: 15px;
        padding-right: 30px;
    }
    .msg {
        margin-top: 40px;
        display: flex;
        .msg-item {
            flex: 1;
            p {
                margin-bottom: 10px;
                font-size: 14px;
                color: #666;
                font-weight: bold;
            }
        }
    }
    .bill {
        margin-top: 20px;
        display: flex;
        .bill-item {
            flex: 1;
            div {
                display: flex;
                align-items: flex-end;
                margin-bottom: 10px;
                img {
                    width: 250px;
                }
                i {
                    margin-left: 30px;
                    font-size: 28px;
                    color: #3A62D7;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
        }
    }
    .btn-group {
        display: flex;
        margin-top: 30px;
        button {
            margin-right: 40px;
        }
    }
    
}
    
</style>