from llama_index.core.llms import ChatMessage
from flask import current_app, request, abort
from prompts import PHASE_I_INVESTIGATION_QA_PROMPT, PHASE_II_INVESTIGATION_QA_PROMPT


def investigation_questions():

    llm = current_app.config["LLM"]
    sllm = current_app.config["STRUCTLLM_1"]
    rag = current_app.config["RAG"]

    try:
        data = request.json

        # Extract fields from JSON
        event_description = data["event_description"]
        product_name = data["product_name"]
        test_name = data["test_name"]
        instrument_name = data["instrument_name"]
        detail_visual_symptoms = data["detail_visual_symptoms"]
        immediate_actions = data["immediate_actions"]
        incident_type = data["incident_type"]

    except KeyError:
        return abort(400, description="Bad Request: Required JSON fields are missing.")

    incident = f"Name: {product_name}, Instrument Name: {instrument_name}, Test Name: {test_name}, event Description: {event_description}, Detailed visual symptoms: {detail_visual_symptoms}, Immediate Actions: {immediate_actions}"

    if incident_type == "Phase-I":
        query = PHASE_I_INVESTIGATION_QA_PROMPT.format(input=incident)
        relevant_questions = rag.search(query)
        query += f" relevant questions: {relevant_questions}"
    else:
        query = PHASE_II_INVESTIGATION_QA_PROMPT.format(incident=incident)

    response = llm.complete(query)

    # Process response and format output
    input_msg = ChatMessage.from_str(str(response))
    set_of_questions = sllm.chat([input_msg])
    return set_of_questions.raw.json()
