/*
 * @description: 登录相关请求
 * @Author: OriX
 * @LastEditors: OriX
 */
import request from '@/utils/request';
/**
 * 账号登录
 * @param {Object} params
 * @returns
 */
export async function accountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}
/**
 * 退出登录
 * @returns
 */
export async function accountLogout() {
  return request.post(`/auth/logout`);
}
