import { createClient } from "microcms-js-sdk";

export const client  = createClient({
    serviceDomain: "sasa-blog",
    apiKey: process.env.API_KEY,
});

 