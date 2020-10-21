<template>
    <div>
        <!-- 详情 -->
        <div class="detail">
            <h3 class="module-title">认证人信息</h3>
            <div class="module">
                <div class="module-item">
                    <span>注册手机号</span>
                    <span>{{detail.user_info.mobile}}</span>
                </div>
                <div class="module-item">
                    <span>姓名</span>
                    <span>{{detail.user_info.real_name}}</span>
                </div>
                <div class="module-item">
                    <span>身份证号</span>
                    <span>{{detail.user_info.card_number}}</span>
                </div>
                <div class="module-item">
                    <span>身份证正面</span>
                    <img :src="detail.user_info.card_img_front"/>
                </div>
                <div class="module-item">
                    <span>身份证反面</span>
                    <img :src="detail.user_info.card_img_back"/>
                </div>
            </div>
            <h3 class="module-title top-23">认证企业信息</h3>
            <div class="module">
                <div class="module-item">
                    <span>公司名称</span>
                    <span>{{detail.company_info.company_name}}</span>
                </div>
                <div class="module-item">
                    <span>统一社会信用代码</span>
                    <span>{{detail.company_info.company_code}}</span>
                </div>
                <div class="module-item">
                    <span>法人姓名</span>
                    <span>{{detail.company_info.legal_name}}</span>
                </div>
                <div class="module-item">
                    <span>企业营业执照</span>
                    <img :src="detail.company_info.business_license"/>
                </div>
                <template v-if="type == 2">
                    <div class="module-item">
                        <span>提交审核时间</span>
                        <span>{{detail.user_info.create_time}}</span>
                    </div>
                    <div class="module-item">
                        <span>审核通过时间</span>
                        <span>{{detail.company_info.edit_time}}</span>
                    </div>
                </template>
            </div>
            <div class="btn-group">
                <template v-if="type == 1">
                    <el-button type="primary" @click="pass_show = true">通过</el-button>
                    <el-button type="danger" @click="refuse_show = true">拒绝</el-button>
                </template>
                <el-button type="primary" @click="$router.back()">返回上一页</el-button>
            </div>
        </div>
        <!-- 通过弹窗 -->
        <handle-dialog  :show="pass_show"
                        content="请确认该企业尚未存在后通过，确认通过？"
                        @close="pass_show = false"
                        @confirm="handleDialog"
                        :index="1"/>
        <!-- 拒绝弹窗 -->
        <handle-dialog  :show="refuse_show"
                        content="拒绝后该企业将不加入企业列表，确认拒绝？"
                        @close="refuse_show = false"
                        @confirm="handleDialog"
                        :index="2"/>
    </div>
</template>

<script>
   import { detail, edit } from '../../api/company'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog')
        },
        data() {
			return {
                pass_show: false,                  // 通过弹窗
                refuse_show: false,                // 拒绝弹窗
                detail: {}
			}
		},
		computed: {
			id() {
				return this.$route.params.id
            },
            type() {
                return this.$route.query.type      //1：企业认证，2：企业列表
            }
        },
        methods: {
            handleDialog(index) {
                let edit_status
                if(index == 1) {
                    // 通过
                    this.pass_show = false
                    edit_status = 2
                } else if(index == 2) {
                    // 拒绝
                    this.refuse_show = false
                    edit_status = 1
                }
                this.$http(edit, {
                        id: this.id,
                        edit_status: edit_status
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$message({
                            message: res.data.data,
                            type: 'success'
                        })
                        this.$router.back()
                    }
                })
            }
        },
        created() {
            // 获取详情
           this.$axios.get(`/operate/SmallCompany/details/${this.id}`)
            .then(res => {
                if(res.data.code === 200) {
                    this.detail = res.data.data
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .module-title {
        font-size: 18px;
        color: #666;
        margin-bottom: 15px;
    }
    .module-item {
        display: flex;
        span {
            width: 200px;
            font-size: 14px;
            color: #666;
            font-weight: bold;
            margin-bottom: 10px;
        }
        img {
            width: 200px;
            margin-bottom: 10px;
        }
    }
    .btn-group {
        display: flex;
        margin-top: 30px;
        button {
            margin-right: 40px;
        }
    }
</style>