import { requestUap } from '@/utils/request';

export async function login(data) {
  return requestUap('/login/', {
    method: 'POST',
    requestType: 'form',
    data,
  });
}

export async function logout(data) {
  return requestUap('/logout/', {
    method: 'POST',
    requestType: 'form',
    data,
  });
}
