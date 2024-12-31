import axiosInstance from "./axios";

export const getProbableCause = async (body) => {
    return await axiosInstance.post(`/probable_root_causes`, body);
}


export const getInvestigationQuestions = async (body) => {
    return await axiosInstance.post(`/investigation_questions`, body)
}


export const getResearchLinks = async (body) => {
    return await axiosInstance.post(`/research_material`, body)
}


export const downloadHypothesisReport = async (body) => {
    return await axiosInstance.post(`/hypothesis_wrt_rootcause`, body);
}

export const establishmentSummary = async (body) => {
    return await axiosInstance.post(`/establishment_summary`, body);
}


export const trainingMaterial= async (body) => {
    return await axiosInstance.post(`/training_material_gen`, body);
}


export const imapactAssesment= async (body) => {
    return await axiosInstance.post(`/impact_assessment`, body);
}


export const conclusionSummary= async (body) => {
    return await axiosInstance.post(`/final_summary`, body);
}