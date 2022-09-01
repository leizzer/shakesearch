package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"index/suffixarray"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	content, err := ioutil.ReadFile("small_json.json")
	if err != nil {
		log.Fatal("Error reading JSON: ", err)
	}

	////////////////////////
	var completeWorks Works
	err = json.Unmarshal(content, &completeWorks)
	if err != nil {
		log.Fatal("Error during Unmarshal: ", err)
	}
	////////////////////////

	searcher := Searcher{}
	err = searcher.LoadFile("completeworks.txt")
	if err != nil {
		log.Fatal(err)
	}

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	http.HandleFunc("/search", handleSearch(searcher, completeWorks))

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	fmt.Printf("Listening on port %s...", port)
	err = http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

type Searcher struct {
	CompleteWorks string
	SuffixArray   *suffixarray.Index
}

type Result struct {
	Work     string
	Snippets []string
}

type Results struct {
	Data []Result
}

func handleSearch(searcher Searcher, entireWork Works) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		query, ok := r.URL.Query()["q"]
		if !ok || len(query[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("missing search query in URL params"))
			return
		}

		results := new(Results)

		for _, work := range entireWork.Data {
			//TODO: maybe preload the search struct
			searcher.Load(work.Contents)

			searchResult := searcher.Search(query[0])

			results.Data = append(results.Data, Result{work.Name, searchResult})
		}

		buf := &bytes.Buffer{}
		enc := json.NewEncoder(buf)
		err := enc.Encode(results)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("encoding failure"))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(buf.Bytes())
	}
}

func (s *Searcher) Load(data string) error {
	s.CompleteWorks = data
	s.SuffixArray = suffixarray.New([]byte(data))
	return nil
}

func (s *Searcher) LoadFile(filename string) error {
	dat, err := ioutil.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("LoadFile: %w", err)
	}
	s.CompleteWorks = string(dat)
	s.SuffixArray = suffixarray.New(dat)
	return nil
}

func (s *Searcher) Search(query string) []string {
	idxs := s.SuffixArray.Lookup([]byte(query), -1)
	size := len(s.CompleteWorks)

	results := []string{}

	for _, idx := range idxs {
		left := idx - 250
		right := idx + 250

		if left <= 0 {
			left = 0
		}

		if right >= size {
			right = size - 1
		}

		results = append(results, s.CompleteWorks[left:right])
	}

	return results
}

type Work struct {
	Name     string
	Contents string
}

type Works struct {
	Data []Work
}
