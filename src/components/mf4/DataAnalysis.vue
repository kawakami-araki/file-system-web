<template>
    <el-form ref="form" :model="form" label-width="80px" style="width:500px;margin-left:300px">
        <el-form-item label="信号名称">
            <el-input v-model="form.signal_name" placeholder="多条信号以|符进行分割"></el-input>
        </el-form-item>
        <el-form-item label="信号类型">
            <el-checkbox-group v-model="form.type">
            <el-checkbox label="横向速度" name="type"></el-checkbox>
            <el-checkbox label="纵向速度" name="type"></el-checkbox>
            <el-checkbox label="横向加速度" name="type"></el-checkbox>
            <el-checkbox label="纵向加速度" name="type"></el-checkbox>
            <el-checkbox label="转向灯" name="type"></el-checkbox>
            <el-checkbox label="方向盘扭矩" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="偏差值">
            <el-input-number v-model="form.norm" :step="0"></el-input-number>
        </el-form-item>
        <el-form-item label="偏差值应用情况">
            <el-checkbox-group v-model="form.region">
            <el-checkbox label="横向速度" name="type"></el-checkbox>
            <el-checkbox label="纵向速度" name="type"></el-checkbox>
            <el-checkbox label="横向加速度" name="type"></el-checkbox>
            <el-checkbox label="纵向加速度" name="type"></el-checkbox>
            <el-checkbox label="转向灯" name="type"></el-checkbox>
            <el-checkbox label="方向盘扭矩" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="需求描述">
            <el-input type="textarea" v-model="form.desc" placeholder="请详细写入你的需求，包括详细的需求描述，实现效果，越详细越好， 这些信息将提交给后端工作人员，根据你的要求来进行实现，务必条理清晰"></el-input>
        </el-form-item>
        <el-form-item label="生成html">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交任务</el-button>
            <el-button @click="CloseSubmit">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {data_analysis_task_get} from '../axios_api/api.js'
export default {
    name: 'DataAnalysis',
    data() {
        return {
            form: {
                signal_name: '',
                type: [],
                norm: 0,
                region: [],
                desc: '',
                delivery: false,
                data: []
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
            data_analysis_task_get({data: JSON.stringify(this.form)}).then(res =>{
                console.log(res);
            })
        },
        // 准备数据文件信息
        transferData() {
            let data_file_list = JSON.parse(localStorage.getItem('data_file_list'));
            console.log(data_file_list)
            if(data_file_list != null){
                this.form.data = data_file_list
            }else{
                this.$message({
                    type: 'info',
                    message: '未获取到数据文件，请重新选择'
                })
                this.$router.push({path: '/mf4_show'})
            }
        }

    }
}
</script>

<style lang='stylus'>
el-form-item
    border 1px solid black
</style>