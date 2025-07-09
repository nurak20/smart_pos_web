import { axiosGET, axiosPOST } from "../../service/ApiService";


export class CategoryService {
    static async getCategories() {
        try {
            const res = await axiosGET('v1/categories');
            return res.data;
        } catch (err) {
            return [];
        }
    }
    static async createNewCategory({ payload }) {
        try {
            if (payload) {
                const res = await axiosPOST(`v1/categories`, payload);
                return res.data;
            }
            return [];
        } catch (err) {
            return [];
        }
    }
    static async updateCategory({ payload, id }) {
        try {
            if (payload) {
                const res = await axiosPOST(`v1/categories/${id}`, payload);
                return res.data;
            }
            return [];
        } catch (err) {
            return [];
        }
    }
    static async deleteCategory({ id }) {
        try {
            if (id) {
                const res = await axiosDELETE(`v1/categories/${id}`);
                return res.data;
            }
            return [];
        } catch (err) {
            return [];
        }
    }
}