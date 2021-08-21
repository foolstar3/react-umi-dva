import { requestUmi } from '@/utils/request';

export async function getEnvList(data) {
  return requestUmi('/api/getenvlist', {
    method: 'GET',
    params: data,
  });
}

export async function toggleSwitch(data) {
  return requestUmi(`/qc/24/env/${data.id}/`, {
    method: 'PUT',
    params: data,
  });
}
