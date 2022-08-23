import Context from "./index";
import React, { FC, ReactNode, useState } from "react"
import { IProps } from "./Type"

export const ContextProvider: FC<IProps> = ({ children }) => {
    const [scroll, setScroll] = useState(false)
    const toggleScroll = () => {
        setScroll(state => !state);
    }

    return (
        <Context.Provider value={{ scroll, toggleScroll }}>
            {children}
        </Context.Provider>
    )
}