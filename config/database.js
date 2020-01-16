if(process.env.NODE_ENV === "production")
{
    module.exports = {mongoURI: "mongodb+srv://Alec:<Alec>@vidjot-jn7qd.gcp.mongodb.net/test?retryWrites=true&w=majority"}
}
else
{
module.exports = {mongoURI:"mongodb://localhost/vidjot-dev"}
}