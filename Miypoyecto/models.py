from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Episode(Base):
    __tablename__ = "EpisodeList"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    plot_summary = Column(String)
    trivia= Column(String)
    fingerprint_summary = Column(String)
    episode_fingerprints = relationship("Fingerprint", back_populates="episode")

class Fingerprint(Base):
    __tablename__ = "EpisodesFingerprints"

    id = Column(Integer, primary_key=True, index=True)
    episode_id = Column(Integer, ForeignKey("EpisodeList.id"))
    frame_num = Column(Integer)
    hash = Column(String)
    episode = relationship("Episode", back_populates="episode_fingerprints")