from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Korea Horse Racing API", version="1.0")

class Horse(BaseModel):
    id: int
    name: str
    jockey: str
    weight: str
    recent_performance: str # e.g. "1-2-1"
    trainer: str
    win_rate: float
    dividend: float

class Race(BaseModel):
    id: int
    number: int
    time: str
    distance: str
    horses: List[Horse]

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "API is running"}

@app.get("/api/races", response_model=List[Race])
def get_races():
    # Mock data for demonstration
    return [
        Race(
            id=1,
            number=1,
            time="10:30",
            distance="1000m",
            horses=[
                Horse(id=1, name="스피드마스터", jockey="문세영", weight="490", recent_performance="1-1-2", trainer="김영관", win_rate=45.5, dividend=1.8),
                Horse(id=2, name="바람의검심", jockey="이찬호", weight="505", recent_performance="3-2-1", trainer="박대흥", win_rate=20.0, dividend=4.5),
                Horse(id=3, name="천마총", jockey="임기원", weight="510", recent_performance="2-5-4", trainer="송문길", win_rate=15.0, dividend=8.0),
                Horse(id=4, name="불꽃축제", jockey="유승완", weight="495", recent_performance="4-4-3", trainer="지용철", win_rate=10.0, dividend=12.5),
                Horse(id=5, name="번개돌이", jockey="페로비치", weight="485", recent_performance="7-6-8", trainer="서범석", win_rate=9.5, dividend=25.0)
            ]
        ),
        Race(
            id=2,
            number=2,
            time="11:00",
            distance="1200m",
            horses=[
                Horse(id=1, name="무패신화", jockey="김용근", weight="500", recent_performance="2-1-1", trainer="안해양", win_rate=38.0, dividend=2.1),
                Horse(id=2, name="강철심장", jockey="송재철", weight="520", recent_performance="1-3-2", trainer="배대선", win_rate=35.0, dividend=2.5),
                Horse(id=3, name="바다의왕자", jockey="최범현", weight="490", recent_performance="5-4-3", trainer="김호", win_rate=15.0, dividend=7.0),
                Horse(id=4, name="은빛날개", jockey="안토니오", weight="505", recent_performance="3-6-5", trainer="이관호", win_rate=7.0, dividend=15.0),
                Horse(id=5, name="황금마차", jockey="장추열", weight="515", recent_performance="8-7-9", trainer="신삼영", win_rate=5.0, dividend=30.0)
            ]
        )
    ]
