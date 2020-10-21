<template>
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
            <p style="margin-left: 15px;font-size: 14px;color: #a49999">长宽比1：1支持png、jpg、jpeg格式，不超过2M</p>
        </div>
        <!-- 预览大图 -->
        <el-dialog :visible.sync="previewShow">
            <img width="100%" :src="img" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import upToken from '@/utils/upToken'
    export default {
        props: {
            img: {
                type: String
            },
            url: {
                type: String
            }
        },
        data() {
            return {
                upToken: upToken,
                previewShow: false
            }
        },
        methods: {
            handleRemove() {
                this.handleChange('', '')
            },
            handlePictureCardPreview(file) {
                this.previewShow = true;
            },
            onSuccess(response, file, fileList) {
                this.handleChange(file.response.data.key, file.response.data.path)
            },
            onError() {
                this.$message({
                    message: '上传失败',
                    type: 'warning'
                });
            },
            handleChange(img1, img2) {
                this.$emit('change', img1, img2)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .img-upload {
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