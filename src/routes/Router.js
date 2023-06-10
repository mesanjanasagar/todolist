import { Route, Routes } from 'react-router-dom'
import Todo from '../pages/todo.js'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Todo />} />
        </Routes>
    )
}

export default Router