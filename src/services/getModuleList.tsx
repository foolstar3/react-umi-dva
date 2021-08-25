import { requestUmi } from "@/utils/request";


export async function getModuleList(data){
    return requestUmi(`/qc/24/module/`,{
        method:'GET',
        params:data,
    }); 
}

export async function addModuleList(data){
    return requestUmi('/qc/24/module/',{
        method:'POST',
        data,
        requestType:'form',
    });
}

export async function deleteModuleList(data){
    return requestUmi(`/qc/24/project/${data.id}/`,{
        method:'DELETE',
        data,
        requestType:'form',
    });
}


export async function updateModuleList(data){
    return requestUmi(`/qc/24/project/${data.id}`,{
        method:'PUT',
        data,
        requestType:'form',
    });
}
