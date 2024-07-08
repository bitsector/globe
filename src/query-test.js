import fetch from 'node-fetch';
import express from 'express';

class SPARQLQueryDispatcher {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    query(sparqlQuery) {
        const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };

        return fetch(fullUrl, { headers }).then(body => body.json());
    }
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `#Cats, with pictures
#title: Cats, with pictures
#defaultView:ImageGrid
SELECT ?item ?itemLabel ?pic WHERE {
  ?item wdt:P31 wd:Q146;
    wdt:P18 ?pic.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;

const app = express();
const port = 3000;

app.get('/sparql', async (req, res) => {
    const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
    const results = await queryDispatcher.query(sparqlQuery);
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/sparql`);
});