import { requestUmi } from "@/utils/request";


export async function getModuleList(data){
    return requestUmi(`/qc/module/`,{
        method:'GET',
        params:data,
    }); 
}

export async function addModuleList(data){
    return requestUmi('/qc/module/',{
        method:'POST',
        data,
        requestType:'form',
    });
}

export async function deleteModuleList(data){
    return requestUmi(`/qc/project/${data.id}/`,{
        method:'DELETE',
        data,
        requestType:'form',
    });
}


export async function updateModuleList(data){
    return requestUmi(`/qc/project/${data.id}`,{
        method:'PUT',
        data,
        requestType:'form',
    });
}
