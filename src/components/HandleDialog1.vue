<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true"
        title="提示"
		:show-close="false">
        
        <div class="content">
			<h4 class="title">{{tips}}</h4>
			<h4 class="title tx">{{title}}</h4>
            <el-input
            type="textarea"
            :rows="2"
            placeholder="请填写失败原因"
            maxlength="50"
            v-model="content">
        </el-input>
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
        data() {
            return {
                content: ''
            }
        },
        props: {
			title: {
				type: String,
				default: '温馨提示'
            },
            tips: {
                type: String
            },
            show: {
                type: Boolean,
                default: false
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
            content: {
                type: String
            },
            width: {
                type: String,
                default: '450px'
            },
            index: {
                type: Number,
                default: 0
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm() {
                this.$emit('confirm', this.content)
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
			font-size: 16px;
			color: #333333;
			padding: 20px 0 29px;
		}
        .tx{
            margin-top:-30px;
        }
		.content-text {
			font-size: 18px;
			color: #666;
			text-align: center;
			font-weight: 600;
		}
    }
	/deep/ .el-dialog__body {
		padding: 0 10px 42px;
	}
    /deep/ .el-button {
        width: 125px;
        height: 40px;
        padding: 0;
    }
    /deep/ .el-button+.el-button {
        margin-left: 60px;
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: #3A62D7;
		padding: 0;
	}
	/deep/ .el-dialog__footer {
		padding: 0 72px 37px;
	}
</style>