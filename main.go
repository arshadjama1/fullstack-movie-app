package main

import (
	"fmt"
	"net/http"
)

func main() {
	const address = ":8080"

	// Serve static files
	http.Handle("/", http.FileServer(http.Dir("public")))

	// Start server
	serverErr := http.ListenAndServe(address, nil)
	if serverErr != nil {
		fmt.Printf("Server failed to start %v", serverErr)
	}
}
