import { requestUap, requestUmi } from '@/utils/request';

export async function getCaseList(data) {
  return requestUap('/testcase/', {
    method: 'GET',
    params: data,
  });
}

export async function deleteCase(data) {
  return requestUap(`/testcase/${data}/`, {
    method: 'DELETE',
    requestType: 'form',
  });
}

export async function debugCase(data) {
  return requestUap(`/debug/`, {
    method: 'POST',
    data,
  });
  // return requestUmi(`http://10.6.209.209:40001/mock/24/debug/`, {
  //   method: 'POST',
  //   data,
  // })
}

export async function getFuncs(data) {
  return requestUap(`/getfuncs/`, {
    method: 'GET',
    params: data,
  });
}

export async function getCalls(data) {
  return requestUap(`/get_call_case/${data}/`, {
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

export async function copyCase(data) {
  return requestUap(`/copy-testcase/`, {
    method: 'POST',
    data,
  });
}

export async function runCase(data) {
  return requestUap(`/test/`, {
    method: 'POST',
    data,
  });
}
