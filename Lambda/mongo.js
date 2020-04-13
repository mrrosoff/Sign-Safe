const { MongoClient } = require('mongodb');

const getData = async () => {

	// const uri = "mongodb+srv://mrosoff:zlysuHOUVJoUF8r5@sign-safe-zol3w.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

	try
	{
		// await client.connect();
		//return await client
		//.db('sample_airbnb')
		//.collection('listingsAndReviews')
		// .findOne({name: 'Apt Linda Vista Lagoa - Rio'});
		return "Test";
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
		console.log(event, context);
		const data = await getData();
		return (
			{
				statusCode: 200,
				body: JSON.stringify({ id: data._id })
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