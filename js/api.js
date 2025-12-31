const API_URL = 'http://localhost:3000/api';

const API = {
    // Transactions
    async getTransactions() {
        try {
            const response = await fetch(`${API_URL}/transactions`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return [];
        }
    },

    async addTransaction(transaction) {
        try {
            const response = await fetch(`${API_URL}/transactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    },

    // User
    async getUser() {
        try {
            const response = await fetch(`${API_URL}/user`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching user:', error);
            return {};
        }
    },

    async updateUser(userData) {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    },

    // Summary
    async getSummary() {
        try {
            const response = await fetch(`${API_URL}/summary`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching summary:', error);
            return { total: 0 };
        }
    }
};

// Expose API globally
window.API = API;
