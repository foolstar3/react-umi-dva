import { requestUap } from '@/utils/request';

export async function getProjectList(data) {
  return requestUap(`/project/`, {
    method: 'GET',
    params: data,
  });
}

export async function addProjectList(data) {
  return requestUap('/project/', {
    method: 'POST',
    data,
    requestType: 'form',
  });
}

export async function deleteProjectList(data) {
  return requestUap(`/project/${data.id}/`, {
    method: 'DELETE',
    data,
    requestType: 'form',
  });
}

export async function updateProjectList(data) {
  return requestUap(`/project/${data.id}/`, {
    method: 'PUT',
    data,
    requestType: 'form',
  });
}
