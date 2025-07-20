from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException   

def create_episode(db: Session, episode: schemas.EpisodeCreate):
    db_episode = models.Episode(**episode.dict())
    db.add(db_episode)
    db.commit()
    db.refresh(db_episode)
    return db_episode

def get_episode(db: Session, episode_id: int):
    return db.query(models.Episode).filter(models.Episode.id == episode_id).first()

def delete_episode(db: Session, episode_id: int):
    episode = db.query(models.Episode).filter(models.Episode.id == episode_id).first()
    if episode:
        db.delete(episode)
        db.commit()
        return episode
    return None

def create_fingerprint(db: Session, fingerprint: schemas.FingerprintCreate):
    db_fingerprint = models.Fingerprint(
        episode_id=fingerprint.episode_id,
        frame_num=fingerprint.frame_num,
        hash=fingerprint.hash
    )
    db.add(db_fingerprint)
    db.commit()
    db.refresh(db_fingerprint)
    return db_fingerprint

def get_fingerprint(db: Session, fingerprint_id: int):
    return db.query(models.Fingerprint).filter(models.Fingerprint.id == fingerprint_id).first()

def get_fingerprints_by_episode(db: Session, episode_id: int):
    return db.query(models.Fingerprint).filter(models.Fingerprint.episode_id == episode_id).all()