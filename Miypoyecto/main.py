from fastapi import FastAPI, File, HTTPException, Depends, UploadFile
from PIL import Image  
import imagehash
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine


app = FastAPI()
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/episodes/", response_model=schemas.Episode)
def create_episode(episode: schemas.EpisodeCreate, db: Session = Depends(get_db)):
    return crud.create_episode(db=db, episode=episode)

@app.get("/episodes/{episode_id}", response_model=schemas.Episode)
def read_episode(episode_id: int, db: Session = Depends(get_db)):
    episode = crud.get_episode(db=db, episode_id=episode_id)
    if episode is None:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode 

@app.delete("/episodes/{episode_id}", response_model=schemas.Episode)
def delete_episode(episode_id: int, db: Session = Depends(get_db)):
    episode = crud.delete_episode(db, episode_id)
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode

@app.post("/fingerprints/", response_model=schemas.Fingerprint)
def create_fingerprint(fingerprint: schemas.FingerprintCreate, db: Session = Depends(get_db)):
    return crud.create_fingerprint(db=db, fingerprint=fingerprint)

@app.get("/episodes/{episode_id}/fingerprints", response_model=list[schemas.Fingerprint])
def get_fingerprints_for_episode(episode_id: int, db: Session = Depends(get_db)):
    episode = crud.get_episode(db, episode_id)
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode.episode_fingerprints

@app.post("/match-frame/")
async def match_frame(file: UploadFile = File(...)):
    try:
        # Abrimos imagen con Pillow
        image = Image.open(file.file).convert("RGB")
        frame_hash = str(imagehash.phash(image))

        db: Session = SessionLocal()
        fingerprint = db.query(models.Fingerprint).filter(models.Fingerprint.hash == frame_hash).first()

        if not fingerprint:
            return {"message": "No se encontró ningún episodio coincidente"}

        episode = db.query(models.Episode).filter(models.Episode.id == fingerprint.episode_id).first()

        return {
            "episode_number": episode.id,
            "title": getattr(episode, "title", None),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))