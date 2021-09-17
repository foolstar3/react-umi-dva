import { requestUap } from '@/utils/request';

export async function getReportList(data) {
  return requestUap(`/report/`, {
    method: 'GET',
    params: data,
  });
}

export async function deleteReport(data) {
  // console.log(data);
  return requestUap(`/report/${data}`, {
    method: 'DELETE',
    requestType: 'form',
  });
}
