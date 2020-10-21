<template>
    <div>
        <!-- 客服电话 -->
		<div class="detail">
			<h4 class="module-title">客服电话</h4>
			<div class="alone-form">
				<span class="form-text">客服电话</span>
				<el-input v-model="service_mobile" style="width: 220px;margin-left: 30px"/>
			</div>
			<!-- 保存按钮 -->
			<el-button type="primary"
					   style="margin-top: 30px"
					   @click="save">保存</el-button>
		</div>
        <!-- 对公打款账户 -->
		<div class="detail top-23">
			<h4 class="module-title">对公打款账户</h4>
			<div class="alone-form">
				<span class="form-text">账户名</span>
				<el-input v-model="company_account" style="width: 300px;margin-left: 30px"/>
			</div>
			<div class="alone-form">
				<span class="form-text">账号</span>
				<el-input v-model="company_bank_number" style="width: 300px;margin-left: 30px"/>
			</div>
			<div class="alone-form">
				<span class="form-text">开户行</span>
				<el-input v-model="company_bank" style="width: 300px;margin-left: 30px"/>
			</div>
			<!-- 保存按钮 -->
			<el-button type="primary"
					   style="margin-top: 30px"
					   @click="save">保存</el-button>
		</div>
        <!-- 服务费比例 -->
		<div class="detail top-23">
			<h4 class="module-title">服务费</h4>
			<div class="alone-form">
				<span class="form-text">服务费比例</span>
				<el-input v-model="service_rate" style="width: 220px;margin-left: 30px;margin-right:15px"/>%
			</div>
			<!-- 保存按钮 -->
			<el-button type="primary"
					   style="margin-top: 30px"
					   @click="save">保存</el-button>
		</div>
    </div>
</template>

<script>
	import { otherList, otherSave } from '../../api/param'
    export default {
        data() {
			return {
                service_mobile: '',             // 客服电话
				company_account: '',            // 账户名
				company_bank_number: '',        // 账号 
				company_bank: '',               // 开户行
				service_rate: '',	            // 服务费比例	
			}
		},
		methods: {
			// 保存
			save() {
				this.$http(otherSave, {
					service_mobile: this.service_mobile,
					company_account: this.company_account,
					company_bank_number: this.company_bank_number,
					company_bank: this.company_bank,
					service_rate: this.service_rate,
				})
				.then(res =>{
					if(res.data.code === 200) {
						this.$message({
							message: '保存成功',
							type: 'success'
						})
					}
				})
			}
		},
		created() {
			this.$http(otherList)
			.then(res => {
				if(res.data.code === 200) {
					this.service_mobile = res.data.data.service_mobile
					this.company_account = res.data.data.company_account
					this.company_bank_number = res.data.data.company_bank_number
					this.company_bank = res.data.data.company_bank
					this.service_rate = res.data.data.service_rate
				}
			})
		}
    }
</script>

<style lang="scss" scoped>
    .module-title {
        font-size: 16px;
        color: #666;
    }

    .alone-form {
        display: flex;
        align-items: center;
        margin-top: 20px;
        .form-text {
            font-size: 16px;
            color: #666;
            font-weight: 600;
            width: 80px;
        }
    }
</style>