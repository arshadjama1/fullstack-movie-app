package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/arshadjama1/fullstack-movie-app/data"
	"github.com/arshadjama1/fullstack-movie-app/handlers"
	"github.com/arshadjama1/fullstack-movie-app/logger"
	"github.com/joho/godotenv"
)

func main() {
	// Initialize logger
	logInstance := initializeLogger()

	// Environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Couldn't find .env files.")
	}
	// Connect DB
	dbConnStr := os.Getenv("DATABASE_URL")
	if dbConnStr == "" {
		log.Fatalf("DATABASE_URL not found:")
	}
	db, err := sql.Open("postgres", dbConnStr)
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	// Initialize Data Repository for Movies
	movieRepo, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		log.Fatalf("Failed to initialize movierepository")
	}

	if err != nil {
		log.Fatalf("Failed to initialize movie repository: %v", err)
	}
	defer db.Close()

	const address = ":8080"
	logInstance.Info("Server starting on " + address)

	// Initialize handlers
	movieHandler := handlers.NewMovieHandler(movieRepo, logInstance)
	// authHandler := handlers.NewAuthHandler(userStorage, jwt, logInstance)

	// Set up routes
	http.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)
	http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/search", movieHandler.SearchMovies)
	http.HandleFunc("/api/movies/", movieHandler.GetMovie)
	http.HandleFunc("/api/genres", movieHandler.GetGenres)
	http.HandleFunc("/api/account/register", movieHandler.GetGenres)
	http.HandleFunc("/api/account/authenticate", movieHandler.GetGenres)

	// Serve static files
	http.Handle("/", http.FileServer(http.Dir("public")))

	// Start server
	serverErr := http.ListenAndServe(address, nil)
	if serverErr != nil {
		logInstance.Error("Server failed to start", err)
		log.Fatalf("Server failed: %v", err)
	}
}

func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie-service.log")
	if err != nil {
		log.Fatalf("Failed to initialize logger: %v", err)
	}
	return logInstance
}
