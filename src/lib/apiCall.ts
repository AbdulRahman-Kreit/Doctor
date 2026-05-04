const BASE_URL = "https://clinicbooking.gproject.space/api";

export const apiCall = async (endpoint: string, method = "GET", body = null, isFormData = false) => {
    // جلب التوكن من التخزين المحلي للمتصفح
    const token = localStorage.getItem("userToken");
    
    const headers: Record<string, string> = {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    };

    /**
     * تعديل: إضافة مسار التخصصات للقائمة التي لا تتطلب توكن
     * هذا يسمح بجلب البيانات دون أن يكون المستخدم مسجلاً للدخول
     */
    const isPublicEndpoint = 
        endpoint.endsWith("/login") || 
        endpoint.endsWith("/register") || 
        endpoint.endsWith("/specialities");

    // إضافة التوكن للرأس فقط إذا كان المسار ليس عاماً (Public)
    if (token && !isPublicEndpoint) {
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
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        /**
         * تعديل: منع إطلاق خطأ المصادقة إذا كان المسار عاماً
         * حتى لو أرجع الخادم 401، لن نقوم بمسح التوكن أو رمي خطأ للمسارات العامة
         */
        if (response.status === 401 && !isPublicEndpoint) {
            localStorage.removeItem("userToken"); 
            throw new Error("Authentication failed: Invalid credentials or expired session.");
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || `Error: ${response.status}`);
        }

        return data;
    } catch (error: any) {
        console.error("API Error Trace:", error.message);
        throw error;
    }
};

export const login = (email, password) => apiCall("/login", "POST", { email, password });

export const registerUser = (userData) => apiCall("/register", "POST", userData);

export const getSpecialities = () => apiCall("/specialities", "GET");