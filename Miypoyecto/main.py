from fastapi import Body, FastAPI, File, HTTPException, Depends, Path, UploadFile
from PIL import Image  
import imagehash
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine


app = FastAPI(
    title="Mobile app API",
    description="This API can process and analyze mobile app data.",
    version="1.0.0"
)
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post(
    "/episodes/",
    tags=["episodes"],
    summary="Create Episode",
    description="Create a new episode with the provided details."
)
def create_episode(
    episode: schemas.EpisodeCreate = Body(
        ..., 
        title="Episode Payload", 
        description="Episode object that needs to be added to the database"
    ),
    db: Session = Depends(get_db)
):
    return crud.create_episode(db, episode)

@app.get(
    "/episodes/{episode_id}",
    tags=["episodes"],
    response_model=schemas.Episode,
    summary="Read Episode",
    description="Retrieve detailed information about an episode using its unique ID."
)
def read_episode(
    episode_id: int = Path(..., title="Episode ID", description="The unique identifier of the episode."),
    db: Session = Depends(get_db)
):
    episode = crud.get_episode(db=db, episode_id=episode_id)
    if episode is None:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode

@app.delete(
    "/episodes/{episode_id}", 
    tags=["episodes"], 
    response_model=schemas.Episode,
    summary="Delete Episode",
    description="Delete an episode by its unique ID."
)
def delete_episode(episode_id: int, db: Session = Depends(get_db)):
    episode = crud.delete_episode(db, episode_id)
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode

@app.post(
    "/fingerprints/", 
    tags=["fingerprints"], 
    response_model=schemas.Fingerprint,
    summary="Create Fingerprint",
    description="Create a new fingerprint for an episode."
)
def create_fingerprint(fingerprint: schemas.FingerprintCreate, db: Session = Depends(get_db)):
    return crud.create_fingerprint(db=db, fingerprint=fingerprint)

@app.get(
    "/episodes/{episode_id}/fingerprints", 
    tags=["fingerprints"], 
    response_model=list[schemas.Fingerprint],
    summary="Get Fingerprints for Episode",
    description="Retrieve all fingerprints associated with a specific episode."
)
def get_fingerprints_for_episode(episode_id: int, db: Session = Depends(get_db)):
    episode = crud.get_episode(db, episode_id)
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode.episode_fingerprints

@app.post("/match-frame/", tags=["frame matching"], response_model=dict)
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