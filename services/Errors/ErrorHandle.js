export default function ErrorHandler(error) {
    if (error.errors) {
        const connectionRefused = error.errors
            .filter((error) => error.code === 'ECONNREFUSED')
            .map((error) => error.code);
        if (connectionRefused) {
            return 'Erro na requisição, não foi possivel se comunicar com o backend';
        }
    }
}
