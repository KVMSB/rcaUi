from flask import current_app, request, abort
from llama_index.core.query_engine import CitationQueryEngine
from llama_index.core import VectorStoreIndex
from llama_index.core.tools import FunctionTool
from llama_index.readers.semanticscholar import SemanticScholarReader
from llama_index.core.agent import ReActAgent
from llama_index.core.llms import ChatMessage
from prompts import RESEARCH_AGENT_PROMPT


# this takes in event details and passes it to the semantic scholar to get relevant research articles
# NExt steps are - React Agent to continuously query to get the relevant articles because sometimes it returns nothing from internet.
# Have a threshold for maximum time it should search and a failsafe mechanism that throws "no relevant articles found".
def research_material():

    llm = current_app.config["LLM"]
    sllm_research = current_app.config["STRUCTLLM_3"]
    s2reader = SemanticScholarReader()

    try:
        required_fields = ["product_name", "test_name", "instrument_name", "root_cause"]

        data = request.json
        if data is None:
            return abort(400, description="Bad Request: JSON data is missing.")

        # Check for missing fields in the JSON payload
        missing_fields = [
            field
            for field in required_fields
            if field not in data or not str(data[field]).strip()
        ]
        if missing_fields:
            return abort(
                400, description=f"Missing required fields: {', '.join(missing_fields)}"
            )

        # Extract fields from JSON
        product_name = data["product_name"]
        test_name = data["test_name"]
        instrument_name = data["instrument_name"]
        root_cause = data["root_cause"]

    except KeyError:
        return abort(400, description="Bad Request: Required JSON fields are missing.")

    # Tool define
    scholar_search_tool = FunctionTool.from_defaults(fn=s2reader.load_data)

    agent = ReActAgent.from_tools(
        [scholar_search_tool], llm=llm, verbose=False, max_iterations=10
    )
    query = RESEARCH_AGENT_PROMPT.format(
        input=f"Product Name: {product_name}, Instrument Name: {instrument_name}, Test Name: {test_name}, Root Cause: {root_cause}"
    )

    response = agent.chat(query)
    input_msg = ChatMessage.from_str(str(response))
    response = sllm_research.chat([input_msg])

    print(response)

    return response.raw.json()

    query_space = """Milnacipran Hydrochloride Related Compounds by HPLC."""

    documents = s2reader.load_data(query=query_space, limit=10)

    index = VectorStoreIndex.fom_documents(
        documents,
    )

    query_engine = CitationQueryEngine.from_args(
        index,
        similarity_top_k=3,
        citation_chunk_size=512,
    )

    response = query_engine.query("Summarize .")

    # query the index
    print("Answer: ", response)
    print("Source nodes: ")
    for node in response.source_nodes:
        print(node.node.metadata)

    return {"summary": response, "articles": documents}
