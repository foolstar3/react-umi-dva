import { requestUap } from '@/utils/request';

export async function getCaseList(data) {
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

export async function debugCase(data) {
  return requestUap(`/debug/`, {
    method: 'POST',
    data,
  });
}
