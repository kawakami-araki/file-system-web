<template>
    <el-table :data="base_file_data" border style="width: 100%;">
        <el-table-column prop="file_name" label="磁盘名称" width="200">
        </el-table-column>
        <el-table-column prop="table_name" label="磁盘数据库" width="200">
        </el-table-column>
        <el-table-column prop="file_path" label="磁盘路径">
        </el-table-column>
        <el-table-column label="磁盘使用情况统计图" width="300">
            <div class="main" style="float:left;width:300px;height: 300px" @click='ClickBaseCearch()'></div>
        </el-table-column>
    </el-table>
</template>

<script>

import echarts from 'echarts'

import {file_from_base_get,base_file_data_from_get } from '../axios_api/api.js'
export default {
    name: 'Base',
    data() {
        return {
            base_file_data: [],
        }
    },
    mounted() {
        this.get_base_data();
        this.get_base_data_list();
    },
    methods: {
        ClickBaseCearch(val) {
            console.log(val)
        },
        // 基础信息获取
        get_base_data() {
            file_from_base_get().then(res => {
                localStorage.setItem('base_file', JSON.stringify(res.data));
                console.log(res.data)
                this.base_file_data = res.data;
            });
        },
        get_base_data_list() {
            base_file_data_from_get().then(res => {
                this.create_pie_plot(res.data, res.type_list);
                let type_list = [];
                for(let i = 0;i < res.data.length;i++){
                    for(let j = 0;j < res.data[i].length;j++){
                        type_list.push(res.data[i][j].name);
                    }
                }
                console.log(type_list)
                localStorage.setItem('file_type', JSON.stringify(type_list));
            });
            
        },
        create_pie_plot(data, type_list) {
            
            // 捕捉div， 添加数据
            var myChart_1 = echarts.init(document.getElementsByClassName('main')[1]);
            var myChart_2 = echarts.init(document.getElementsByClassName('main')[2]);
            var myChart_3 = echarts.init(document.getElementsByClassName('main')[3]);
            var myChart_4 = echarts.init(document.getElementsByClassName('main')[4]);
            var myChart_5 = echarts.init(document.getElementsByClassName('main')[5]);
            var myChart_list = [myChart_1, myChart_2,myChart_3, myChart_4, myChart_5]
            for(var i=0;i<myChart_list.length;i++){
                var pie_value = data[i];
                if(pie_value.length == 0){
                    pie_value = [{'value':1, 'name':'None'}]
                }
                console.log(pie_value)
                myChart_list[i].setOption({
                    title : {
                        text: '',//主标题
                        x:'center',//x轴方向对齐方式
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: 'bottom',
                        data: type_list
                    },
                    series : [
                        {
                            name: '',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:pie_value,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                            }
                        }
                    ]
                });
            }
            
        }
    }

}
</script>

<style lang='stylus'>
.el-table__header tr,
        .el-table__header th {
            padding: 0;
            height: 50px;
            line-height: 30px;
            font-size: 18px
        }
        .el-table__body tr,
        .el-table__body td {
            padding: 0;
            height: 30px;
            font-size: 16px
            line-height: 30px;
        }

</style>