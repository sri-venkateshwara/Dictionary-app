document.addEventListener("DOMContentLoaded", () => {
    const wordInput = document.getElementById("wordInput");
    const searchButton = document.getElementById("searchButton");
    const resultDiv = document.getElementById("result");
    const audioElement = document.getElementById("audio");

    searchButton.addEventListener("click", () => {
        const word = wordInput.value.trim();
        if (word !== "") {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                        const meanings = data[0].meanings;


                        const definitionsList = meanings.map((meaning) => {
                            const partOfSpeech = meaning.partOfSpeech;
                            const englishDefinitions = meaning.definitions.map((definition) => {
                                return `<li><strong>${partOfSpeech}:</strong> ${definition.definition}</li>`;
                            }).join('');

                            return englishDefinitions;
                        }).join('');

                        resultDiv.innerHTML = `<p><strong>${word}:</strong></p><ul>${definitionsList}</ul>`;


                        audioElement.src = data[0].phonetics[0].audio;
                        audioElement.style.display = "block";
                    } else {
                        resultDiv.innerHTML = "<p>No definition found for this word.</p>";
                        audioElement.style.display = "none";
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    resultDiv.innerHTML = "<p>An error occurred while fetching data.</p>";
                    audioElement.style.display = "none";
                });
        } else {
            resultDiv.innerHTML = "<p>Please enter a word.</p>";
            audioElement.style.display = "none";
        }
    });
});
