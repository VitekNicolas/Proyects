import cv2
import imagehash
from PIL import Image
import hashlib

from sqlalchemy.orm import Session
from database import SessionLocal
import crud, schemas, models

VIDEO_PATH = "1x02.mkv"       # ← Cambiá esto si el video está en otro lugar o tiene otro nombre
EPISODE_ID = 2                # ← ID del episodio ya creado en la base
FRAME_INTERVAL = 30           # ← Procesa 1 frame cada 30 (≈ 1 por segundo si son 30 fps)

def calcular_hash(frame):
    image = Image.fromarray(frame)
    return str(imagehash.phash(image))

def calcular_resumen(hashes: list[str]) -> str:
    joined = ''.join(hashes).encode('utf-8')
    return hashlib.sha256(joined).hexdigest()

def procesar_video(video_path, episode_id):
    cap = cv2.VideoCapture(video_path)
    db: Session = SessionLocal()

    if not cap.isOpened():
        print(f"❌ No se pudo abrir el archivo: {video_path}")
        return

    frame_count = 0
    hash_count = 0
    all_hashes = []

    print(f"▶️ Procesando video: {video_path}...")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % FRAME_INTERVAL == 0:
            try:
                hash_str = calcular_hash(frame)
                all_hashes.append(hash_str)

                fingerprint = schemas.FingerprintCreate(
                    episode_id=episode_id,
                    frame_num=frame_count,
                    hash=hash_str
                )
                crud.create_fingerprint(db, fingerprint)
                hash_count += 1
            except Exception as e:
                print(f"⚠️ Error al procesar frame {frame_count}: {e}")

        frame_count += 1

    cap.release()

    # Calcular fingerprint_summary y guardar en el episodio
    resumen = calcular_resumen(all_hashes)
    episode = db.query(models.Episode).filter(models.Episode.id == episode_id).first()
    if episode:
        episode.fingerprint_summary = resumen
        db.commit()
        print(f"🧠 Resumen calculado y guardado en episodio {episode_id}:\n{resumen}")

    db.close()
    print(f"✅ Se procesaron {hash_count} huellas para el episodio {episode_id}")

if __name__ == "__main__":
    procesar_video(VIDEO_PATH, EPISODE_ID)
