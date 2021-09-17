import { requestUap } from '@/utils/request';
export async function onSwitchTask(data) {
  return requestUap(`/task/${data.id}/`, {
    method: 'PATCH',
    data: data,
    requestType: 'json',
  });
}
