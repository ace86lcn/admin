<template>
    <div>
        <!-- 客服电话 -->
		<div class="detail">
			<h4 class="big-title">请填写招聘分类相关信息<span>（如删除的分类关联已有招聘信息，则自动将已关联招聘的分类变为其他）</span></h4>
			<div class="box">
				<div class="group" v-for="(item, index) in types" :key="index">
					<div>
						<div class="first-box">
							<p> 
								<template v-if="item.children">
									<i class="el-icon-arrow-up" 
										v-if="item.toggle"
										@click="toggle(index)"/>
									<i class="el-icon-arrow-down" 
									v-else
									@click="toggle(index)"/>
								</template>
								一级分类
							</p>
							<el-input placeholder="请输入一级分类"
									  v-model="item.name"/>
							<span class="del-text" v-if="item.delText" @click="delLv1(index, item.id)">删除</span>
							<span class="del-text-empty" v-else></span>
						</div>
						<div class="second-box" v-if="item.toggle && item.children">
							<div class="second-item" v-for="(i, index2) in item.children" :key="index2">
								<!-- <span>二级分类</span> -->
								<el-input placeholder="请输入二级分类"
										  v-model="i.name"/>
								<span class="del-text" @click="dellv2(item.children, i)">删除</span>
							</div>
							<div class="second-item">
								<span class="add-second" @click="addLv2(index)">+ 新增二级分类</span>
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
                        content="删除的分类关联已有商品，则自动将已关联商品的分类变为其他确认删除？"
                        @close="show = false"
                        @confirm="handleDialog"/>
    </div>
</template>

<script>
	import { jobsGetList, jobsSave, jobsDeleteList } from '../../api/param'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog')
        },
        data() {
			return {
				types: [],
				show: false,            // 弹窗是否显示
				lv1Index: '',          // 删除下标
				id: ''
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
							name: item.name,
							children: item.children
						})
					} else {
						data.push({
							id: item.id,
							name: item.name
						})
					}
				})
				data.map(item => {
					if(!item.name) {
						is_full = false
					}
					if(item.children) {
						item.children.map(i => {
							if(!i.name) {
								is_full = false
							}
						})
					}
				})
				if(!is_full) {
					this.$msg.Warning('请输入完整')
				} else {
					// 对套餐和其他进行排序
					let taocan, qita
					data.map((item, index) => {
						if(item.name == '套餐') { 
							taocan = item 
							data.splice(index, 1)
						}
						if(item.name == '其他') { 
							qita = item 
							data.splice(index, 1)
						}
					})
					if(taocan) {
						data.unshift(taocan)
					}
					if(qita) {
						data.push(qita)
					}
					
					this.$http(jobsSave, {
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
				this.$http(jobsGetList)
				.then(res => {
					if(res.data.code === 200) {
						res.data.data.data.map(item =>{
							item.toggle = false
							item.delText = true
							if(item.name == '其他' || item.name == '套餐') {
								item.delText = false
							}
							if(item.name !== '其他' && !item.children) {
								item.children = []
							}
						})
						this.types = res.data.data.data
					}
				})
			},
			// 删除一级分类
			delLv1(index, id) {
				this.id = id
				this.lv1Index = index
				this.show = true
			},
			// 确认删除弹窗
			handleDialog() {
				this.$http(jobsDeleteList, {
						id: this.id,
						level: 1
				})
				.then(res => {
					if (res.data.code == 200) {
						this.show = false
						this.types.splice(this.lv1Index, 1)
						this.$msg.Success("删除成功！")
						this.getList()
					}
				})
			},
			// 新增一级分类
			addLv1() {
				this.types.push({
					id: '',
					name: '',
					toggle: true,
					children: []
				})
			},
			// 新增二级分类
			addLv2(index) {
				let types = this.types
				types[index].children.push({
					id: '',
					name: ''
				})
			},
			// 删除二级分类
			dellv2(list, item) {
				if(item.id) {
					this.$http(jobsDeleteList, {
							id: item.id,
							level: 2
					})
					.then(res => {
						if (res.data.code == 200) {
							this.$msg.Success('删除成功！')
							let index = list.indexOf(item);
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