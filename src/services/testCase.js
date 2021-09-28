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
  console.log(data);
  return requestUap(`/debug/`, {
    method: 'POST',
    data,
  });
}

export async function getFuncs(data) {
  return requestUap(`/getfuncs/`, {
    method: 'GET',
    data,
  });
}

export async function getCalls(data) {
  return requestUap(`/get_call_case/${data}`, {
    method: 'GET',
  });
}

export async function updateCase(data) {
  const id = data.id;
  return requestUap(`/testcase/${id}/`, {
    method: 'PUT',
    data: data.payload,
  });
}

export async function createCase(data) {
  return requestUap(`/testcase/`, {
    method: 'POST',
    data,
  });
}
