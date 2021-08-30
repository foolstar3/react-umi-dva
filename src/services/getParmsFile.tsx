import { requestUap } from '@/utils/request';

export async function getParamsFile() {
  return requestUap('/api/getparamsfile', {
    method: 'GET',
  });
}

export async function addFile(data) {
  return requestUap('/api/addfile', {
    method: 'post',
    data,
  });
}

export async function deleteFile(data) {
  return requestUap('/api/deletefile', {
    method: 'delete',
    data,
  });
}

export async function getParamsFileCode(data) {
  return requestUap('/api/getparamsfilecode', {
    method: 'post',
    data,
  });
}

export async function updateParamsFileCode(data) {
  return requestUap('/api/updateparamsfilecode', {
    method: 'post',
    data,
  });
}
