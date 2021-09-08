import { requestUap } from '@/utils/request';

export async function getTaskList(data) {
  return requestUap(`/task/`, {
    method: 'GET',
    params: data,
  });
}

export async function addTaskList(data) {
  return requestUap('/task/', {
    method: 'POST',
    data,
    requestType: 'form',
  });
}

export async function deleteTaskList(data) {
  return requestUap(`/task/${data.id}/`, {
    method: 'DELETE',
    data,
    requestType: 'form',
  });
}

export async function updateTaskList(data) {
  return requestUap(`/task/${data.id}/`, {
    method: 'PUT',
    data,
    requestType: 'form',
  });
}
