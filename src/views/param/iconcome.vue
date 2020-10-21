<template>
    <div>
        <!-- 客服电话 -->
		<div class="detail">
			<h4 class="big-title">请填写个税金额相关信息</h4>
			<div class="box">
				<div class="group" v-for="(item, index) in types" :key="index">
					<div>
						<p class="top_name"> 
								<template v-if="item.children">
									<i class="el-icon-arrow-up" 
										v-if="item.toggle"
										@click="toggle(index)"/>
									<i class="el-icon-arrow-down" 
									v-else
									@click="toggle(index)"/>
								</template>
								省级
							</p>
						<div class="first-box">
							<el-input placeholder="请输入一级分类"
									  v-model="item.provinceName"/>
							<span class="del-text" v-if="item.delText" @click="delLv1(index,item.provinceName)">删除</span>
							<span class="del-text-empty" v-else></span>
						</div>
						<div class="second-box" v-if="item.toggle && item.children">
							<div class="second-item" v-for="(i, index2) in item.children" :key="index2">
								<!-- <span>一级分类</span> -->
								<el-input placeholder="请输入市级"
									  v-model="i.city" style="width:180px;"/> 
									  <div class="right_box">
										  <div class="actual">
											  <p>实际税点</p>
											  <el-input placeholder="请输入实际税点" v-model="i.tax_point_true" style="width:150px;"/> %
										  </div>
										  <div class="nominal">
											  <p>名义税点</p>
											  <el-input placeholder="请输入名义税点" v-model="i.tax_point_front" style="width:150px;"/> %
										  </div>
									  </div>
								<span class="del-text" @click="dellv2(item.children, i)">删除</span>
							</div>
							<div class="second-item">
								<span class="add-second" @click="addLv2(item.children)">+ 新增二级分类</span>
							</div>
						</div>
					</div>
				</div>
				
				<div class="group">
					<span class="add-first" @click="addLv1">+ 新增一级分类</span>
				</div>
			</div>
			<!-- 保存按钮 -->
			<el-button type="primary"
					   style="margin-top: 30px"
					   @click="save">保存</el-button>
		</div>
        <!-- 通过弹窗 -->
        <handle-dialog  :show="show"
                        content="删除后将不能恢复，确认删除？"
                        @close="show = false"
                        @confirm="handleDialog"/>
    </div>
</template>

<script>
	import { iconGetList, iconSave, iconDeleteList } from '../../api/param'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog')
        },
        data() {
			return {
				types: [],
				show: false,               //  弹窗是否显示
				lv1Index: '',              // 所要删除的下标
				provinceName:''            // 省级名称
			}
		},
		methods: {
			// 保存
			save() {
				let is_full = true
				let data = []
				this.types.map(item => {
					if(item.children) {
						data.push({
							id: item.id,
							province: item.provinceName,
							children: item.children
						})
					} else {
						data.push({
							id: item.id,
							province: item.provinceName
						})
					}
				})
				data.map(item => {
					if(!item.province) {
						is_full = false
					}
					if(item.children) {
						item.children.map(i => {
							if(!i.city) {
								is_full = false
							}
						})
					}
				})
				if(!is_full) {
					this.$msg.Warning('请输入完整')
				} else {
					this.$http(iconSave, {
						data
					})
					.then(res => {
						if(res.data.code == 200) {
							this.$msg.Success('保存成功')
							this.getList()
						}
					})
				}
			},
			toggle(index) {
				this.types[index].toggle = !this.types[index].toggle
			},
			getList() {
				this.$http(iconGetList)
				.then(res => {
					if(res.data.code === 200) {
						res.data.data.map(item =>{
							item.toggle = false
							item.delText = true
						})
						this.types = res.data.data
					}
				})
			},
			// 删除一级分类
			delLv1(index, provinceName) {
				this.provinceName = provinceName
				this.lv1Index = index
				this.show = true
			},
			handleDialog() {
					this.$http(iconDeleteList, {
							name: this.provinceName,
							type: 1
					})
					.then(res => {
						if (res.data.code == 200) {
							this.$msg.Success(res.data.data)
							this.show = false
							this.types.splice(this.lv1Index, 1)
						}
					})
				
			},
			// 新增一级分类
			addLv1() {
				this.types.push({
					id: '',
					province: '',
					toggle: true,
					children: []
				})
			},
			// 新增二级分类
			addLv2(item) {
				item.push({
					id: '',
					city: ''
				})
			},
			// 删除二级分类
			dellv2(list, item) {
				if (item.city) {
					this.$http(iconDeleteList, {
							name: item.city,
							type: 2
					})
					.then(res => {
						if (res.data.code == 200) {
							this.$msg.Success(res.data.data)
							let index = list.indexOf(item)
							list.splice(index, 1)
						}
					})
				} else {
					let index = list.indexOf(item)
					list.splice(index, 1)
				}
				
			}
		},
		created() {
			this.getList()
		}
    }
</script>

<style lang="scss" scoped>
    .big-title {
		font-size: 16px;
		color: #666;
		span {
			font-size: 14px;
			color: #999;
		}
	}
	.box {
		padding-top: 30px;
		display: flex;
		flex-wrap: wrap;
		.group {
			box-sizing: border-box;
			width: calc(100% / 3);
			padding: 30px 10px;
			display: flex;
			justify-content: center;
			.top_name{
				font-size: 16px;
				font-weight: bold;
				color: #666;
				margin-bottom: 10px;
			}
			&:nth-child(3n) {
				border-left: 1px solid #ddd;
				border-bottom: 1px solid #ddd;
			}
			&:nth-child(3n-1) {
				border-left: 1px solid #ddd;
				border-bottom: 1px solid #ddd;
			}
			&:nth-child(3n-2) {
				border-bottom: 1px solid #ddd;
			}
			&:last-child {
				border-bottom: none;
			}
			.del-text {
				font-size: 14px;
				font-weight: bold;
				color: #3A62D7;
				cursor: pointer;
				line-height: 40px;
				margin-left: 15px;
				padding-left: 0;
			}
			.del-text-empty {
				width: 40px;
			}
			.right_box{
				margin-left: 10px;
				width: 180px;
				padding-bottom: 15px;
				border-bottom:1px solid #ddd;
			}
		}
		.add-first {
			font-size: 16px;
			font-weight: bold;
			color: #3A62D7;
			cursor: pointer;
			line-height: 40px;
		}
		.first-box {
			display: flex;
			align-items: center;
			.right_box{
				margin-left: 10px;
				width: 180px;
				padding-bottom: 15px;
				border-bottom:1px solid #ddd;
			}
			p {
				font-size: 16px;
				font-weight: bold;
				color: #666;
				width: 100px;
				padding-left: 20px;
				box-sizing: border-box;
				position: relative;
				i {
					position: absolute;
					top: 2px;
					left: 0;
					cursor: pointer;
					font-size: 20px;
					color: #3A62D7;
					font-weight: bold;
				}
			}
			/deep/ .el-input {
				width: 200px;
			}
		}
		.second-item {
			display: flex;
			align-items: center;
			margin-top: 15px;
			span {
				font-size: 14px;
				font-weight: bold;
				color: #888;
				width: 100px;
				padding-left: 20px;
				box-sizing: border-box;
			}
			/deep/ .el-input {
				width: 200px;
				height: 35px;
				.el-input__inner {
					height: 35px;
				}
			}
			.add-second {
				font-size: 14px;
				font-weight: bold;
				color: #3A62D7;
				cursor: pointer;
				line-height: 35px;
				width: 200px;
			}
		}
	}
</style>