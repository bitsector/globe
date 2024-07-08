import fetch from 'node-fetch';

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

const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
queryDispatcher.query(sparqlQuery).then(results => {
    console.log(JSON.stringify(results, null, 2));
}).catch(error => {
    console.error('Error executing query:', error);
});