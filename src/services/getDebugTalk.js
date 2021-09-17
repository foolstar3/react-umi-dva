import { requestUap } from '@/utils/request';

export async function getDebugTalkList(data) {
  return requestUap(`/debugtalk/`, {
    method: 'GET',
    params: data,
  });
}

export async function updateDebugTalkList(data) {
  return requestUap(`/debugtalk/${data.id}/`, {
    method: 'PUT',
    data,
    requestType: 'form',
  });
}
