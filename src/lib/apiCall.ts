const BASE_URL = "https://clinicbooking.gproject.space/api";

export const apiCall = async (endpoint: string, method = "GET", body = null, isFormData = false) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
    
    const headers: Record<string, string> = {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    };

    const isPublicEndpoint = 
        endpoint.includes("/login") || 
        endpoint.includes("/register") || 
        endpoint.includes("/specialities");

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (!isFormData && body) {
        headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
        method,
        headers,
        mode: 'cors', 
    };

    if (body) {
        options.body = isFormData ? body : JSON.stringify(body);
    }

    try {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        const fullUrl = `${BASE_URL}/${cleanEndpoint}`;

        const response = await fetch(fullUrl, options);

        if (response.status === 401 && !isPublicEndpoint) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("userToken");
            }
            console.error("Auth Error: Token is missing or expired");
            throw new Error("Unauthenticated.");
        }

        const text = await response.text();
        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {
            data = { message: text };
        }

        if (!response.ok) {
            throw new Error(data.message || data.error || `Error: ${response.status}`);
        }

        return data;
    } catch (error: any) {
        console.error("API Error Trace:", error.message);
        throw error;
    }
};

export const login = async (email: any, password: any) => {
    const response = await apiCall("/login", "POST", { email, password });
    
    const token = response?.data?.access_token || response?.access_token || response?.token;
    
    if (token && typeof window !== "undefined") {
        localStorage.setItem("userToken", token);
    }
    return response;
};

export const registerUser = (userData: any) => apiCall("/register", "POST", userData);
export const getSpecialities = () => apiCall("/specialities", "GET");