<template>
    <div>
        <!-- 详情 -->
        <div class="detail">
            <h3 class="module-title">认证人信息</h3>
            <div class="module">
                <div class="module-item">
                    <span>注册手机号</span>
                    <span>{{detail.mobile}}</span>
                </div>
                <div class="module-item">
                    <span>姓名</span>
                    <span>{{detail.name}}</span>
                </div>
                <div class="module-item">
                    <span>身份证号</span>
                    <span>{{detail.card_number}}</span>
                </div>
                <div class="module-item">
                    <span>身份证正面</span>
                    <img :src="detail.card_img_front"/>
                </div>
                <div class="module-item">
                    <span>身份证反面</span>
                    <img :src="detail.card_img_back"/>
                </div>
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
                        content="请确认该员工尚未存在后通过，确认通过？"
                        @close="pass_show = false"
                        @confirm="handleDialog"
                        :index="1"/>
        <!-- 拒绝弹窗 -->
        <handle-dialog  :show="refuse_show"
                        content="拒绝后该员工将不加入企业列表，确认拒绝？"
                        @close="refuse_show = false"
                        @confirm="handleDialog"
                        :index="2"/>
    </div>
</template>

<script>
    import { detail, edit } from '../../api/staff'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog')
        },
        data() {
			return {
                pass_show: false,              // 通过弹窗
                refuse_show: false,            // 拒绝弹窗
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
                    edit_status = 3
                } else if(index == 2) {
                    // 拒绝
                    this.refuse_show = false
                    edit_status = 2
                }
                this.$http(edit, {
                    id: this.id,
                    edit_status: edit_status
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success('编辑成功')
                        this.$router.back()
                    }
                })
            }
        },
        created() {
            // 获取详情
            this.$http(detail, {
                    id: this.id
            })
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