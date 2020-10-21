<template>
    <div>
		<div class="table-wrap">
			<div class="select">
				<div class="select-title">筛选</div>
				<div class="dates">
					<span>日期</span>
					<el-date-picker
						v-model="pay_time"
						type="month"
						style="width:160px;"
						format="yyyy-MM"
						value-format="yyyy-MM"
						placeholder="年/月">
					</el-date-picker>
				</div>
				<div class="adress">
					<span>地区</span>
					<el-cascader v-model="city"
							popper-class="region"
                            separator=" - "
                            :options="cities"
                            @change="handleChange"/>
				</div>
				<div class="book">
					<span>户口性质</span>
					<el-select v-model="family_type" placeholder="全部" @change="radioChange">
						<el-option
						v-for="item in changes"
						:key="item.value" 
						:label='item.label' 
						:value='item.value'/>
					</el-select>
				</div>
			</div>
			<search placeholder="请输入社保单编号、企业名称、工人姓名搜索"
					@search="handleSearch"
					@reset="handleReset"
					/>
			<div class="btn">
				<el-button type="primary" @click="dervice" :disabled="this.count > 0 ? false : true">批量导出Excel<span>({{count}})</span></el-button>
				<el-button type="primary" @click="success('all')" :disabled="this.count > 0 ? false : true">批量缴纳成功<span>({{count}})</span></el-button>
				<el-button type="primary" @click="payFinal('all')" :disabled="this.count > 0 ? false : true">批量缴纳失败<span>({{count}})</span></el-button>
			</div>
			<el-table :data="tableData"
						ref="multipleTable"
						@selection-change="handleSelectionChange"
                        tooltip-effect="dark"
                        style="width: 100%; margin-top: 20px">
				 <el-table-column
								type="selection"
								width="55"/>
				<el-table-column prop="social_record_code"
								label="社保单编号"/>
				<el-table-column prop="pay_time_text"
								label="缴纳月份"
                               />
				<el-table-column prop="province,city"
								label="缴纳地区"
								>
								<template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}</template>
				</el-table-column>
				<el-table-column prop="pay_base"
								label="缴纳社保基数"/>
				<el-table-column prop="pay_amount"
								label="缴纳总金额（元）"/>
				<el-table-column prop="company_name"
								label="企业名称"/>
				<el-table-column prop="name"
								label="工人姓名"/>
				<el-table-column prop="card_number"
								label="身份证号"/>
				<el-table-column prop="family_type_text"
								label="户口性质"/>
				<el-table-column
					label="操作"
					width="170">
					<template slot-scope="scope">
						<p class="table-handle">
							<span @click="success(scope.row.social_record_id)">缴纳成功</span>
							<span @click="payFinal(scope.row.social_record_id)">缴纳失败</span>
							<span @click="detailHandle(scope.row.social_record_id)">查看详情</span>
						</p>
					</template>
				</el-table-column>
			</el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
		<!-- 缴纳成功 -->
		<img-dialog3
			:show="show1"
			header_title="提示"
			title="回执单（不超过5张图片）"
			content="请确已完成社保缴纳？"
			url="/operate/SocialRecord/uploadImage"
			:img="img"
			:detail="img_detail"
			@close="show1 = false"
			@confirm="imgDialog"
			@change="changeImg"
      	/>
		  <!-- 缴纳失败 -->
		<handle-dialog1
			:show="show"
			:title="title"
			tips="确认缴纳失败并发起退款？"
			:index="1"
			@close="show = false"
			@confirm="handleDialog"
      	/>
    </div>
</template>

<script>
	import { CitieOptions } from '../../utils/country-data'
	import { getList, paySuccess, payFinal } from '../../api/social'
    export default {
		components: {
			ImgDialog3: () => import("@/components/ImgDialog3"),
			HandleDialog1: () => import("@/components/HandleDialog1")
		},
        data() {
			return {
				pay_time: '',                                     // 删选时间
				content: '',                                      // 搜索
				title: '请填写失败原因（50字以内）',                // 失败弹窗标题
				count: 0,                                         // 批量初始化
				page: 1,                                          // 当前页数
                total: 0,                                         // 总条数
				tableData: [],                                    // 列表数据
				multipleSelection: [],                            // 选中数据
				show: false,                                      // 缴纳失败弹窗
				show1: false,                                     // 缴纳成功弹窗
				img_detail: "",                                   // 绝对路径
				img: [],                                          // 相对路径
				img_detail: [],
				cities: CitieOptions,                             // 城市下拉框
				social_record_id: '',                             // id
				ids: [],                                          // 选中id
				type: 0,
				family_type: '',
				changes: [
					{
						value: 3,
						label: '全部'
					},
					{
						value: 1,
						label: '城镇'
					},
					{
						value: 0,
						label: '农村'
					}
					
				],
				city: ['0'],
			}
		},
		watch: {
			'page'(val) {
                this.getList()
            }
        },
		methods: {
			getList () {
				this.$http(getList, {
						page: this.page,
						type: this.type,
						content: this.content,
						city: this.city[1],
						pay_time: this.pay_time,
						family_type: this.family_type
				})
				.then(res => {
					if(res.data.code === 200) {
						this.total = res.data.data.total
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
			handleChange() {
				this.city.join('-')
			},
			// 多选
			handleSelectionChange(val) {
				this.multipleSelection = val
				this.count = this.multipleSelection.length
			},
			// 导出
			dervice () {
                if(this.multipleSelection.length > 0) {
                    let arr = []
                    this.multipleSelection.map(item => {
                        arr.push(item.social_record_id)
                    })
                    this.ids = arr.join(',')
                    window.open(`${this.domain}/operate/SocialRecord/excelFileExportClass?ids=${this.ids}`,'_blank')
                }
			},
			// 缴纳成功
			success (all) {
				this.show1 = true
				if(all == 'all') {
                    if(this.multipleSelection.length > 0) {
                        let arr = []
                        this.multipleSelection.map(item => {
                            arr.push(item.social_record_id)
						})
						this.ids = arr.join(',')
                    }
                } else {
                    this.ids = all
                }
			},
			// 缴纳失败
			payFinal (all) {
				this.show = true
				if(all == 'all') {
                    if(this.multipleSelection.length > 0) {
                        let arr = []
                        this.multipleSelection.map(item => {
                            arr.push(item.social_record_id)
						})
						this.ids = arr.join(',')
                    }
                } else {
                    this.ids = all
                }
			},
			// 成功
			imgDialog () {
				this.$http(paySuccess, {
					social_record_id: this.ids,
					images: this.img
				})
				.then(res => {
					if(res.data.code == 200) {
						this.$message({
							message: '上传成功',
							type: 'success'
						})
						this.show1 = false
						this.getList()
					}
				})
				
			},
			// 失败
			handleDialog(data) {
				this.content = data
				this.$http(payFinal, {
					social_record_id: this.ids,
					content: data
				})
				.then(res => {
					if(res.data.code == 200) {
						this.$message({
							message: '操作成功',
							type: 'success'
						})
						this.show = false
					}
				})
			},
			changeImg(img, detail) {
				this.img = img;
				this.img_detail = detail;
			},
			// 详情
            detailHandle(id) {
                 this.$router.push({
					 path: '/social/detail',
					 query: {
						 id
						 },
					 })
			},
			radioChange() {
				this.page = 1
				this.getList()
			}
		},
		created() {
			this.getList()
		}
    }
</script>

<style lang="scss" scoped>
	
	/deep/ .el-cascader-menu__list {
		position: relative;
		min-height: 100%;
		margin: 0;
		padding: 6px 0;
		list-style: none;
		box-sizing: border-box;
	}
	/deep/ .el-dialog__title{
		color:#fff;
		display: flex;
		align-items: center;
		padding-top: 7px;
		margin-left: 20px;
	}
	/deep/ .el-dialog__body{
		padding: 0 20px 42px;
	}
	.btn {
		text-align: right;
		margin-top:20px;
	}
	.select{
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		span{
			font-size: 14px;
			margin-right: 20px;
		}
		.select-title {
			font-size: 18px;
			padding-right: 26px;
			color: #666;
			font-weight: 600;
		}
	}
</style>