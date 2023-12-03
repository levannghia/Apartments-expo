import React, {useContext} from 'react'
import * as SecureStore from 'expo-secure-store';
import { useQueryClient } from 'react-query';
import { AuthContext } from '../../context';

export const useAuth = () => {
    const {user, setUser} = useContext(AuthContext);
    const queryClient = useQueryClient()

    const login = (user) => {
        let stringUser = JSON.stringify(user);
        setUser(user);
        SecureStore.setItemAsync("user", stringUser);
        queryClient.refetchQueries();
    }

    const logout = () => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        queryClient.clear();
    }

    return {user, login, logout};
}   