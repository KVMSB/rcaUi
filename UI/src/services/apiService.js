import axiosInstance from "./axios";

export const getProbableCause=async (body)=>{
   return await axiosInstance.post(`/probable_root_causes`, body);
}


export const getInvestigationQuestions=async (body)=>{
    return await axiosInstance.post(`/investigation_questions`, body)
}


export const getResearchLinks=async (body)=>{
    return await axiosInstance.post(`/research_material_wrt_rootcause`, body)
}