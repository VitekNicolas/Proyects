import { registerClient, loginClient } from "./fetch.js";

export class ClientService {
    async registerAndLogin(client) {
        const registered = await registerClient(
            client.name, client.lastName, client.userName,
            client.city, client.state, client.zipCode, client.password
        );

        if (!registered) {
            return { success: false, reason: "register" };
        }

        const loggedIn = await loginClient(client.userName, client.password);
        if (!loggedIn) {
            return { success: false, reason: "login" };
        }

        return { success: true };
    }
}