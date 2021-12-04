const random = require('random-words')(1);
const fs = require('fs');
const request = require('request');
const gis = require('g-i-s');
const jimp = require('jimp');
module.exports = {
	async something() {
		await gis(random + 'wallpaper', logResults);
	},
};
async function logResults(error, results) {
	if (error) {
		console.log(error);
	}
	else {
		const uri = await results[Math.floor(Math.random() * results.length)];
		request.head(uri, function(err, res) {
			console.log('content-type:', res.headers['content-type']);
			console.log('content-length:', res.headers['content-length']);

			setTimeout(() => {
				request(uri).pipe(fs.createWriteStream('nft.png'));
			}, 5000);

			jimp.read('nft.png', (err, nft) => {
				if(err) return console.log(err);
				nft
					.pixelate(Math.floor(Math.random() * (100 - 10 + 1) + 10))
					.write('nft2.png');
			});
		});
	}
}