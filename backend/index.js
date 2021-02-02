
const {
    EnapsoGraphDBClient } = require("@innotrade/enapso-graphdb-client");
// connection data to the run GraphDB instance
const GRAPHDB_BASE_URL = "http://localhost:7200",
    GRAPHDB_REPOSITORY = "Node1",
    GRAPHDB_USERNAME = "Node",
    GRAPHDB_PASSWORD = "Node",
    GRAPHDB_CONTEXT_TEST = "http://ont.enapso.com/repo";
const DEFAULT_PREFIXES = [
    EnapsoGraphDBClient.PREFIX_OWL,
    EnapsoGraphDBClient.PREFIX_RDF,
    EnapsoGraphDBClient.PREFIX_RDFS,
    EnapsoGraphDBClient.PREFIX_XSD,
    EnapsoGraphDBClient.PREFIX_PROTONS,
    {
        prefix: "Testing",
        iri: "http://ont.enapso.com/Node1#",
    }
];

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: GRAPHDB_BASE_URL,
    repository: GRAPHDB_REPOSITORY,
    prefixes: DEFAULT_PREFIXES
});
graphDBEndpoint.login(GRAPHDB_USERNAME,GRAPHDB_PASSWORD)
.then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
//insert a class
graphDBEndpoint
  .update(
    `insert data {
      graph <${GRAPHDB_CONTEXT_TEST}> {
      Testing:Hello rdf:type owl:Class}
  }`
         )
  .then((result) => {
    console.log("inserted a class :\n" + JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.log(err);
  });

// read one class
graphDBEndpoint
    .query(
        `select *from <${GRAPHDB_CONTEXT_TEST}>
where {
  ?class rdf:type owl:Class
  filter(regex(str(?class), "PerspectivesInTrondheim", "i")) .
}`,
{ transform: "toJSON" }
  )
    .then((result) => {
        console.log("Read a class:\n" + JSON.stringify(result, null, 2));
    })
    .catch((err) => {
        console.log(err);
    });

// read all classes
graphDBEndpoint
.query(
    `select ?class from <${GRAPHDB_CONTEXT_TEST}>
where {
?class a owl:Class .
}`,
{ transform: "toJSON" }
)
.then((result) => {
    console.log("Read all class in graph :\n" + JSON.stringify(result, null, 2));
})
.catch((err) => {
    console.log(err);
});
