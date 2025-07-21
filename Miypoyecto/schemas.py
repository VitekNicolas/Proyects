from pydantic import BaseModel

class EpisodeBase(BaseModel):
    title: str
    plot_summary: str
    fingerprint_summary: str

class EpisodeCreate(EpisodeBase):
    pass

class Episode(EpisodeBase):
    id: int

model_config = {
    "from_attributes": True
}

class FingerprintBase(BaseModel):
    frame_number: int
    hash: str
    episode_id: int

class FingerprintCreate(FingerprintBase):
    pass

class Fingerprint(FingerprintBase):
    id: int

model_config = {
    "from_attributes": True
}

class TriviaBase(BaseModel):
    content: str

class TriviaCreate(TriviaBase):
    episode_id: int

class Trivia(TriviaBase):
    id: int
    episode_id: int

model_config = {
    "from_attributes": True
}