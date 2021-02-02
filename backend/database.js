// const { EnapsoGraphDBClient } = require("@innotrade/enapso-graphdb-client");
import { EnapsoGraphDBClient } from '@innotrade/enapso-graphdb-client';


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

const graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: GRAPHDB_BASE_URL,
    repository: GRAPHDB_REPOSITORY,
    prefixes: DEFAULT_PREFIXES
});

export const login = () => {
    graphDBEndpoint.login(GRAPHDB_USERNAME,GRAPHDB_PASSWORD)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
}

export const readClass = async (className) => {
    const query = `
        select *
        where {
            ?class rdf:type owl:Class
            filter(regex(str(?class), "${className}", "i")) .
        }`;

    return await graphDBEndpoint.query(query, { transform: "toJSON" });
}

export const readAllClasses = async () => {
    const query = `
        select ?class
        where {
            ?class a owl:Class .
        }`;

    return await graphDBEndpoint.query(query, { transform: "toJSON" });
}

export const insertClass = () => {
    const query = `
        insert data {
            graph <${GRAPHDB_CONTEXT_TEST}> {
                Testing:Hello rdf:type owl:Class
            }
        }`;

    graphDBEndpoint
        .update(query)
        .then((result) => {
            console.log("inserted a class :\n" + JSON.stringify(result, null, 2));
        })
        .catch((err) => {
            console.log(err);
        });
}