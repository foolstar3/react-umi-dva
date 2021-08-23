import { requestUmi } from '@/utils/request';

export async function getEnvList(data) {
  console.log(process.env.var);
  return requestUmi('/qc/24/env/', {
    method: 'GET',
    params: data,
  });
}

export async function toggleSwitch(data) {
  return requestUmi(`/qc/24/env/${data.id}/`, {
    method: 'PUT',
    data,
    requestType: 'form',
  });
}

export async function addEnvList(data) {
  return requestUmi(`/qc/24/env/`, {
    method: 'POST',
    data,
    // 对于Headers里Content-Type=application/x-www-form-urlencoded
    // umi-request设置requestType: 'form'即可
    requestType: 'form',
  });
}

export async function deleteEnvList(data) {
  // console.log(data);
  return requestUmi(`/qc/24/env/${data.id}/`, {
    method: 'DELETE',
    requestType: 'form',
  });
}

export async function updateEnv(data) {
  // console.log(data);
  return requestUmi(`/qc/24/env/${data.id}/`, {
    method: 'PUT',
    data,
    // 对于Headers里Content-Type=application/x-www-form-urlencoded
    // umi-request设置requestType: 'form'即可
    requestType: 'form',
  });
}
