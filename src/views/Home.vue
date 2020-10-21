<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="6" class="logo">{{sysName}}</el-col>
			<div class="header-right">
                <img :src="sysUserAvatar"/>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        {{sysUserName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="padding: 0;">
                        <el-dropdown-item @click.native="out_show = true" style="padding: 0 25px;">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
		</el-col>
		<el-col :span="24" class="main">
			<aside class="menu-expanded">
				<!--导航菜单-->
				<el-menu :default-active="defaultActive" 
					     class="el-menu-vertical-demo" 
					 	 unique-opened 
						 router 
						 background-color="#4A5259"
						text-color="#fff"
						active-text-color="#3A62D7">
					<template v-for="(item,index) in routers" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.meta.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
        <handle-dialog  :show="out_show"
                        content="确认退出 ？"
                        @close="out_show = false"
                        @confirm="out"/>
	</el-row>
</template>

<script>
	export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog')
        },
		data() {
			return {
				out_show: false,
				sysName:'财税系统管理后台',
				sysUserName: '',
				sysUserAvatar: require('@/assets/images/default-header.png'),
				routers: [],
				show: false
			}
		},
		methods: {
			// 真退出登录
			out() {
                this.out_show = false
				this.$cookies.remove('cs_admin_token')
				// this.$store.commit('changeToken', '')
				setTimeout(_ => window.location.reload(), 200)
			},
		},
		computed: {
			defaultActive() {
				if(this.$route.meta.hidden) {
					return this.$route.meta.defaultActive
				} else {
					return this.$route.path
				}
			}
		},
		created() {
			this.$router.options.routes.map(item => {
				if(!item.hidden || !item.meta.hidden) {
					this.routers.push(item)
				}
			})
			this.sysUserName = this.$cookies.get('cs_admin_name')
		}
	}

</script>

<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #3A62D7;
			color:#fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
			.logo {
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				font-weight: bold;
				letter-spacing: 3px;
				.txt {
					color:#fff;
				}
			}
			.logo-collapse-width{
				width:60px
			}
		}
        .header-right {
            padding-right: 35px;
			img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				margin-right: 24px;
				margin-top: -6px;
			}
            /deep/ .el-dropdown {
                color: #fff;
                font-size: 16px;
				cursor: pointer;
            }
        }
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				.el-menu{
					height: 100%;
					border-right: none;
					padding-top: 20px;
					/deep/ .el-submenu__icon-arrow {
						font-size: 20px;
						margin-top: -10px;
						color: #fff;
					}
					/deep/ .el-submenu__title {
						font-size: 16px;
						font-weight: bold;
						i:first-child {
							font-size: 20px;
							color: #fff;
							margin-top: -3px;
							margin-right: 5px;
							font-weight: normal;
						}
					}
					/deep/ .el-menu-item {
						font-size: 16px;
						font-weight: bold;
						i:first-child {
							font-size: 20px;
							color: #fff;
							margin-top: -3px;
							font-weight: normal;
							margin-right: 5px;
						}
					}
					/deep/ .el-menu-item.is-active {
						i:first-child {
							color: #409eff;
						}
					}
					/deep/ .el-submenu .el-menu-item {
						font-size: 15px;
						font-weight: bold;
					}
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				background: #F0F0F0;
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
					border-radius: 5px;
					padding: 15px 10px;
					margin-top: 20px;
				}
			}
		}
	}
	/deep/ .el-dropdown-menu__item {
		padding: 0 20px !important;
	}
	.wuye-name {
		font-size: 20px;
		font-weight: bold;
		padding-left: 20px;
	}
</style>

