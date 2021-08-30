import { requestUap } from "@/utils/request";


export async function getModuleList(data){
    return requestUap(`/module/`,{
        method:'GET',
        params:data,
    }); 
}

export async function addModuleList(data){
    return requestUap('/module/',{
        method:'POST',
        data,
        requestType:'form',
    });
}

export async function deleteModuleList(data){
    return requestUap(`/project/${data.id}/`,{
        method:'DELETE',
        data,
        requestType:'form',
    });
}


export async function updateModuleList(data){
    return requestUap(`/project/${data.id}`,{
        method:'PUT',
        data,
        requestType:'form',
    });
}
