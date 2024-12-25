from typing import Dict, List
from pydantic import BaseModel, Field

class event_investigation_questions_format(BaseModel):
    """Data model for in depth questions generation."""

    event_description: str
    questions : list[str]

class root_cause_and_capa_format(BaseModel):
    root_cause: str
    details: str
    capa: str = Field(description="It has corrective action and preventive action for the root cause.")

class article_info(BaseModel):
    """Data model for storing article's relevant metadata"""
    article_title: str
    article_summary: str
    instrument: str = Field(description="The main key instrument used in the process.")
    article_url: str

class research_outputs(BaseModel):
    articles: list[article_info] = Field(description="It contains all the list of articles. Extract all the articles provided in input in this.")

class probable_root_causes_format(BaseModel):
    """Data model for probable root causes and CAPA(s)."""

    probable_root_causes: list[root_cause_and_capa_format] = Field(description="It contains list of probable root causes title along with its detailed analysis and corrective actions. Extract at least 5 probable root cause.")
    dominant_root_cause: root_cause_and_capa_format = Field(description="Out of every root cause, it has the most prominent root cause as per the substantial evidences and event description.")