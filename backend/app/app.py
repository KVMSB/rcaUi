from flask import Flask
from services import rag_service, LLMService, RAGService
from routes import investigation_questions, root_cause_capa, research_material
from llama_index.core import SimpleDirectoryReader
from services import event_investigation_questions_format, probable_root_causes_format, research_outputs
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

llm_initializer = LLMService('../config.json') 
llm, embed_model = llm_initializer.get_llm(), llm_initializer.get_embed_model()
sllm = llm.as_structured_llm(output_cls=event_investigation_questions_format)
sllm_rca = llm.as_structured_llm(output_cls=probable_root_causes_format)
sllm_research = llm.as_structured_llm(output_cls=research_outputs)
documents = SimpleDirectoryReader("../data/").load_data()
rag = RAGService(documents)

app.config['LLM'] = llm
app.config['STRUCTLLM_1'] = sllm
app.config['STRUCTLLM_2'] = sllm_rca
app.config['STRUCTLLM_3'] = sllm_research
app.config['RAG'] = rag

app.add_url_rule('/investigation_questions', view_func=investigation_questions, methods=['POST'])
app.add_url_rule('/probable_root_causes', view_func=root_cause_capa, methods=['POST'])
app.add_url_rule('/research_material_wrt_rootcause', view_func=research_material, methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True)
