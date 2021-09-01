import { requestUap } from '@/utils/request';

export async function getReportList(data: any) {
  return requestUap(`/report/`, {
    method: 'GET',
    params: data,
  });
}

export async function deleteReport(data: any) {
  // console.log(data);
  return requestUap(`/report/${data}`, {
    method: 'DELETE',
    requestType: 'form',
  });
}
