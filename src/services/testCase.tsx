import { requestUap } from '@/utils/request';

export async function getCaseList(data) {
  // console.log(data);
  return requestUap('/testcase/', {
    method: 'GET',
    params: data,
  });
}

export async function deleteCase(data) {
  return requestUap(`/testcase/${data}`, {
    method: 'DELETE',
    requestType: 'form',
  });
}
