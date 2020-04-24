const { MongoClient } = require('mongodb');

const updateIPFSHash = async (data) => {

	const uri = "mongodb+srv://mrosoff:zlysuHOUVJoUF8r5@sign-safe-zol3w.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

	try
	{
		await client.connect();
		return await client.db('URL-Data').collection('URL-Status')
		.updateOne({ url: data.url, "signers.ethAccount": data.ethAccount }, { $set: { "signers.$.signed": data.signed } });
	}

catch (err)
	{
		console.log(err);
	}

	finally
	{
		await client.close();
	}
};

exports.handler = async function(event, context) {

	try
	{
		const data = await updateIPFSHash(JSON.parse(event.body));
		return (
			{
				statusCode: 200,
				body: JSON.stringify(data)
			}
		);
	}

	catch (err)
	{
		console.log(err);
		return (
			{
				statusCode: 500,
				body: JSON.stringify({ msg: err.message })
			}
		);
	}
};
