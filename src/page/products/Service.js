import { axiosGET, axiosPOST } from "../../service/ApiService";

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
}