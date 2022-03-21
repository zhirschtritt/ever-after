export interface Configuration {
    cloudinary: {
        cloud_name: string;
        api_key: string;
        api_secret: string;
    };
}
declare const _default: () => Configuration;
export default _default;
