import { requestUmi } from '@/utils/request';

export async function getEditorCode(data) {
  return requestUmi('/api/geteditorcode', {
    method: 'GET',
    data,
  });
}
