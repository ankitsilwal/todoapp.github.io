import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getAllTodos } from '../redux/actions/index';
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from '../redux/actions/type';
import Todo from './Todo';
import Tabs from './Tabs';

export const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const currentTab = useSelector((state) => state.currentTab);

    useEffect(() => {
        dispatch(getAllTodos());
    }, [dispatch]); // Add dispatch as a dependency

    const getFilteredTodos = () => {
        switch (currentTab) {
            case ACTIVE_TODOS:
                return todos.filter((todo) => !todo.done);
            case DONE_TODOS:
                return todos.filter((todo) => todo.done);
            default:
                return todos;
        }
    };

    const removeDoneTodos = () => {
        todos
            .filter((todo) => todo.done)
            .forEach(({ _id }) => {
                dispatch(deleteTodo(_id));
            });
    };

    return (
        <article>
            <div>
                <Tabs currentTab={currentTab} />
                {todos.some((todo) => todo.done) && (
                    <button onClick={removeDoneTodos} className="button clear">
                        Remove Done Todos
                    </button>
                )}
            </div>

            <ul>
                {getFilteredTodos().map((todo) => (
                    <Todo key={todo._id} todo={todo} />
                ))}
            </ul>
        </article>
    );
};

export default Todos;
