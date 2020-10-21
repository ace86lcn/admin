<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true"
		:show-close="false">
        
        <div class="content">
			<h4 class="title">{{title}}</h4>
			<p class="content-text">{{content}}</p>
            <el-input
            v-show=false
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
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
        props: {
			title: {
				type: String,
				default: '温馨提示'
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
                this.$emit('confirm', this.index)
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
		.content-text {
			font-size: 18px;
			color: #666;
			text-align: center;
			font-weight: 600;
		}
    }
	/deep/ .el-dialog__body {
		padding: 0 100px 42px;
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