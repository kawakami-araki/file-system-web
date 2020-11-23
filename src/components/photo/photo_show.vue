<template>
  <div>
        <el-table :data="file_data.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="50px">
            </el-table-column>
            
            <el-table-column label="缩略图" width="80px">
                
                <template slot-scope="scope">
                    <!-- <iframe :src="scope.row.file_path"></iframe> -->
                    <img :src="'http://10.178.229.1:8000/static/' + scope.row.file_name + '.' + scope.row.file_type" style="width:50px;height:50px">
                </template>

            </el-table-column>

            <el-table-column label="图片名" width="200px">
                <template slot-scope="scope">
                    <a :href="'http://10.178.229.1:8000/static/' + scope.row.file_name + '.' + scope.row.file_type" target="_blank">{{ scope.row.file_name }}</a>
                </template>
                
            </el-table-column>
            <el-table-column prop="file_size" label="图片大小" :formatter="formatterSize" width="80px">
            </el-table-column>
            <el-table-column prop="file_type" label="图片类型" width="80px">
            </el-table-column>
            <el-table-column prop="file_path" label="图片路径">
            </el-table-column>
            <el-table-column prop="is_delete" label="是否删除" width="80px">
            </el-table-column>
            <el-table-column prop="file_label" label="文件标签" width="80px">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template slot-scope="scope">
                    <el-button @click="handleClickAdd(scope.row)" type="text" size="small">添加新标签</el-button>
                    <el-button @click="handleClickUpdate(scope.row)" type="text" size="small">修改标签</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination align='center' 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page="currentPage" 
            :page-sizes="[1,5,10,20]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="file_data.length">
        </el-pagination>
  </div>
</template>

<script>
import {photo_data_from_get,file_type_list_get,label_list_from_get,label_create_from_get,label_update_from_get} from '../axios_api/api.js'
export default {
    name: 'PhotoShow',
    data() {
        return {
            file_data: [],
            file_type_list: [],
            file_label_list: [],
            currentPage: 1, // 当前页码
            total: 0, // 总条数
            pageSize: 10 // 每页的数据条数
        }
    },
    mounted() {
        this.get_file_data()
        this.get_file_type_list()
        this.get_file_label_list()
    },
    methods: {
        handleClickAdd(val) {
            this.$prompt('请输入要添加的标签', '添加新标签', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
                }).then(({ value }) => {
                    let new_value = value;
                    label_create_from_get({
                        label: new_value,
                        table: 'PhotoData',
                        id: val.id
                        }).then(res =>{
                        let res_code;
                        if(res.code==200){res_code='success'}else{res_code='info'}
                        this.$message({
                            type: res_code,
                            message: res.message
                        });
                        this.$router.go(0);
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        handleClickUpdate(val) {
            this.$prompt('请对标签进行修改', '修改标签情况', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: val.file_label
                }).then(({ value }) => {
                    let new_value = value;
                    label_update_from_get({
                        label: new_value,
                        table: 'PhotoData',
                        id: val.id
                        }).then(res =>{
                        let res_code;
                        if(res.code==200){res_code='success'}else{res_code='info'}
                        this.$message({
                            type: res_code,
                            message: res.message
                        });
                        this.$router.go(0);
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        // 检索文件
        get_file_data(){
            if(localStorage.getItem('search_photo') == null){
                localStorage.setItem('search_photo', JSON.stringify({
                    search_name: '',
                    file_path: '',
                    file_label: ''
                    }))
            } 
            photo_data_from_get({data: JSON.parse(localStorage.getItem('search_photo'))}).then(res => {
                if(res.data.length == 0){
                    this.$message({
                        type:'info',
                        message: '未找到符合条件的数据, 请重新搜索'
                    });
                    this.$router.push({path: '/search'})
                }
                this.file_data = res.data;
                this.total = res.data.length;
            })
        },
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 获取文件类型列表
        get_file_type_list() {
            file_type_list_get().then(res => {
                this.file_type_list = res.data;
            })
        },
        // 获取文件标签列表
        get_file_label_list() {
            label_list_from_get().then(res => {
                this.file_label_list = res.data;
            })
        },
        // 过滤器type
        // formatterType(row, column) {
        //     console.log(column)
        //     let type_id = row.file_type;
        //     if(type_id){
        //         for(let i = 0;i < this.file_type_list.length;i++){
        //             if(this.file_type_list[i].id == type_id){
        //                 return this.file_type_list[i].file_type
        //             }
        //         }
        //     }
        //     return 'Folder'

        // },
        // 过滤器Size
        formatterSize(row, column) {
            console.log(column)

            let file_size = row.file_size;
            if(file_size < 1024){
                return file_size + 'KB'
            }else if(file_size >= 1024 && file_size < 1024*1024){
                return (file_size/1024).toFixed(3) + 'MB'
            }else{
                return ((file_size/1024)/1024).toFixed(3) + 'GB'
            }
        }
    }

}
</script>

<style>

</style>