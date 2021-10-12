import { requestUap } from '@/utils/request';
export async function onSwitchTask(data) {
  return requestUap(`/task/${data.id}/`, {
    method: 'PATCH',
    data: data,
    requestType: 'json',
  });
}

export async function get_dashboard_info(data) {
  return requestUap(`/get_dashboard_info/`, {
    method: 'GET',
    params: data,
  });
}
