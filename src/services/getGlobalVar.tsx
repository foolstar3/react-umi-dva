import { requestUap } from "@/utils/request";


export async function getGlobalVarList(data){
    return requestUap(`/globalvar/`,{
        method:'GET',
        params:data,
    }); 
}

export async function addGlobalVar(data){
    return requestUap('/globalvar/',{
        method:'POST',
        data,
        requestType:'form',
    });
}

export async function deleteGlobalVar(data){
    return requestUap(`/globalvar/${data.id}/`,{
        method:'DELETE',
        data,
        requestType:'form',
    });
}


export async function updateGlobalVarList(data){
    return requestUap(`/globalvar/${data.id}`,{
        method:'PUT',
        data,
        requestType:'form',
    });
}