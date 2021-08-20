import { requestUmi } from "@/utils/request";

export async function getProjectList(data){
    return requestUmi(`http://10.6.209.209:40001/mock/24/project/?page='${data.page}'`,{
        method:'GET'
    }) 
}
