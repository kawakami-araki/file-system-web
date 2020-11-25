<template>
    <el-form ref="form" :model="form" label-width="80px" style="width:500px;margin-left:300px">
        <el-form-item label="功能名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="需求描述">
            <el-input type="textarea" v-model="form.desc" placeholder="请详细写入你的需求"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交任务</el-button>
            <el-button @click="CloseSubmit">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// import {data_analysis_task_get} from '../axios_api/api.js'
export default {
    name: 'Root',
    data() {
        return {
            // 准备数据
            form: {
                name: '',
                desc: '',
            },
        }
    },
    mounted() {
        this.transferData()

    },
    methods: {
        // 提交数据给后端
        onSubmit() {
            console.log(this.form)
            // data_analysis_task_get({data: JSON.stringify(this.form)}).then(res =>{
            //     console.log(res);
            // })
        },
        // 准备数据文件信息
        transferData() {
            let data_file_list = JSON.parse(localStorage.getItem('data_file_list'));
            console.log(data_file_list)
        }

    }

}
</script>

<style lang='stylus'>

el-form-item
    border 1px solid black
.el-textarea {
  textarea {
    padding: 20px 20px
  }
}
</style>