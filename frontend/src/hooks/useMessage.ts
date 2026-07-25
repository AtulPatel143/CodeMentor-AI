import { useContext } from "react";
import { MessageContext } from "../context/MessageContextImpl";

export const useMessage = () => useContext(MessageContext);
