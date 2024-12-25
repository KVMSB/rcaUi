from llama_index.core.llms import ChatMessage
from flask import Blueprint, current_app, request, abort
from prompts import DOMINANT_ROOT_CAUSE_PROMPT, RCA_CAPA_PROMPT


def root_cause_capa():

    sllm_rca = current_app.config["STRUCTLLM_2"]
    rag = current_app.config["RAG"]

    try:

        investigations = request.json

        # Extract JSON values
        event_description = investigations["incident"]["event_description"]
        product_name = investigations["incident"]["product_name"]
        test_name = investigations["incident"]["test_name"]
        instrument_name = investigations["incident"]["instrument_name"]
        detail_visual_symptoms = investigations["incident"]["detail_visual_symptoms"]
        immediate_actions = investigations["incident"]["immediate_actions"]
        questions = investigations["questions"]

    except ValueError as ve:
        return abort(400, description=str(ve))
    except KeyError as ke:
        return abort(400, description=str(ke))

    print(questions)

    # Generate the query for the dominant root cause
    query_dominant_root_cause = DOMINANT_ROOT_CAUSE_PROMPT.format(
        event=f"Name: {product_name}, Instrument Name: {instrument_name}, Test Name: {test_name}, "
        f"event Description: {event_description}, "
        f"Detailed visual symptoms: {detail_visual_symptoms}, Immediate Actions: {immediate_actions}, investigation questions answered by practitioner : {questions}"
    )
    historically_dominant_root_cause = rag.search(query_dominant_root_cause)

    # Format prompt for RCA CAPA
    prompt = RCA_CAPA_PROMPT.format(
        investigations=investigations,
        historical_context=historically_dominant_root_cause,
    )
    input_msg = ChatMessage.from_str(prompt)

    # Get structured output for probable root causes and CAPA
    probable_dominant_rootcause_capa = sllm_rca.chat([input_msg])
    return probable_dominant_rootcause_capa.raw.json()
