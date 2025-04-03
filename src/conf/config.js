const config = {
    baseUrl:String(import.meta.env.VITE_BASE_FRONTEND_URL),
    vapidPublicKey:String(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    apiURL:String(import.meta.env.VITE_API_BACKEND_URL),
    uploadFileUrl:`${String(import.meta.env.VITE_API_BACKEND_URL)}/api/v1/post/uploadFile`,
    deleteFileUrl:`${String(import.meta.env.VITE_API_BACKEND_URL)}/api/v1/post/deleteFile`,
    nodeEnvironment:String(import.meta.env.NODE_ENV),
};
export default config;
