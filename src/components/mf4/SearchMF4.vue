<template>
    <div>
        <el-row :gutter="20">
            <!-- 不输入名字默认为全部 -->
            <!-- 文件名搜索框 -->
            <el-col :span="7">
                <div class="grid-content bg-purple search-input">

                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple search-input">
                    <el-input
                        placeholder="请输入要搜索的文件名"
                        v-model="search_name"
                        suffix-icon='el-icon-search'
                        clearable>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple search-input">

                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 此条不选默认为全选 -->
            <!-- 按标签查询 1.标签选择多选框 -->
            <el-col :span="12">
                <div class="grid-content bg-purple div-height div-check" style="overflow:auto;line-height:30px">
                    <!-- <el-checkbox :indeterminate="isIndeterminate_path" v-model="checkAll_path" @change="handleCheckAllChange_path">全选</el-checkbox> -->
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedLabels" @change="handleCheckedLabelChange">
                    <el-checkbox v-for="file_label in file_label_list" :label="file_label.id" :key="file_label.label" :checked='checked_path'>{{file_label.label}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
            <!-- 按路径查询 2.输入路径进行补充(输入路径之后, 选择的路径将会失效) -->
            <el-col :span="12">
                <div class="grid-content bg-purple div-height">
                    <el-input
                        placeholder="请输入要搜索的文件标签"
                        v-model="search_label"
                        clearable>
                    </el-input>

                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 此条不选默认为全选 -->
            <!-- 按路径查询 1.路径选择多选框 -->
            <el-col :span="12">
                <div class="grid-content bg-purple div-height div-check" style="overflow:auto;line-height:30px">
                    <!-- <el-checkbox :indeterminate="isIndeterminate_path" v-model="checkAll_path" @change="handleCheckAllChange_path">全选</el-checkbox> -->
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedPaths" @change="handleCheckedPathsChange">
                    <el-checkbox v-for="file_path in file_path_list" :label="file_path.table_name" :key="file_path.table_name" :checked='checked_path'>{{file_path.file_path}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
            <!-- 按路径查询 2.输入路径进行补充(输入路径之后, 选择的路径将会失效) -->
            <el-col :span="12">
                <div class="grid-content bg-purple div-height">
                    <el-input
                        placeholder="请输入要搜索的文件详细路径"
                        v-model="search_path"
                        clearable>
                    </el-input>

                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 此条不选默认为全选 -->
            <!-- 按大小进行查询 1.文件大小范围选择框 -->
            <el-col :span="11">
                <div class="grid-content bg-purple search-input">
                    <el-select v-model="file_size_value" placeholder="请选择文件大小或在右侧手动输入" style="width:200px">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <!-- 按大小进行查询 2.通过手动输入来进行限定范围, 只有一个值则另一个值记为最大或最小 -->
            <el-col :span="6">
                <div class="grid-content bg-purple search-input">
                    <el-input v-model="min_size" placeholder="请输入最小值"></el-input>
                </div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg-purple">
                   ~ 
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple search-input">
                    <el-input v-model="max_size" placeholder="请输入最大值"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 提交按钮, 触发事件进行请求 -->
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <el-button type="primary" round @click="search_btn">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {label_list_from_get} from '../axios_api/api.js'
export default {
    name: 'SearchMF4',
    data() {
        return {
            search_name: '',
            file_label_list: [],
            checkAll_label: false,
            checkedLabels: [],
            lables: [],
            search_label: '',
            // 文件路径多选框信息
            file_path_list: [],
            checkAll_path: false,
            checkedPaths: [],
            Paths: [],
            isIndeterminate_path: true,
            checked_path: false,
            search_path: '',
            //
            
            options: [{
            value: [0,100],
            label: '0~100'
            }, {
            value: [100,1000],
            label: '100~1000'
            }, {
            value: [1000,10000],
            label: '1000~10000'
            }, {
            value: [10000,100000],
            label: '10000~100000'
            }],
            file_size_value: [],
            //
            min_size: '',
            max_size: '',

            search_type_list: []

        }
    },
    mounted() {
        this.get_base_path();
        this.get_file_label_list()


    },
    methods: {
        handleCheckedTypesChange(value) {
            this.checkedTypes = value;
            let checkedCount = value.length;
            this.checkAll_type = checkedCount === this.types.length;
            this.isIndeterminate_type = checkedCount > 0 && checkedCount < this.types.length;
        },
        handleCheckedPathsChange(value) {
            this.checkedPaths = value;
            let checkedCount = value.length;
            this.checkAll_path = checkedCount === this.Paths.length;
            this.isIndeterminate_path = checkedCount > 0 && checkedCount < this.Paths.length;
        },
        handleCheckedLabelChange(value) {
            this.checkedLabels = value;
            let checkedCount = value.length;
            this.checkAll_label = checkedCount === this.lables.length;
            this.isIndeterminate_label = checkedCount > 0 && checkedCount < this.lables.length;
        },
        // 获取文件标签列表
        get_file_label_list() {
            label_list_from_get().then(res => {
                this.file_label_list = this.lables =  res.data
            })
        },
        // 获取文件基础盘列表
        get_base_path() {
            this.file_path_list = this.Paths = JSON.parse(localStorage.getItem('base_file'));
        },
        search_btn() {
            let file_path, file_size, file_path_search, file_label;
            if(this.search_label){
                for(let i = 0;i < this.file_label_list;i++){
                    if(this.file_label_list[i].label == this.search_label){
                        this.search_label = this.file_label_list[i].id
                    }
                }
            }
            if(this.checkedLabels.length > 0 && this.search_label.length > 0){
                file_label = this.checkedLabels.concat(this.search_label)
            }else{
                if(this.checkedLabels.length == 0 && this.search_label.length != 0){
                    file_label = [this.search_label]
                }else if(this.checkedLabels.length != 0 && this.search_label.length == 0){
                    file_label = this.checkedLabels
                }else{
                    file_label = []
                }
            }

            if(this.file_size_value.length > 0){
                file_size = this.file_size_value;
            }else{
                file_size = [this.min_size, this.max_size];
            }
            file_path = this.checkedPaths;
            file_path_search = this.search_path;
            localStorage.clear();
            localStorage.setItem('search_file', JSON.stringify({
                search_name: this.search_name,
                file_path_search: file_path_search,
                // mf4文件为189
                file_type: [189],
                file_path: file_path,
                file_size: file_size,
                file_label: file_label
                }))
            this.$router.push({path:'/show'})
        }

    }
}
</script>

<style lang='stylus'>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: rgb(255,255,255);
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .div-height {
        height 200px
    }
    .div-check {
        border 1px solid black;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-input {
        width 200px;

    }
    . search-input {
        height 50px;
        line-height 50px;
        margin-top 0;
    }
</style>