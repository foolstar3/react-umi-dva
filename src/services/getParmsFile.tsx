import { requestUmi } from '@/utils/request';

export async function getParamsFile() {
  return requestUmi('/api/getparamsfile', {
    method: 'GET',
  });
}

export async function addFile(data) {
  return requestUmi('/api/addfile', {
    method: 'post',
    data,
  });
}

export async function deleteFile(data) {
  return requestUmi('/api/deletefile', {
    method: 'delete',
    data,
  });
}

export async function getParamsFileCode(data) {
  return requestUmi('/api/getparamsfilecode', {
    method: 'post',
    data,
  });
}

export async function updateParamsFileCode(data) {
  return requestUmi('/api/updateparamsfilecode', {
    method: 'post',
    data,
  });
}
