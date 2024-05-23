const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY
  }
});

const uploadFile = async (path, buffer, mimetype) => {
  const produto_imagem = await s3.upload({
    Bucket: process.env.BLACKBLAZE_BUCKET,
    Key: path,
    Body: buffer,
    ContentType: mimetype
  }).promise();

  return {
    url: produto_imagem.Location
  };
};

const deleteFile = async (path) => {

  await s3.deleteObject({
    Bucket: process.env.BLACKBLAZE_BUCKET,
    Key: path
  }).promise()
}

module.exports = {
  uploadFile,
  deleteFile
};

