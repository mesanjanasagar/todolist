import { Route, Routes } from 'react-router-dom'
import Todo from '../pages/Todo'
import Auth from '../components/Auth'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Todo />} />
            <Route path='/auth' element={<Auth />} />
        </Routes>
    )
}

export default Router