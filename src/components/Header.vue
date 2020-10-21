<template>
    <div class="header">
        <div class="header-left">
            <h1>财税系统管理后台</h1>
        </div>
        <div class="header-right">
			<img :src="image"/>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="padding: 0;">
                    <el-dropdown-item @click.native="out_show = true" style="padding: 0 25px;">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <handle-dialog  :show="out_show"
                        content="确认退出 ？"
                        @close="out_show = false"
                        @confirm="out"/>
    </div>
</template>

<script>
    export default {
        components: {
            'HandleDialog': () => import('./HandleDialog')
        },
        data() {
            return {
                out_show: false,
                name: 'zkl',
				image: require('../assets/images/default-header.png')
            }
        },
        methods: {
            out() {
                this.out_show = false
                this.$cookies.remove('cs_admin_token')
                setTimeout(_ => window.location.reload(), 200)
            }
        },
        created() {
            if(this.$cookies.get('cs_admin_name')) {
                this.name = this.$cookies.get('cs_admin_name')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        height: 80px;
        background-color: #3A62D7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            font-size: 24px;
            color: #fff;
            line-height: 80px;
            padding-left: 25px;
        }
        .header-right {
            padding-right: 115px;
			img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				padding-right: 24px;
				margin-top: -6px;
			}
            /deep/ .el-dropdown {
                color: #fff;
                font-size: 18px;
				cursor: pointer;
            }
        }
    }
</style>