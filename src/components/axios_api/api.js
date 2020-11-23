//将我们http.js中封装好的  get,post.put,delete  导过来

import { axios_get } from './http.js'

// 路由拦截
// 获取全部数据
export const file_data_get = p => axios_get("/app/file_data/", p)

// 获取磁盘下各种类型的文件的体积的请求
export const base_file_data_from_get = p => axios_get("/app/get_base_file_data/", p)
// 获取文件类型列表
export const file_type_list_get = p => axios_get("/app/file_type_list/", p)
// 搜索模块请求接口
export const file_data_from_get = p => axios_get("/app/get_file_data/", p)



// 获取基础盘信息接口
export const file_from_base_get = p => axios_get("/app/getbase/", p)
// 获取基础盘文件大小数据
export const data_size_from_get = p => axios_get("/app/get_data_size/", p)
// 获取基础盘文件数量数据
export const data_sum_from_get = p => axios_get("/app/get_data_sum/", p)


//标签列表请求接口
export const label_list_from_get = p => axios_get("/app/getlabels/", p)

// 创建标签的请求
export const label_create_from_get = p => axios_get("/app/createlabel/", p)

// 修改标签请求
export const label_update_from_get = p => axios_get('/app/update_label/', p)


export const photo_data_from_get = p => axios_get('/app/photo_search/', p)


export const data_analysis_task_get = p => axios_get('/app/data_analysis/', p)





