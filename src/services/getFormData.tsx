import { requestUmi } from '../utils/request';

export async function getFormData() {
  return requestUmi('/api/getformdata', {
    method: 'GET',
  });
}
