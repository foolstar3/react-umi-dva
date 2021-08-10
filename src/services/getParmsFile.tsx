import { requestUmi } from '../utils/request';

export async function getParamsFile() {
  return requestUmi('/api/getparamsfile', {
    method: 'GET',
  });
}
