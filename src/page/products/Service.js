import { axiosGET, axiosPOST, axiosPUT } from "../../service/ApiService";

export class ProductService {
    static async getProducts() {
        try {
            const res = await axiosGET('v1/products');
            return res.data;
        } catch (err) {
            return []
        }
    }
    static async createNewProduct({ payload }) {
        try {
            if (payload) {
                const res = await axiosPOST(`v1/products`, payload);
                return res.data;
            }
            return [];
        } catch (err) {
            return []
        }
    }
    static async updateProduct({ payload, productId }) {
        try {
            if (payload) {
                const res = await axiosPUT(`v1/products/${productId}`, payload);
                return res.data;
            }
            return [];
        } catch (err) {
            return []
        }
    }
}