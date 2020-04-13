import React from "react";

const { MongoClient } = require('mongodb');

const main = async () => {

	const uri = "mongodb+srv://mrosoff:zlysuHOUVJoUF8r5@sign-safe-zol3w.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri);
	try
	{
		await client.connect();
		await listDatabases(client);

	}

	catch(e)
	{
		console.error(e);
	}

	finally
	{
		await client.close();
	}
};

const listDatabases = async (client) =>
{
	let databasesList = await client.db().admin().listDatabases();
	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

export default main;
