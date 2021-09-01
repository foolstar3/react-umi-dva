import { requestUap } from '@/utils/request';

export async function getCaseList(data) {
  return requestUap('/testcase/', {
    method: 'GET',
    params: data,
  });
}
