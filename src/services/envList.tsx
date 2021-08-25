import { requestUmi } from '@/utils/request';

export async function getEnvList(data: any) {
  console.log(process.env.var);
  return requestUmi('/qc/env/', {
    method: 'GET',
    params: data,
  });
}

export async function toggleSwitch(data: any) {
  return requestUmi(`/qc/env/${data.id}/`, {
    method: 'PUT',
    data,
    requestType: 'form',
  });
}

export async function addEnvList(data: any) {
  return requestUmi(`/qc/env`, {
    method: 'POST',
    data,
    // 对于Headers里Content-Type=application/x-www-form-urlencoded
    // umi-request设置requestType: 'form'即可
    requestType: 'form',
  });
}

export async function deleteEnvList(data: any) {
  // console.log(data);
  return requestUmi(`/qc/env/${data.id}/`, {
    method: 'DELETE',
    requestType: 'form',
  });
}

export async function updateEnv(data: any) {
  // console.log(data);
  return requestUmi(`/qc/${data.id}/`, {
    method: 'PUT',
    data,
    // 对于Headers里Content-Type=application/x-www-form-urlencoded
    // umi-request设置requestType: 'form'即可
    requestType: 'form',
  });
}