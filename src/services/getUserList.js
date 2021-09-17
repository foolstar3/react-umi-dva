import { requestUap } from '@/utils/request';

export async function getUserList(data) {
  return requestUap(`/user/`, {
    method: 'GET',
    params: data,
  });
}
export async function getUserName(data) {
  return requestUap(`/user/${data.id}/`, {
    method: 'GET',
    params: data,
  });
}
