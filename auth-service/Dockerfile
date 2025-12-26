FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8076
ENTRYPOINT ["java", "-Xmx256m", "-jar", "app.jar"]