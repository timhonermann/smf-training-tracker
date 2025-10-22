#FROM eclipse-temurin:24-jre
#MAINTAINER baeldung.com
#EXPOSE 8080
#COPY build/libs/*.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]

# --- builder stage ---
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /workspace

# context will be apps/smf-training-tracker-svc
COPY gradlew gradle/ ./
COPY settings.gradle build.gradle ./
COPY src ./src

RUN ./gradlew --no-daemon bootJar -x test

# --- runtime stage ---
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /workspace/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
