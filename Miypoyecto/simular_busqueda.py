import cv2
import imagehash
from PIL import Image
from sqlalchemy.orm import Session
from database import SessionLocal
import models
from collections import defaultdict

VIDEO_TEST = "fragmento2.mp4"
FRAME_INTERVAL = 30

def calcular_hash(frame):
    image = Image.fromarray(frame)
    return str(imagehash.phash(image))

def buscar_episodio(video_path):
    cap = cv2.VideoCapture(video_path)
    db: Session = SessionLocal()

    if not cap.isOpened():
        print("❌ No se pudo abrir el archivo:", video_path)
        return

    coincidencias = defaultdict(int)
    frame_count = 0

    print(f"🔍 Analizando fragmento: {video_path}")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % FRAME_INTERVAL == 0:
            try:
                hash_str = calcular_hash(frame)
                # Buscar huellas en la base
                fingerprints = db.query(models.Fingerprint).filter(models.Fingerprint.hash == hash_str).all()
                for fp in fingerprints:
                    coincidencias[fp.episode_id] += 1
            except Exception as e:
                print(f"⚠️ Error al procesar frame {frame_count}: {e}")
        
        frame_count += 1

    cap.release()

    if coincidencias:
        episodio_id = max(coincidencias, key=coincidencias.get)
        coincidencias_totales = coincidencias[episodio_id]

        episodio = db.query(models.Episode).filter(models.Episode.id == episodio_id).first()

        if episodio:
            print(f"\n✅ Episodio más probable:")
            print(f"ID: {episodio.id}")
            print(f"Número: {episodio.id}")
            print(f"Título: {episodio.title if hasattr(episodio, 'title') else '(sin título)'}")
        else:
            print("⚠️ No se encontró información del episodio en la base")
    else:
        print("❌ No se encontró ninguna coincidencia")

    db.close()

if __name__ == "__main__":
    buscar_episodio(VIDEO_TEST)
