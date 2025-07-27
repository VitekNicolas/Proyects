from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Episode(Base):
    __tablename__ = "EpisodeList"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer)
    title = Column(String, index=True)
    plot_summary = Column(String)
    fingerprint_summary = Column(String)
    episode_fingerprints = relationship("Fingerprint", back_populates="episode")
    episode_trivia = relationship("Trivia", back_populates="episode", cascade="all, delete")

class Fingerprint(Base):
    __tablename__ = "EpisodeFingerprint"

    id = Column(Integer, primary_key=True, index=True)
    episode_id = Column(Integer, ForeignKey("EpisodeList.id"))
    frame_number = Column(Integer)
    hash = Column(String)
    episode = relationship("Episode", back_populates="episode_fingerprints")

class Trivia(Base):
    __tablename__ = "EpisodeTrivia"

    id = Column(Integer, primary_key=True, index=True)
    episode_id = Column(Integer, ForeignKey("EpisodeList.id"), nullable=False)
    content = Column(String, nullable=False)
    episode = relationship("Episode", back_populates="episode_trivia")