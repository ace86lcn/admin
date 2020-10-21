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
			<el-table :data="tableData"
						ref="multipleTable"
						@selection-change="handleSelectionChange"
                        tooltip-effect="dark"
                        style="width: 100%; margin-top: 20px">
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
							<span @click="detailHandle(scope.row.social_record_id)">查看详情</span>
						</p>
					</template>
				</el-table-column>
			</el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
    </div>
</template>

<script>
import { CitieOptions } from '../../utils/country-data'
import { getList } from '../../api/social'
    export default {
        components: {
        },
        data() {
			return {
				content: '',                // 搜索
				pay_time: '',               // 筛选时间
				page: 1,                    // 当前页数
                total: 0,                   // 总条数
                tableData: [],
				id: '',
				time: '',                  // 时间
				type: 2,                   // 当前type
				cities: CitieOptions,
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
					},
					
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
						console.log(res.data.data.data)
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
			// 详情
            detailHandle(id) {
                 this.$router.push({
					 path: '/social/detail',
					 query: {
						 id
						 },
					 })
			},
		},
		created() {
			this.getList()
		}
    }
</script>

<style lang="scss" scoped>
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