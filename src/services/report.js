import { requestUap } from '@/utils/request';

export async function getReportList(data) {
  return requestUap(`/report/`, {
    method: 'GET',
    params: data,
  });
}

export async function deleteReport(data) {
  return requestUap(`/report/${data}/`, {
    method: 'DELETE',
    requestType: 'form',
  });
}

export async function getReportDetail(data) {
  return requestUap(`/check/`, {
    method: 'GET',
    params: data,
  });
}
