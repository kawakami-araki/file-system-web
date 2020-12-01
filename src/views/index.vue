<template>
    <div style="margin:0;padding:0;width:100%">
        <div class='header-div'>
            <img src="../../static/index/header.png" alt="logo示例" style="margin-top:-10px;padding:0;width:100%;height:15px" />
        </div>
        <div><img src="../../public/timg.png" alt="logo示例" style="margin-top:20px;margin-left:200px"/></div>
        <hr style="margin:20px">
        <center style="margin-top:80px;margin-bottom:80px"><span style="font-size:44px;"><i>Document management system</i></span></center>
        <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="item in img_list" :key="item.url">
                <center>
                    <img :src="item.url" :alt="item.type" style="width:740px;height:400px" v-if="item.type=='img'">
                    <video :src="item.url" controls v-if="item.type=='video'" style="width:740px;height:400px"></video>
                </center>
            </el-carousel-item>
        </el-carousel>

        
        <!-- <el-row>
            <el-col :span="6" v-for="img in img_list" :key='img.url'>
                <div class="grid-content">
                    <img class='el-image' :src="img.url">
                </div>
            </el-col>
        </el-row> -->
        <el-row>
            <el-col :span="4"><div class="grid-content"><el-button type="success" icon="el-icon-d-arrow-left" @click="aboutBOSCH">ABOUT BOSCH</el-button></div></el-col>
            <el-col :span="3"><div class="grid-content"></div></el-col>
            <el-col :span="3"><div class="grid-content"></div></el-col>
            <el-col :span="4"><div class="grid-content"><el-button type="primary" @click="startUse">START USEING</el-button></div></el-col>
            <el-col :span="3"><div class="grid-content"></div></el-col>
            <el-col :span="3"><div class="grid-content"></div></el-col>
            <el-col :span="4"><div class="grid-content"><el-button type="success" @click="careersBOSCH">Join BOSCH<i class="el-icon-d-arrow-right el-icon--right"></i></el-button></div></el-col>
        </el-row>
        <hr style="margin:20px">
    </div>

    
  
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            img_list: [
                {
                    url: require('../../static/index/base_show.png'),
                    type: 'img'
                },
                {
                    url: require('../../static/index/file_search.png'),
                    type: 'img'
                },
                {
                    url: require('../../static/index/file_search_show.png'),
                    type: 'img'
                }
            ]

        }
    },
    mounted() {

    },
    methods: {
        startUse() {
            this.$router.push('/base')
        },
        aboutBOSCH() {
            window.open('https://bzo.bosch.com');
        },
        careersBOSCH() {
            window.open('https://www.bosch.com.cn/careers/');
        }
        
    }

}
</script>

<style lang='stylus' scoped>
    .el-button {
        width: 200px;
        height 80px
        margin-bottom 50px
        border-radius 15px
    }
    .el-tabs {
        margin-left 200px;
        margin-top 20px;
        border-style none
    }
    .header-div {
        margin:0;
        padding:0;
        width:100%
    }
    .el-image {
        width 260px;
        height 260px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel {
        
        margin: 80px 50px
    }

    .el-row {
        margin-bottom: 20px;
        margin-top: 50px;
        margin-left: 100px;
        margin-right: 100px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>