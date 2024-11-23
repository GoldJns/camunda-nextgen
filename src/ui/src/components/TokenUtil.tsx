export const REFRESH_INTERVAL = 55 * 60 * 1000; // 55 minutes in milliseconds

export const refreshAccessToken  = async (): Promise<void> => {
    const accessTokenExpiry = parseInt(sessionStorage.getItem("accessTokenExpiry") || "0", 10);
    const refreshToken = sessionStorage.getItem("refreshToken");
    const TOKEN_REFRESH_MARGIN = 30; // seconds before expiry to refresh
    const now = Date.now() / 1000; // time in seconds
    console.log(" refreshAccessToken is called !!! ");
    // If access token is valid, return it
    if (now < accessTokenExpiry - TOKEN_REFRESH_MARGIN) {
        return;
    }
    console.log("access token is invalid !!! ");
    if (!refreshToken) {
        console.error("No refresh token available. Log in again !!! ");
        return;
    }

    try {
        const formData = new URLSearchParams();
        formData.append("grant_type", "refresh_token");
        formData.append("client_id", "frontend");
        formData.append("client_secret", "BgjLEDcwNjaeKGFOqXyGhuPg32XqFdGF");
        formData.append("refresh_token", refreshToken);

        const response = await fetch(
        "http://keycloak:18080/auth/realms/camunda-platform/protocol/openid-connect/token",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        }
        );

        if (response.ok) {
            const data = await response.json();
            // Update Session
            sessionStorage.setItem("accessToken", data.access_token);
            sessionStorage.setItem("accessTokenExpiry", String(Math.floor(Date.now() / 1000) + data.expires_in));// time in seconds

            sessionStorage.setItem("refreshToken", data.refresh_token);
            
            console.log("Access token refreshed successfully.");
            return data.access_token;
        } else {
        console.error("Failed to refresh token");
        return;
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        return;
    }
};

const resetRefreshTokenInterval = (): void => {
    console.log("resetRefreshTokenInterval is called.");
    const intervalId = sessionStorage.getItem("refreshTokenInterval");
    if (intervalId) {
        clearInterval(Number(intervalId));
    }
    const newIntervalId = setInterval(refreshAccessToken, REFRESH_INTERVAL);
    sessionStorage.setItem("refreshTokenInterval", String(newIntervalId));
};

// =========================== apiCall with token Validation ============================== //
export const apiCall = async (url: string, options: RequestInit): Promise<Response> => {
    await refreshAccessToken();
    resetRefreshTokenInterval();

    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
        console.log("No valid access token available.");
        throw new Error("No valid access token available.");
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
};

