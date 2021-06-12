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
  return request.get('/admin/users', { params });
}
/**
 * 修改用户的锁定状态
 * @param {String} userName  用户唯一用户名
 * @param {Number} newLock 新的lock状态
 * @returns
 */
export async function changeUserLock(userName, newLock) {
  return request(`/admin/users/${userName}/lock`, {
    method: 'PATCH',
    data: { newLock },
  });
}
/**
 * 重置用户的密码为默认密码
 * @param {String} userName  用户唯一用户名
 * @returns
 */
export async function resetUserPwd(userName) {
  return request(`/admin/users/${userName}/resetPwd`, {
    method: 'PATCH',
  });
}
