import { requestUmi } from "@/utils/request";


export async function getGlobalVarList(data){
    return requestUmi(`/qc/globalvar/`,{
        method:'GET',
        params:data,
    }); 
}

export async function addGlobalVar(data){
    return requestUmi('/qc/globalvar/',{
        method:'POST',
        data,
        requestType:'form',
    });
}

export async function deleteGlobalVar(data){
    return requestUmi(`/qc/globalvar/${data.id}/`,{
        method:'DELETE',
        data,
        requestType:'form',
    });
}


export async function updateGlobalVarList(data){
    return requestUmi(`/qc/globalvar/${data.id}`,{
        method:'PUT',
        data,
        requestType:'form',
    });
}
