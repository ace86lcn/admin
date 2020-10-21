<template>
	<el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in routes"
                            :key="index" 
                            :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
	export default {
		props: {
            routes: {
                type: Array
            }
        }
	}	
</script>

<style lang="scss" scoped>
    /deep/ .el-breadcrumb__inner.is-link:hover {
        color: #3A62D7;
    }
</style>