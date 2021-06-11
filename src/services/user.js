/*
 * @Description: user 相关调用服务器
 * @Author: OriX
 * @LastEditors: OriX
 */
import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryNotices() {
  return request('/api/notices');
}
/**
 * 获取用户列表
 * @param {Object}} params 查询的参数
 */
export async function getUserList(params) {
  return request.get('/users', { params });
}
