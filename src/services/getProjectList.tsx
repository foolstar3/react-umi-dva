import { requestUmi } from "@/utils/request";

export async function getProjectList(data){
    return requestUmi(`/qc/24/project/`,{
        method:'GET',
        params:data,
    }); 
}

export async function addProjectList(data){
    return requestUmi('/qc/24/project/',{
        method:'POST',
        data,
        requestType:'form',
    });
}

export async function deleteProjectList(data){
    return requestUmi(`/qc/24/project/${data.id}/`,{
        method:'DELETE',
        data,
        requestType:'form',
    });
}


export async function updateProjectList(data){
    return requestUmi(`/qc/24/project/${data.id}`,{
        method:'PUT',
        data,
        requestType:'form',
    });
}
