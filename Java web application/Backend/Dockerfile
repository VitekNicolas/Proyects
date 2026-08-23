# --- Etapa 1: build ---
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw

RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# Descarga las dependencias primero (se cachea si el pom.xml no cambió)
RUN ./mvnw dependency:go-offline -B

COPY src src
RUN ./mvnw clean package -DskipTests -B

# --- Etapa 2: runtime, imagen liviana sin el JDK completo ---
FROM eclipse-temurin:25-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]