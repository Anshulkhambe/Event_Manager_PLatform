# ---------- Build Stage ----------
    FROM eclipse-temurin:17-jdk AS builder

    WORKDIR /app
    
    # Copy Maven Wrapper and necessary files
    COPY mvnw .
    COPY .mvn .mvn
    COPY pom.xml .
    
    # Prepare dependencies
    RUN chmod +x mvnw
    RUN ./mvnw dependency:go-offline
    
    # Copy source code and build
    COPY src ./src
    RUN ./mvnw clean package -DskipTests
    
    # ---------- Runtime Stage ----------
    FROM eclipse-temurin:17-jre
    
    WORKDIR /app
    
    # Use correct artifact JAR file name
    COPY --from=builder /app/target/Event_Manager_backend-0.0.1-SNAPSHOT.jar app.jar
    
    EXPOSE 8080
    ENV PORT=8080
    
    CMD ["java", "-jar", "app.jar"]
    