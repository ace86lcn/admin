<template>
    <div>
        <!-- 详情 -->
        <div class="detail">
            <!-- 订单信息 -->
            <div class="order">
                <div class="order-header">
                    <p class="title">发票详情</p>
                </div>
                <div class="order-item">
                    <span>发票编号：<em style="margin-left:35px">{{detail.social_record_code}}</em></span>
                    <span>发票金额：<em style="margin-left:35px">{{detail.order_code}}</em></span>
                </div>
                <div class="order-item">
                    <span>开票企业：<em>{{detail.company_name}}</em></span>
                    <span>开票人：<em>{{detail.employees_name}}</em></span>
                </div>
                <div class="order-item ">
                    <span>发票抬头：<em>{{detail.project_name}}</em></span>
                    <span>发票明细：<em>{{detail.create_time}}</em></span>
                </div>
                <div class="order-item ">
                    <span>寄送地址：<em>{{detail.update_time}}</em></span>
                    <span v-if="detail.status === 1">申请时间：<em style="margin-left:10px">{{detail.update_time}}</em></span>
                </div>
                <img-download :url="detail.invoicePic"
                      style="margin-top:50px"/>     
            </div>
             <!-- table -->
             <div class="order-header">
                    <p class="title">相关订单</p>
            </div>
            <el-table :data="tableData"
                        tooltip-effect="dark"
                            style="width: 100%;"
                              >
              <el-table-column prop="worker_name"
                      label="交易编号"/>
              <el-table-column prop="card_number"
                      label="交易时间"/>
              <el-table-column prop="pay_time_text"
                      label="交易类型"/>
              <el-table-column prop="province"
                      label="订单号/账单号"/>
              <el-table-column prop="pay_base"
                      label="交易备注"/>
              <el-table-column prop="family_type_text"
                    label="交易金额（元）"/>
                    <el-table-column prop="personal_pay"
                    label="可开票金额"/>
          </el-table>
          <div class="btn">
            <el-button type="primary" @click="Upload" v-if="datas.status === 0">上传发票</el-button>
            <el-button type="primary" @click="back">返回上一页</el-button>
          </div>
        </div>
    <!-- 开具开票 -->
		<img-dialog2
			:show="show"
			header_title="提示"
			title="上传发票（不超过5张图片）"
			content="确认已完成开票开具？"
			url="/operate/Upload/baoDanImg"
			:img="img"
			:detail="img_detail"
			@close="show = false"
			@confirm="imgDialog"
			@change="changeImg"
      	/>
    </div>
</template>

<script>
   import { detail } from '../../api/invoice'
    export default {
        components: {
            ImgDialog2: () => import("@/components/ImgDialog2"),
            ImgDownload: () => import('@/components/ImgDownload')
        },
        data() {
          return {
            tableData: [],              // 列表数据
            detail: {},
            datas: {},
            img: [],                   // 相对路径
            img_detail: [],            // 绝对路径
            social_record_id: '',      // 详情id
            show: false,               // 开具开票弹窗
            }
		},
		computed: {
			id() {
				return this.$route.query.id
            }  
        },
        methods: { 
            // 详情展示
            getList() {
                this.$http(detail, {
                        social_record_id: this.id
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.detail = res.data.data
                        this.datas = res.data.data
                        this.social_record_id = this.detail.social_record_id
                        this.detail = res.data.data 
                    }
                })
            },
            // 开具弹窗
            Upload () {
                this.show = true
            },
            imgDialog () {
                this.$http.post('/operate/SocialRecord/adopt', {
                    social_record_id: this.social_record_id,
                    images: this.img
                })
                .then(res => {
                    this.$message({
                        message: '成功',
						type: 'success'
                    })
                    this.show = false
                    this.$router.push('/invoice/2')
                })
              
            },
            changeImg(img, detail) {
              this.img = img;
              this.img_detail = detail;
            },
            // 返回
            back () {
              window.history.go(-1)
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
    .btn {
      text-align: right;
      margin-top:40px;
    }
}
    
</style>