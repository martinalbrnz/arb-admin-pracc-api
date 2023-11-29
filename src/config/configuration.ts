export default () => ({
	port: parseInt(process.env.PORT) || 3000,
	database: process.env.DATABASE_URL,
	secret: process.env.SECRET
})
