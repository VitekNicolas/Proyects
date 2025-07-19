from fastapi import FastAPI, HTTPException, Depends
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
    db_episode = crud.get_episode(db=db, episode_id=episode_id)
    if db_episode is None:
        raise HTTPException(status_code=404, detail="Episode not found")
    return db_episode           