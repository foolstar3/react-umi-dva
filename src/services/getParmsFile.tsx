import { requestUmi } from '../utils/request';

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
