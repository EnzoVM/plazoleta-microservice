

export default interface OrderServiceRepository {

    sendMessage: (body: string, to: string) => Promise<string>
}