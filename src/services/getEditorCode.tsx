import { requestUap, requestUmi } from '../utils/request';

export async function getEditorCode() {
  return requestUmi('/api/geteditorcode', {
    method: 'GET',
  });
}
