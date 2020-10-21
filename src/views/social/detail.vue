<template>
    <div>
        <!-- 详情 -->
        <div class="detail">
            <!-- 订单信息 -->
            <div class="order">
                <div class="order-header">
                    <p class="title">社保单详情</p>
                    <p class="title" style="color:#3A62D7;">{{detail.status_text}}</p>
                </div>
                <div class="order-item">
                    <span>社保单编号：<em style="margin-left:35px">{{detail.social_record_code}}</em></span>
                    <span>关联工资单编号：<em style="margin-left:35px">{{detail.order_code}}</em></span>
                </div>
                <div class="order-item">
                    <span>缴纳社保企业：<em>{{detail.company_name}}</em></span>
                    <span>财务姓名：<em>{{detail.employees_name}}</em></span>
                </div>
                <div class="order-item ">
                    <span>所属项目：<em>{{detail.project_name}}</em></span>
                    <span>生成时间：<em>{{detail.create_time}}</em></span>
                </div>
                <div class="order-item ">
                    <span>支付时间：<em>{{detail.update_time}}</em></span>
                    <span v-if="detail.status === 1">成功缴纳时间：<em style="margin-left:10px">{{detail.update_time}}</em></span>
                </div>
                <div class="order-item " v-if="detail.status === 2">
                    <span>退款交易编号：<em>{{detail.finance_code}}</em></span>
                    <span>退款时间：<em>{{detail.update_time}}</em></span>
                </div>      
            </div>
             <!-- table -->
            <el-table :data="tableData"
                        tooltip-effect="dark"
                            style="width: 100%;"
                              >
              <el-table-column prop="worker_name"
                      label="姓名"/>
              <el-table-column prop="card_number"
                      label="身份证号"/>
              <el-table-column prop="pay_time_text"
                      label="缴纳月份"
                                      />
              <el-table-column prop="province, city"
                      label="缴纳地区"
                                      >
                    <template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}</template>
              </el-table-column>
              <el-table-column prop="pay_base"
                      label="缴纳基数"/>
              <el-table-column prop="family_type_text"
                    label="户口性质"/>
                    <el-table-column prop="personal_pay"
                    label="个人缴纳社保（元）"/>
                    <el-table-column prop="enterprise_pay"
                    label="企业扣缴社保（元）"/>
          </el-table>
          <div class="btn">
            <el-button type="primary" @click="paySucc" v-if="datas.status === 0">缴纳成功</el-button>
            <el-button type="primary" @click="payFinal" v-if="datas.status === 0">缴纳失败</el-button>
            <el-button type="primary" @click="back">返回上一页</el-button>
          </div>
        </div>
    <!-- 缴纳成功 -->
		<img-dialog3
			:show="show"
			header_title="提示"
			title="回执单（不超过5张图片）"
			content="请确已完成社保缴纳？"
			url="/operate/SocialRecord/uploadImage"
			:img="img"
			:detail="img_detail"
			@close="show = false"
			@confirm="imgDialog"
			@change="changeImg"
      	/>
		  <!-- 缴纳失败 -->
		<handle-dialog1
			:show="show1"
			:title="title"
			tips="确认缴纳失败并发起退款？"
			:index="1"
			@close="show1 = false"
			@confirm="handleDialog"
      	/>
    </div>
</template>

<script>
    import { detail, paySuccess, payFinal } from '../../api/social'
    export default {
        components: {
            ImgDialog3: () => import("@/components/ImgDialog3"),
			HandleDialog1: () => import("@/components/HandleDialog1")
        },
        data() {
          return {
            tableData: [],                           // 列表数据
            detail: {},                              // 数据详情
            datas: {},
            img: [],                                 // 相对路径
            img_detail: [],                          // 绝对路径
            social_record_id: '',                    // id
            content: '',                             // 搜索
            show: false,                             // 缴纳成功弹窗
            show1: false,                            // 缴纳失败弹窗
            title: '请填写失败原因（50字以内）'
            }
		},
		computed: {
			id() {
				return this.$route.query.id
            }
            
        },
        methods: { 
            getList() {
                this.$http(detail, {
                        social_record_id: this.id
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.detail = res.data.data
                        this.datas = res.data.data
                        this.social_record_id = this.detail.social_record_id
                        let arr = []
                        for(let i in this.datas) {
                            arr.push(this.datas)
                        }
                        this.tableData = [arr[0]]
                        this.detail = res.data.data 
                    }
                })
            },
            // 缴纳成功
            paySucc () {
              this.show = true
            },
            // 缴纳失败
            payFinal () {
                this.show1 = true
            },
            // 成功确认
            imgDialog () {
                this.$http(paySuccess, {
                    social_record_id: this.social_record_id,
                    images: this.img
                })
                .then(res => {
                    this.$message({
                        message: '缴纳成功',
						type: 'success'
                    })
                    this.show = false
                    this.$router.push('/social/2')
                })
              
            },
            changeImg(img, detail) {
              this.img = img;
              this.img_detail = detail;
            },
            // 失败确认
            handleDialog (data) {
                this.content = data
                this.$http(payFinal, {
                    social_record_id: this.social_record_id,
                    content: this.content
                })
                .then(res => {
                    this.$message({
                        message: '操作成功',
						type: 'success'
                    })
                    this.show1 = false
                    this.$router.push('/social/3')
                })
              
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