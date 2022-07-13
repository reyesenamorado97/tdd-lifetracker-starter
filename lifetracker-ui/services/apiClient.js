import axios from 'axios';

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "lifetracker_token"
    }
    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }
    async request({endpoint, method = 'GET', data = {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({url, method, data, headers}) 
            return {data: res.data, error: null}
        } catch (error) {
            console.error({errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return {data: null, error: message || String(error)}
        }
    }
    
//-----------------------------------------------------------------------------

    async fetchUserFromToken() {
        return await this.request({endpoint: `auth/me`, method: `GET`})
    }
   
    async loginUser(credentials) {
        return await this.request({endpoint: `auth/login`, method: `POST`, data: credentials})
    }
    async signupUser(credentials) {
        return await this.request({endpoint: `auth/register`, method: `POST`, data: credentials})
    }
    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }

    async listNutritionForUser(user) {
        return await this.request({endpoint: `nutrition`, method: `GET`, data: user})
    }

    async createNutrition(nutrition) {
        return await this.request({endpoint: `nutrition`, method: `POST`, data: nutrition})
    }

    async fetchNutritionById(nutritionId){
        return await this.request({endpoint: `nutrition/id/${nutritionId}`, method: `GET` })
    }

    async getCategoriesForUser(user) {
        return await this.request({endpoint: `nutrition/categories`, method: `GET`, data: user})
    }

    async getDailyCalories(user) {
        return await this.request({endpoint: `nutrition/calories`, method: `GET`, data: user})
    }
}

export default new ApiClient(  "https://codepathlife.herokuapp.com")