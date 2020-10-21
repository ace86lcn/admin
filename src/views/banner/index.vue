<template>
    <div class="table-wrap">
        <div class="select">
            <div class="book">
                <span>轮播图状态</span>
                <el-select v-model="is_shelves" placeholder="请选择" @change="radioChange">
                    <el-option
                    v-for="item in changes"
                    :key="item.value" 
                    :label='item.label' 
                    :value='item.value'/>
                </el-select>
                </div>
            <div class="btn">
                <el-button type="primary" @click="add">新增轮播图</el-button>
            </div>  
        </div>
        <el-table :data="tableData"
                tooltip-effect="dark"
                style="width: 100%; margin-top: 20px">
            <el-table-column prop="img_url"
                            label="轮播图图片">
                <template slot-scope="scope">
                    <img :src="scope.row.img_url" alt="图片无法正常显示" style="width: 120px;height: 120px">
                </template>
            </el-table-column>
            <el-table-column prop="banner_name"
                            label="轮播图名称"
                           />
            <el-table-column prop="href"
                            label="跳转链接">
            </el-table-column>
            <el-table-column prop="level"
                            label="优先级"/>
            <el-table-column prop="is_shelves"
                            label="轮播图状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.is_shelves === 1">已下架</span>
                        <span v-if="scope.row.is_shelves === 0">已上架</span>
                    </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="170">
                <template slot-scope="scope">
                    <p class="table-handle">
                        <span @click="edit(scope.row.id)">编辑</span>
                        <span @click="upload(scope.row.id)" v-if="scope.row.is_shelves === 0">下架</span>
                        <span @click="onload(scope.row.id)" v-if="scope.row.is_shelves === 1">上架</span>
                        <span @click="detete(scope.row.id)">删除</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pages :page.sync="page" :total="total"/>
        <!-- 上下架弹窗 -->
        <handle-dialog  :show="show"
                        :content="content"
                        @close="show = false"
                        @confirm="handleDialog"/>
        <!-- 删除弹窗 -->
        <handle-dialog  :show="show2"
                        :content="contentDelete"
                        @close="show2 = false"
                        @confirm="deleteDialog"/>
        <img-banner
            :show="show1"
			header_title="提示"
			:title="hander_title"
             :id="id"
			url="/operate/Upload/banner"
			:img="img_detail"
			:detail="img_detail"
			@close="show1 = false"
			@confirm="imgDialog"
			@change="changeImg"
        
        />
    </div>
</template>

<script>
    import { getList, deleteList } from '../../api/banner'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog'),
            'ImgBanner': () => import('@/components/ImgBanner')
        },
        data() {
			return {
				page: 1,                   // 当前页数
                total: 0,                  // 列表总条数
                tableData: [],             // 列表数据
                show: false,               // 上下架弹窗
                show1: false,              // 新增编辑弹窗
                show2: false,              // 删除弹窗
                content: '上架后将显示该轮播图，确认上架？',              // 上下架提示
                contentDelete: '删除后将不能恢复，确认删除？',            // 删除提示
                hander_title: '新增轮播图',                             // banner头部信息
                id: '',                                                // bannerid
                deieteId: '',                                          // 删除id
                changes: [                                             // 下拉框数据
                    {value: 0, label: '已上架'},
                    {value: 1, label: '已下架'}
                ],
                row: {},
                is_shelves: '',                                       // 轮播图状态
                img: '',                                              // 相对路径
                img_detail: '',                                       // 绝对路径
                banner_name: '',                                      // banner名称                                  
                href:'',                                              // banner地址
                level: '',                                            // banner优先级
                img_url: ''                                           // banner图片
			}
		},
		watch: {
            'page'(val) {
                this.getList()
            }
        },
		methods: {
            // 列表数据
			getList() {
                this.$http(getList, {
						page: this.page,
						is_shelves: this.is_shelves
				})
				.then(res => {
					if(res.data.code === 200) {
						this.total = res.data.data.total
						this.tableData = res.data.data.data
					}
				})
            },
            // 搜索
			handleSearch(val) {
                this.content = val
				this.page = 1
				this.getList()
            },
            // 重置
            handleReset() {
                this.content = ''
				this.page = 1
				this.getList()
            },
            // 下拉框事件
            radioChange() {
				this.page = 1
				this.getList()
            },
            // 新增弹窗
            add () {
                this.id = ''
                this.show1 = true
                this. hander_title = '新增轮播图'
            },
            // 编辑弹窗
            edit (id) {
                this.show1 = true
                this.id = id + ''
                this. hander_title = '编辑轮播图'
            },
            // 上架弹窗
            onload(id) {
                this.show = true
                this.id = id
                this.content = '上架后将显示该轮播图，确认上架？'
            },
            // 下架弹窗
            upload(id) {
                this.show = true
                this.id = id
                this.content = '下架后将不显示该轮播图，确认下架？'
            },
            changeImg(img, detail) {
              this.img = img;
              this.img_detail = detail;
            },
            imgDialog () {
                this.getList()
                this.show1 = false
            },
            // 删除
            detete (id) {
                this.show2 = true
                this.deieteId = id
            },
            handleDialog() {
                let id = this.id
                this.$axios.get(`/operate/SmallBanner/shelves/${id}`)
                .then(res => {
                    if (res.data.code === 200) {
                        this.show = false
                        this.$msg.Success(res.data.data)
                        this.getList()
                    }
                })
            },
            deleteDialog () {
                this.$http(deleteList, {
                        id: this.deieteId
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.$msg.Success(res.data.data)
                        this.getList()
                        this.show2 = false
                    }
                })
            }
		},
		created() {
			this.getList()
		}
    }
</script>

<style lang="scss" scoped>
	.btn {
        text-align: right;
        margin-right: 30px;
    }
    .select{
		display: flex;
		justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 40px;
        .book{
            margin-left: 30px;
        }
		span{
			font-size: 14px;
			margin-right: 20px;
		}
		.select-title {
			font-size: 18px;
			padding-right: 26px;
			color: #666;
			font-weight: 600;
		}
	}
</style>