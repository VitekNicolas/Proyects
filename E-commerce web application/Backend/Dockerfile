# Etapa 1: build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copiamos los .csproj primero (para cachear el restore si el código cambia pero no las dependencias)
COPY Domain/Domain.csproj Domain/
COPY Application/Application.csproj Application/
COPY Infraesctructure/Infraesctructure.csproj Infraesctructure/
COPY TP1-REST-Vitek_Nicolas/TP1-REST-Vitek_Nicolas.csproj TP1-REST-Vitek_Nicolas/
RUN dotnet restore TP1-REST-Vitek_Nicolas/TP1-REST-Vitek_Nicolas.csproj

# Ahora copiamos todo el código y compilamos
COPY Domain/ Domain/
COPY Application/ Application/
COPY Infraesctructure/ Infraesctructure/
COPY TP1-REST-Vitek_Nicolas/ TP1-REST-Vitek_Nicolas/
RUN dotnet publish TP1-REST-Vitek_Nicolas/TP1-REST-Vitek_Nicolas.csproj -c Release -o /app/publish

# Etapa 2: runtime (imagen final, mucho más liviana)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Carpeta donde va a vivir la base SQLite (la montamos como volumen después)
RUN mkdir -p /app/data

EXPOSE 8080
ENTRYPOINT ["dotnet", "TP1-REST-Vitek_Nicolas.dll"]