from pydantic import BaseModel

class EpisodeBase(BaseModel):
    title: str
    plot_summary: str
    trivia: str
    fingerprint_summary: str

class EpisodeCreate(EpisodeBase):
    pass

class Episode(EpisodeBase):
    id: int

    class Config:
        orm_mode = True

class FingerprintBase(BaseModel):
    frame_num: int
    hash: str

class FingerprintCreate(FingerprintBase):
    pass

class Fingerprint(FingerprintBase):
    id: int
    episode_id: int

    class Config:
        orm_mode = True