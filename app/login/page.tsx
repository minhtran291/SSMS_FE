import { redirect } from "next/navigation";
import { keycloak } from "@/lib/keycloak";

export default function LoginPage() {
    const url = new URL(keycloak.authorizeUrl);

    url.searchParams.set("client_id", keycloak.clientId);
    url.searchParams.set("redirect_uri", keycloak.redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "openid profile email");
    url.searchParams.set("state", "/dashboard");

    redirect(url.toString());
}