import { requestUap } from '@/utils/request';

export async function getParamsFile(data) {
  return requestUap('/paramsfile/', {
    method: 'GET',
    params: data,
  });
}

export async function addFile(data) {
  console.log(data);
  return requestUap('/paramsfile/', {
    method: 'post',
    data,
    requestType: 'form',
  });
}

export async function deleteFile(data) {
  return requestUap(`/paramsfile/${data.id}/`, {
    method: 'delete',
    requestType: 'form',
  });
}

export async function getParamsFileCode(data) {
  return requestUap(`/paramsfile/${data}/`, {
    method: 'get',
  });
}

export async function updateParamsFileCode(data) {
  return requestUap(`/paramsfile/${data.id}/`, {
    method: 'put',
    requestType: 'form',
    data,
  });
}
