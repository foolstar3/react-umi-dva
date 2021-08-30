import { requestUap } from '@/utils/request';

export async function login(data) {
  return requestUap('/login/', {
    method: 'POST',
    requestType: 'form',
    data,
  });
}
