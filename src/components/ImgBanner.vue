<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true"
        :title="title"
		:show-close="false">
        <div class="content">
            <!-- form -->
            <el-form :model="ruleForm" 
                     :rules="rules" 
                     ref="ruleForm" 
                     label-width="150px"
                     style="margin:10px;width:auto;">
                <div class="content-msg-item">
                    <p class="p_icon">轮播图名称</p>
                    <el-input v-model="banner_name" 
                            placeholder="请输入"/>
                </div>
                <div class="content-msg-item">
                    <p >跳转链接</p>
                    <el-input v-model="href" 
                            placeholder="请输入"/>
                </div>
                <div class="content-msg-item">
                    <p class="p_icon">优先级</p>
                    <el-select v-model="level" placeholder="请选择" style="width:340px;" >
                        <el-option
                            v-for="(item, index) in change"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
                <el-form-item :label="label" prop="img">
                    <!-- 上传图片 -->
                    <p class="upImgs p_icon">上传图片</p>
                    <div class="img-upload">
                        <ul class="img-group" v-show="img">
                            <li>
                                <img :src="img" alt="">
                                <div class="img-mask">
                                    <div class="img-control">
                                        <i class="el-icon-zoom-in"
                                        @click="handlePictureCardPreview"></i>
                                        <i class="el-icon-delete"
                                        @click="handleRemove"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="upload-wrap" v-show="!img">
                            <el-upload
                                :action="domain+url"
                                list-type="picture-card"
                                :with-credentials="true"
                                :headers="upToken"
                                :show-file-list="false"
                                :on-success="onSuccess"
                                :on-error="onError">
                                <i slot="default" class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                        <!-- 预览大图 -->
                        <el-dialog :visible.sync="previewShow">
                            <img width="100%" :src="img" alt="">
                        </el-dialog>
                    </div>
                </el-form-item>
                <p class="remark">请上传不超过2M的图片，支持格式JPG、JPEG、PNG</p>
            </el-form>
			<!-- <p class="content-text">{{content}}</p> -->
		</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleConfirm">确认</el-button>
            <el-button type="primary" @click="handleClose">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import upToken from '@/utils/upToken'
    export default {
        props: {
            id: {
                type: String
            },
            title: {
                type: String,
                default: false
            },
            show: {
                type: Boolean,
                default: false
            },
            content: {
                type: String
            },
            width: {
                type: String,
                default: '450px'
            },
            label: {
                type: String
            },
            url: {
                type: String
            },
            img: {
                type: String
            },
            detail: {
                type: String
            }
        },
        watch: {
            show(bol) {
                console.log(bol)
                if(bol) {
                    this.banner_name = ''
                    this.href = ''
                    this.level = ''
                    this.img = ''
                    if (this.id) {
                        this.$axios.get(`/operate/SmallBanner/details/${this.id}`)
                            .then(res => {
                                if(res.data.code === 200) {
                                    this.banner_name = res.data.data.banner_name
                                    this.href = res.data.data.href
                                    this.level = res.data.data.level
                                    this.img = res.data.data.img_url
                                }
                            })
                    }
                    this.ruleForm = {
                        img: '',
                        img_detail: ''
                    }
                } else {
                    this.ruleForm = {
                        img: this.img,
                        img_detail: this.detail
                    }
                }
            }
        },
        data() {
            return {
                banner_name: '',
                href: '',
                level: '',
                img: '',
                upToken: upToken,
                previewShow: false,
                ruleForm: {
                    img: '',
                    img_detail: '',
                    change: ''
                },
                banner_name: '',
                href: '',
                level: '',
                change: [
                    {label: 1, value: 1},
                    {label: 2, value: 2},
                    {label: 3, value: 3},
                    {label: 4, value: 4},
                    {label: 5, value: 5},
                    {label: 6, value: 6},
                    {label: 7, value: 7},
                    {label: 8, value: 8},
                    {label: 9, value: 9},
                    {label: 10, value: 10},
                ],
                imgs: '',
                details: '',
                rules: {
                    img: [
						{ required: true, message: '请填写必填项', trigger: 'change' }
					]
                },
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm() {
                if (!this.banner_name) {
                    this.$message({
                        type: 'error',
                        message: '请输入轮播图片名称'
                    })
                }
                 if (!this.level) {
                    this.$message({
                        type: 'error',
                        message: '请选择优先级'
                    })
                }
                let url
                if (this.id) {
                    url = `/operate/SmallBanner/update/${this.id}`
                } else {
                    url = '/operate/SmallBanner/save'
                }
                this.$axios.post(url, {
                    banner_name: this.banner_name,
                    href: this.href,
                    level: this.level,
                    img_url: this.imgs
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success(res.data.data)
                        this.$emit('confirm')
                    }
                })
            },
            handleRemove() {
                this.handleChange('', '')
                console.log(this.handleChange())
            },
            handlePictureCardPreview(file) {
                this.previewShow = true;
            },
            onSuccess(response, file, fileList) {
                this.handleChange(file.response.data.key, file.response.data.path)
                this.imgs = file.response.data.key
                this.details = file.response.data.path
            },
            onError() {
                this.$message({
                    message: '上传失败',
                    type: 'warning'
                });
            },
            handleChange(detail, img) {
                this.$emit('change', detail, img)
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__title {
        font-size: 18px;
        font-weight: 600;
        color: #fff
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
            margin-top: 20px;
        }
        .content-msg-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            p {
                color: #333;
                text-align: center;
                font-size: 14px;
                font-weight: 600;
                margin-right: 15px;
                width: 120px;
            }
            .p_icon:after{
                content: "*";
                color: red;
            }
            
        }
        .upImgs{
            color: #333;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            margin-right: 15px;
            width: 120px;
            display: inline-block;
        }
        .p_icon:after{
                content: "*";
                color: red;
            }
    }
	/deep/ .el-dialog__body {
		padding: 0 50px 42px;
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
		padding-bottom: 2px;
	}
	/deep/ .el-dialog__footer {
		padding: 0 72px 37px;
	}
    .remark {
        font-size: 14px;
        color: #999;
    }
    /deep/ .el-form-item__label {
        margin-top: 30px;
    }
    .img-upload {
        display: inline-block;
        /deep/ .el-upload-list--picture-card .el-upload-list__item {
            width: 100px;
            height: 100px;
            
        }
        /deep/ .el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 100px;
        }
        .upload-wrap {
            display: flex;
            align-items: center;
        }
        .icon-plus-wrap {
            width: 100px;
            height: 100px;
            border-radius: 6px;
            border: 1px dashed #c0ccda;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .img-group {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            li {
                box-sizing: border-box;
                width: 100px;
                height: 100px;
                padding: 5px;
                cursor: pointer;
                position: relative;
                &:hover .img-mask {
                    display: block;
                }
                .img-mask {
                    display: none;
                    position: absolute;
                    width: 90px;
                    height: 90px;
                    background-color: #000;
                    opacity: 0.5;
                    top: 5px;
                    left: 5px;
                    border-radius: 10px;
                    .img-control {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 10px;
                        margin-top: 35px;
                        i {
                            color: #fff;
                            font-size: 20px !important;
                        }
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    object-fit: cover;
                }
            }
        }
    }
</style>