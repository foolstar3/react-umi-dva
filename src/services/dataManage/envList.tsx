import { requestUmi } from '@/utils/request';

export async function getEnvList(data) {
  return requestUmi('/qc/24/env/', {
    method: 'GET',
    data,
  });
}
