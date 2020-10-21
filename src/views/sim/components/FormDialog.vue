<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true"
		:show-close="false">
        <div class="content">
			<h4 class="title">{{title}}</h4>
            <div class="content-msg-item">
                <p>SIM卡号：</p>
                <el-input v-model="number1" 
                        placeholder="请输入SIM卡号"/>
            </div>
            <div class="content-msg-item">
                <p>设备号：</p>
                <el-input v-model="number2" 
                        placeholder="请输入设备号"/>
            </div>
		</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleConfirm">{{btn1Text}}</el-button>
            <el-button type="primary" 
                        v-if="showBtn2"
                        @click="handleClose">
                {{btn2Text}}
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
			title: {
				type: String,
				default: '温馨提示'
            },
            show: {
                type: Boolean,
                default: false
            },
            id: {
                type: String
            },
            showBtn2: {
                type: Boolean,
                default: true
            },
            btn1Text: {
                type: String,
                default: '确认'
            },
            btn2Text: {
                type: String,
                default: '取消'
            },
            width: {
                type: String,
                default: '500px'
            },
            index: {
                type: Number,
                default: 0
            }
        },
        watch: {
            'show'(bol) {
                if(bol) {
                    this.number1 = ''
                    this.number2 = ''
                    if(this.id) {
                        this.$axios.get(`/operate/SmallBraceletSim/details/${this.id}`)
                        .then(res => {
                            if(res.data.code === 200) {
                                this.number1 = res.data.data.sim_number
                                this.number2 = res.data.data.hand_code
                            }
                        })
                    }
                }
            }
        },
        data() {
            return {
                number1: '',
                number2: ''
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm() {
                let url 
                if(this.id) {
                    url = `/operate/SmallBraceletSim/update/${this.id}`
                } else {
                    url = '/operate/SmallBraceletSim/save'
                }
                this.$axios.post(url, {
                    sim_number: this.number1,
                    hand_code: this.number2
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success(res.data.data)
                        this.$emit('confirm')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__title {
        font-size: 18px;
        font-weight: 600;
    }
    .content {
        .title {
			font-size: 20px;
			color: #333333;
			padding: 25px 0 29px;
			text-align: center;
		}
        .content-msg-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            p {
                color: #333;
                text-align: center;
                font-size: 16px;
                font-weight: 600;
                margin-right: 15px;
                width: 120px;
            }
        }
		.content-text {
			font-size: 18px;
			color: #666;
			text-align: center;
			font-weight: 600;
		}
    }
	/deep/ .el-dialog__body {
		padding: 0 50px 22px;
	}
    /deep/ .el-button {
        width: 125px;
        height: 40px;
        padding: 0;
    }
    /deep/ .el-button+.el-button {
        margin-left: 100px;
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: #3A62D7;
		padding: 0;
	}
	/deep/ .el-dialog__footer {
		padding: 0 50px 37px;
	}
    /deep/ .el-textarea__inner {
        height: 50px;
    }
</style>