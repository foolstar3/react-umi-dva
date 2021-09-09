import { requestUap } from '@/utils/request';

export async function getUserList(data) {
  return requestUap(`/user/`, {
    method: 'GET',
    params: data,
  });
}
