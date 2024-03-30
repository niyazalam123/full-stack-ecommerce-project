"use client";
import { Provider } from "react-redux";
import {Store} from "@/app/redux/Store"

export function Providers({children}){
    return <Provider store={Store}>{children}</Provider>
}