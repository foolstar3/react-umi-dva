import { requestUap } from '@/utils/request';

export async function getEnvList(data) {
  // console.log(data);
  return requestUap(`/env/`, {
    method: 'GET',
    params: data,
  });
}

export async function toggleSwitch(data) {
  // console.log(data);
  return requestUap(`/env/${data.id}/`, {
    method: 'PUT',
    data,
    requestType: 'form',
  });
}

export async function addEnvList(datay) {
  return requestUap(`/env/`, {
    method: 'POST',
    data,
    // 对于Headers里Content-Type=application/x-www-form-urlencoded
    // umi-request设置requestType: 'form'即可
    requestType: 'form',
  });
}

export async function deleteEnvList(data) {
  // console.log(data);
  return requestUap(`/env/${data.id}/`, {
    method: 'DELETE',
    requestType: 'form',
  });
}

export async function updateEnv(data) {
  // console.log(data);
  return requestUap(`/env/${data.id}/`, {
    method: 'PUT',
    data,
    // 对于Headers里Content-Type=application/x-www-form-urlencoded
    // umi-request设置requestType: 'form'即可
    requestType: 'form',
  });
}
