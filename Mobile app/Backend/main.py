from fastapi import Body, FastAPI, File, HTTPException, Depends, Path, UploadFile
from PIL import Image  
import imagehash
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mobile app API",
    description="This API can process and analyze mobile app data.",
    version="1.0.0"
)
models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción deberías poner solo la IP o dominio exacto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.post("/match-frame/", tags=["frame matching"], response_model=dict)
async def match_frame(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")
        frame_hash = imagehash.phash(image)

        db: Session = SessionLocal()

        # Obtener todos los fingerprints de la DB
        fingerprints = db.query(models.Fingerprint).all()

        if not fingerprints:
            raise HTTPException(status_code=404, detail="No fingerprints in database")

        # Buscar la coincidencia más cercana
        closest = min(
            fingerprints,
            key=lambda f: frame_hash - imagehash.hex_to_hash(f.hash)
        )

        distance = frame_hash - imagehash.hex_to_hash(closest.hash)

        # Definí una tolerancia (ajustá si hace falta)
        if distance <= 20:
            episode = db.query(models.Episode).filter(models.Episode.id == closest.episode_id).first()
            return {
                "episode_number": episode.id,
                "title": getattr(episode, "title", None),
                "match_distance": distance
            }
        else:
            return {"message": "No se encontró ningún episodio coincidente", "match_distance": distance}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post(
    "/episode_trivia/",
    tags=["trivia"],
    response_model=schemas.Trivia,
    summary="Create a trivia for an episode",
    description="Add a new trivia item for a specific episode."
)
def create_trivia(
    trivia: schemas.TriviaCreate = Body(
        ..., 
        title="Trivia Entry", 
        description="Trivia content and the episode it belongs to"
    ),
    db: Session = Depends(get_db)
):
    return crud.create_episode_trivia(db, trivia)

@app.get("/episodes/{episode_id}/trivia", tags=["trivia"], response_model=list[schemas.Trivia])
def read_trivia_for_episode(episode_id: int, db: Session = Depends(get_db)):
    trivia = crud.get_trivia_by_episode(db, episode_id=episode_id)
    return trivia