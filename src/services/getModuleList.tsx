import { requestUmi } from "@/utils/request";

// export async function getModuleList(data){
//     return requestUmi(`http://10.6.209.209:40001/mock/24/module/?page='${data.page}'`,{
//         method:'GET'
//     }) 
// }


export async function getModuleList(data){
    return requestUmi(`http://10.6.209.209:40001/mock/24/module/?page='${data.page}'`,{
        method:'GET',
        requestType: 'form',
        // data
    }) 
}
