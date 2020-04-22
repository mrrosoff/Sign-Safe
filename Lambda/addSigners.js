const { MongoClient } = require('mongodb');

const addSigners = async (data) => {

	const uri = "mongodb+srv://mrosoff:zlysuHOUVJoUF8r5@sign-safe-zol3w.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

	let newSigners = [];
	data.signers.forEach(item =>
	{
		newSigners.push({address: item.ethAddr, status: 0})
	});

	try
	{
		await client.connect();
		await client.db('URL-Data').collection('URL-Status')
		.findOneAndUpdate({ url: data.url }, { $push: { urlStatus: { $each: newSigners }}});
		return await client.db('URL-Data').collection('URL-Status')
		.findOneAndUpdate({ url: data.url }, { $push: { signers: { $each: data.signers }}});
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
		const data = await addSigners(JSON.parse(event.body));
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
