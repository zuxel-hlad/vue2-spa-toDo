export default {
    getTodos({commit}) {
        try {
            commit('getTodosFromDB')
        } catch (e) {
            console.error(e)
        } finally {
        }
    }
}