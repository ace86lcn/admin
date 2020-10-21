<template>
    <div class="img-upload">
        <ul class="img-group">
            <li v-for="(item, index) in datas2" :key="index">
                <img :src="item" alt="">
                <div class="img-mask">
                    <div class="img-control">
                        <i class="el-icon-zoom-in"
                        @click="handlePictureCardPreview(index)"></i>
                        <i class="el-icon-delete"
                        @click="handleRemove(index)"></i>
                    </div>
                </div>
            </li>
        </ul>
        <div class="upload-wrap" v-if="datas2.length < max">
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
            <img width="100%" :src="preview_img" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import upToken from '@/utils/upToken'
    export default {
        props: {
            datas1: {
                type: Array
            },
            datas2: {
                type: Array
            },
            url: {
                type: String
            },
            max: {
                type: Number
            }
        },
        data() {
            return {
                upToken: upToken,
                previewShow: false,
                preview_img: ''
            }
        },
        methods: {
            handleRemove(index) {
                let arr1 = this.datas1
                let arr2 = this.datas2
                arr1.splice(index, 1)
                arr2.splice(index, 1)
                this.handleChange(arr1, arr2)
            },
            handlePictureCardPreview(index) {
                this.preview_img = this.datas2[index]
                this.previewShow = true
            },
            onSuccess(response, file, fileList) {
                let arr1 = this.datas1
                let arr2 = this.datas2
                arr1.push(file.response.data.key)
                arr2.push(file.response.data.path)
                this.handleChange(arr1, arr2)
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