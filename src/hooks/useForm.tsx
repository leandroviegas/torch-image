import { Reducer, useReducer } from "react";

function useForm<T>(params: T) {
    return useReducer<Reducer<T, any>>((state: T, action: any) => {
        return { ...state, ...action }
    }, params);
}

export default useForm