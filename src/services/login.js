/*
 * @description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import request from '@/utils/request';

export async function accountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
