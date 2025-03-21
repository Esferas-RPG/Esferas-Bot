export default function ErrorHandler(error: any) {
	if ((error as AggregateError).errors) {
		const connectionRefused = (error as AggregateError).errors
			.filter((error) => error.code === 'ECONNREFUSED')
			.map((error) => error.code);

		if (connectionRefused) {
			return 'Erro na requisição, não foi possivel se comunicar com o backend';
		}
	}
}
