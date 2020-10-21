<template>
    <div class="page-header">
        <i class="el-icon-arrow-left" @click="$router.back()"/>
        <span class="title">{{title}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-header {
        display: flex;
        align-items: center;
        i {
            font-size: 26px;
            font-weight: 600;
            color: #3A62D7;
            cursor: pointer;
        }
        .title {
            font-size: 22px;
            color: #666;
            font-weight: 600;
            margin-left: 15px;
        }
    }
</style>