<template>
    <div class="screen">
        <p>筛选</p>
        <p class="pt">{{title}}：</p>
        <el-select v-model="value" placeholder="请选择" >
					<el-option label="状态一" value="0"/>
					<el-option label="状态二" value="1"/>
				</el-select>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '状态 '
            }
        },
        data() {
            return {
                value: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .screen {
        display: flex;
        align-items: center;
        height: 74px;
        background-color: #fff;
        border-radius: 10px;
        p {
            font-size: 18px;
            padding-right: 26px;
            color: #666;
            font-weight: 600;
        }
        .pt{
            font-weight:500;
        }
    }
</style>
